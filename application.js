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

    def.createElementWithClass = function(el, className){
        let element = document.createElement(el);
        element.className = className;
        return element;
    };

    def.div = function(className){
        return this.createElementWithClass('div', className);
    };

    def.span = function(className){
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
            link.innerHTML += " ";
        }
        link.innerHTML += linkText;
        bold.appendChild(link);
        return bold;
    };

    def.fillInTerminal = function(){
        this.addLine("Last login: Fri Feb 10 17:30:13 on ttys001");
        this.addLine();
        this.addCommandLine("echo \"Hello, World\"'!'");
        this.addOutputLine("Hello, World!");
        this.addCommandLine();
        this.addCommandLine();
        this.addCommandLine("ls -lah");
        this.addOutputLine("total 248");
        this.addOutputLine();
        let linkLine = this.addOutputLine(
            "drwx------&nbsp;&nbsp;nivato&nbsp;&nbsp;admin&nbsp;&nbsp;736M&nbsp;&nbsp;",
        );
        let actionsTestLink = this.createTerminalLink(
            "actions-test - Allure Reports",
            "https://nivato.github.io/actions-test/",
            "allure.png",
        );
        linkLine.appendChild(actionsTestLink);
        this.addOutputLine();
        this.addCommandLine("", true);
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
