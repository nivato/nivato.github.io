(function(){
    'use strict';
    let Terminal = function(){}, def = Terminal.prototype;

    def.initialize = function(){
        this.prompt = "nivato@github:~$ ";
        this.terminal = document.getElementsByClassName("terminal")[0];
        this.tBody = this.terminal.getElementsByClassName("t-body")[0];
        this.fillInTerminal();
        return this;
    };

    def.createElementWithClass = function(el, className=""){
        let element = document.createElement(el);
        if (className){
            element.className = className;
        }
        return element;
    };

    def.div = function(className=""){
        return this.createElementWithClass('div', className);
    };

    def.span = function(className=""){
        return this.createElementWithClass('span', className);
    };

    def.createLine = function(text="&nbsp;"){
        let line = this.div("t-line");
        line.innerHTML = text.replaceAll("\"", "&quot;");
        return line;
    };

    def.addLine = function(text="&nbsp;"){
        let line = this.createLine(text);
        this.tBody.appendChild(line);
        return line;
    };

    def.addCommandLine = function(command="", withCursor=false){
        let line = this.createLine(this.prompt + command);
        if (withCursor){
            let cursor = this.span("cursor");
            cursor.innerHTML = "🁢";
            line.appendChild(cursor);
        }
        this.tBody.appendChild(line);
        return line;
    };

    def.addOutputLine = function(output=""){
        let line = this.createLine("&gt; " + output);
        this.tBody.appendChild(line);
        return line;
    };

    def.createTerminalLink = function(linkText, url, iconImage=undefined){
        let bold = document.createElement("b");
        let link = this.createElementWithClass("a", "t-link");
        link.href = url;
        if (iconImage){
            let icon = document.createElement("img");
            icon.className = "t-link-icon";
            icon.src = "/images/" + iconImage;
            link.appendChild(icon);
            link.innerHTML += "&nbsp;";
        }
        link.innerHTML += linkText;
        bold.appendChild(link);
        return bold;
    };

    def.typingAnimation = function(terminalEntries=[]){
        if (terminalEntries.length === 0){
            return;
        }
        let isLastEntry = terminalEntries.length === 1;
        let terminalEntry = terminalEntries.shift() || {};
        let welcome = terminalEntry.welcome || [];
        let command = terminalEntry.command;
        let output = terminalEntry.output || [];
        let lsLink = terminalEntry.lsLink;

        let text = this.span();
        let cursor = this.span("cursor");
        cursor.innerHTML = "🁢";

        if (command){
            let line = this.createLine("");
            line.appendChild(text);
            line.appendChild(cursor);
            this.tBody.appendChild(line);
        }

        let intervalId;
        let counter = 0;
        let terminal = this;
        intervalId = setInterval(function(){
            if (command && counter <= command.length) {
                text.innerHTML = terminal.prompt + command.slice(0, counter).replaceAll("\"", "&quot;");
                counter++;
            } else if (welcome && counter < welcome.length){
                terminal.addLine(welcome[counter]);
                counter++;
            } else {
                clearInterval(intervalId);
                intervalId = null;
                setTimeout(function(){
                    cursor.remove();
                    output.forEach(function(outLine){
                        terminal.addOutputLine(outLine);
                    });
                    if (lsLink){
                        let linkLine = terminal.addOutputLine(
                            "drwx------&nbsp;&nbsp;nivato&nbsp;&nbsp;admin&nbsp;&nbsp;736M&nbsp;&nbsp;",
                        );
                        let actionsTestLink = terminal.createTerminalLink(
                            lsLink.linkText,
                            lsLink.url,
                            lsLink.iconImage,
                        );
                        linkLine.appendChild(actionsTestLink);
                    }
                    if (isLastEntry){
                        terminal.addCommandLine("", true);
                    }
                    terminal.typingAnimation(terminalEntries);  // RECURSION!
                }, 700);
            }
        }, 100);
    };

    def.fillInTerminal = function(){
        // TODO: The old "static" terminal contents
        // this.addLine("Last login: Fri Feb 10 17:30:13 on ttys001");
        // this.addLine();
        // this.addCommandLine("echo \"Hello, World\"'!'");
        // this.addOutputLine("Hello, World!");
        // this.addCommandLine();
        // this.addCommandLine();
        // this.addCommandLine("ls -lah");
        // this.addOutputLine("total 248");
        // this.addOutputLine();
        // let linkLine = this.addOutputLine(
        //     "drwx------&nbsp;&nbsp;nivato&nbsp;&nbsp;admin&nbsp;&nbsp;736M&nbsp;&nbsp;",
        // );
        // let actionsTestLink = this.createTerminalLink(
        //     "actions-test - Allure Reports",
        //     "https://nivato.github.io/actions-test/",
        //     "allure.png",
        // );
        // linkLine.appendChild(actionsTestLink);
        // this.addOutputLine();
        // this.addCommandLine("", true);

        let terminalEntries = [
            {welcome: ["Last login: Fri Feb 10 17:30:13 on ttys001", "&nbsp;"]},
            {
                command: "echo \"Hello, World\"'!'",
                output: ["Hello, World!"],
            },
            {command: " "},
            {command: " "},
            {
                command: "ls -lah",
                output: ["total 248", ""],
            },
            {
                lsLink: {
                    linkText: "actions-test - Allure Reports",
                    url: "https://nivato.github.io/actions-test/",
                    iconImage: "allure.png",
                },
            },
            {output: [""]},
        ];
        this.typingAnimation(terminalEntries);
    };

    let GhPage = function(){};
    def = GhPage.prototype;

    def.initialize = function(){
        this.body = document.getElementsByTagName('body')[0];
        this.terminal = new Terminal().initialize();
        return this;
    };

    let ghPage = new GhPage();
    window.onload = ghPage.initialize.bind(ghPage);

})();
