import { addRowToTerminal } from "./terminal";

export default class Computer {

    constructor(data) {
        this.currentPath = "/home"
        this.data = data;
        this.command_history = [];
        this.softwareMode = false;
        this.softwareName = "";
        this.softwareCtx = {};
    };

    getFolderContent(path = this.currentPath) {
        let currentRepo = this.data.filesystem.items;
        if (path === "/") return this.data.filesystem;

        for (const repositoryName of path.split("/")) {
            if (repositoryName === "") continue;
            const repo = currentRepo[repositoryName]
            if (!repo) throw new Error("not found");
            currentRepo = repo;
        }
        return currentRepo;
    }

    formatFolderContent(folder) {
        console.log(folder);

        let format = `Path : ${this.currentPath}\n.\n..\n`;
        for (const key in folder.items) {
            if (Object.hasOwnProperty.call(folder.items, key)) {
                const element = folder.items[key];
                format += `${key}\n`
            }
        }
        return format;
    }

    changeDirectory(newPath) {
        //FIXME : not handling ../folder
        if (!newPath) return this.currentPath;

        let path = ""

        if (newPath === "..") {
            //moving up
            const folders = this.currentPath.split("/");
            folders.length--;
            path = "/" + folders.join("/");
        }
        else if (newPath.length > 1) {
            path = this.currentPath + newPath;
        }
        //TODO : check for valid path
        try {
            const folder = this.getFolderContent(path);
            if (folder.locked) {
                this.softwareCtx = folder;
                const event = new CustomEvent("userCmd", { detail: { msg: "accessDenied" } });
                document.dispatchEvent(event);
                return "ACCESS DENIED\n" + this.currentPath;
            }


        } catch (error) {
            console.log(error);
            return this.currentPath;
        }
        this.currentPath = path;

        return this.currentPath;
    }

    async readFile(filename) {
        if (!filename) return { content: "no file specified", classes: [], isAnimated: false }
        const folder = this.getFolderContent();
        if (!Object.hasOwnProperty.call(folder.items, filename)) return { content: "file not found", classes: [], isAnimated: false };
        const fileMetaData = folder.items[filename];

        if (fileMetaData.class.includes("file")) {
            const response = await fetch("/content/" + fileMetaData.content);
            const data = await response.text();
            return {
                content: data,
                classes: fileMetaData.class ?? [],
                isAnimated: false
            }
        }
        else if (fileMetaData.class.includes("doc")) {
            const event = new CustomEvent("userCmd", { detail: { msg: fileMetaData.event } });
            document.dispatchEvent(event);

            return {
                content: fileMetaData.content,
                classes: fileMetaData.class ?? [],
                isAnimated: true
            }
        }
        else {
            return {
                content: fileMetaData.content,
                classes: fileMetaData.class ?? [],
                isAnimated: false
            }
        }
    }

    runProgram(commandElements) {
        console.log(this.softwareCtx)
        if (this.softwareName === "password") {
            if (commandElements[0] === this.softwareCtx.password) {
                this.softwareCtx.locked = false;
                this.softwareMode = false;
                this.softwareCtx = null;
                const event = new CustomEvent("userCmd", { detail: { msg: "accessGranted" } });
                document.dispatchEvent(event);

                return { content: "Access granted", classes: [], isAnimated: false }
            }
            else if (commandElements[0] === "quit") {
                this.softwareMode = false;
                this.softwareCtx = null;
                return { content: "", classes: [], isAnimated: false }
            }
            else {
                return { content: "Incorrect password, type 'quit' to quit", classes: [], isAnimated: false }
            }
        }
    }

    deleteProgram(command)
    {
        if(command != "ghost.exe") return { content: "droit insuffisants", classes: [], isAnimated: false }

        const event = new CustomEvent("userCmd", { detail: { msg: "delete" } });
        document.dispatchEvent(event);
        return { content: "Suppression...", classes: ["doc"], isAnimated: true }
    }


    async parseCommand(command) {
        console.log("recieved to interpret: " + command);

        let content = "";
        let classes = [];
        let isAnimated = false;
        if (command == "") {console.log("nope");return { content, classes, isAnimated };}

        this.command_history.push(command);
        const comEl = command.split(" ");

        if (this.softwareMode) return this.runProgram(comEl);
        let data;
        switch (comEl[0]) {
            case "pwd":
                content = this.currentPath;
                break;
            case "cd":
                content = this.changeDirectory(comEl[1])
                break;
            case "help":
            case "man":
            case "/?":
                content = ` ls : liste les répertoires et fichiers du répertoire courrant.\n cat 'nom fichier' : lis un fichier texte dans le terminal\n cd 'dossier' : permet de se déplacer dans un répertoire. \nLe répertoire '..' permet de remonter au répertoire racine\n rm 'nom du fichier' : permet de supprimer un fichier`;
                break;
            case "ls":
            case "dir":
                content = this.formatFolderContent(this.getFolderContent());
                break;
            case "rm":
                data = this.deleteProgram(comEl[1]);
                content = data.content;
                classes.push(...data.classes);
                isAnimated = data.isAnimated;
                break;
            case "cat":
                data = await this.readFile(comEl[1]);
                content = data.content;
                classes.push(...data.classes);
                isAnimated = data.isAnimated;
                break;
            default:
                content = "unknown command, type 'help' for help"
                break;
        }

        console.log({ content, classes, isAnimated });
        return { content, classes, isAnimated };
    }

    handleCommand(event) {
        const msg = event.detail.msg;
        if (msg == "accessDenied") {
            this.softwareMode = true;
            this.softwareName = "password";
            addRowToTerminal("Enter Password", [], false);
        }
    }


    static async LoadComputer(path) {
        const response = await fetch(path);
        const data = await response.json();

        const computer = new Computer(data);

        document.addEventListener("userCmd", e => {
            console.log(e.detail.msg);
            computer.handleCommand(e);
        }, false)

        return computer;
    }
}