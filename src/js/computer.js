export default class Computer {

    constructor(data) {
        this.currentPath = "/home"
        this.data = data;
        this.command_history = [];
    }

    get getFolderContent() {
        let currentRepo = this.data.filesystem;
        for (const repositoryName of this.currentPath.split("/")) {
            if (repositoryName === "") continue;
            const repo = currentRepo[repositoryName]
            if (!repo) throw new Error("not found");
            currentRepo = repo;
        }
        return currentRepo;
    }

    formatFolderContent(folder)
    {
        let format = `Path : ${this.currentPath}\n.\n..\n`;
        for (const key in folder.items) {
            if (Object.hasOwnProperty.call(folder.items, key)) {
                const element = folder.items[key];
                format+=`${key}\n`
            }
        }
        return format;
    }

    changeDirectory(newPath)
    {
        //FIXME : not handling ../folder
        if(!newPath)return this.currentPath;

        if (newPath=== "..") {
            //moving up
            const folders = this.currentPath.split("/");
            folders.length--;
            this.currentPath = "/" + folders.join("/");
        }
        else if (newPath.length > 1) {
            this.currentPath +=  newPath;
        }
            //TODO : check for valid path

        return this.currentPath;
    }

    async readFile(filename)
    {
        if(!filename) return {content : "no file specified",classes:[],isAnimated:false}
        const folder = this.getFolderContent;
        if (!Object.hasOwnProperty.call(folder.items, filename)) return {content : "file not found",classes:[],isAnimated:false};
        const fileMetaData = folder.items[filename];

        if(fileMetaData.class.includes("file"))
        {
            const response = await fetch("/assets/content/"+fileMetaData.content);
            const data = await response.text();
            return {
            content : data,
            classes : fileMetaData.class ?? [],
            isAnimated : false}
        }
        else if(fileMetaData.class.includes("doc"))
        {
            const event = new CustomEvent("userCmd", { detail: { msg: fileMetaData.event } });
            document.dispatchEvent(event);

            return {
                content : fileMetaData.content,
                classes : fileMetaData.class ?? [],
                isAnimated : true}
        }
        else 
        {
            console.log("here")
            return {
                content : fileMetaData.content,
                classes : fileMetaData.class ?? [],
                isAnimated : false}
        }
    }


    async parseCommand(command) {
        console.log("recieved to interpret: " + command);

        let content = "";
        let classes = [];
        let isAnimated = false;
        if (command == "") return { content, classes, isAnimated };

        this.command_history.push(command);
        const comEl = command.split(" ");

        switch (comEl[0]) {
            case "pwd":
                content = this.currentPath;
                break;
            case "cd":
                content =this.changeDirectory(comEl[1])   
                break;
            case "help":
            case "man":
            case "/?":
                content = `ls : liste les répertoires et fichiers du répertoire courrant.\ncat 'nom fichier' : lis un fichier texte dans le terminal`;
                break;
            case "ls":
            case "dir":
                content = this.formatFolderContent(this.getFolderContent);
                break;
            case "cat":
                const data = await this.readFile(comEl[1]);
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


    static async LoadComputer(path) {
        const response = await fetch(path);
        const data = await response.json();
        return new Computer(data);
    }
}