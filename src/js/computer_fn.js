const command_history = [];

let currentFolder = `/`;

export async function parseCommand(command) {
    console.log("recieved to interpret: "+command);
    
    let content = "";
    let classes = [];
    let isAnimated = false;
    if(command == "") return { content, classes, isAnimated };

    command_history.push(command);
    const comEl = command.split(" ");

    switch (comEl[0]) {
        case"pwd":
            content = currentFolder;
            break;
        case"cd":
            //moving to folder
            if(comEl[1]==="..")
            {
                //moving up
                const folders = currentFolder.split("/");
                folders.length--;
                currentFolder = "/"+folders.join("/");
            }
            else if(comEl.length>1)
            {
                //TODO : check for valid path
                const path = comEl[1].split("/");
                currentFolder+=comEl[1];
            }
            content = currentFolder;
            break;
        case "help":
        case "man":
        case "/?":
            content = `ls : liste les répertoires et fichiers du répertoire courrant.\ncat 'nom fichier' : lis un fichier texte dans le terminal`;
            break;
        case "ls":
        case "dir":
            content = "Path : \\ <br/> . <br> .. <br> home <br> tmp <br> root <br> ice.txt";
            break;
        case "cat":
            if (comEl[1] === "ice.txt") {
                content = `InCaseofEmergency : 10/01/1996\n Si tu lis ces lignes, c'est que je suis mort\n J'espère trouver un moyen de continuer.`
                classes.push("doc");
                isAnimated = true;

                const event = new CustomEvent("userCmd",{detail:{msg:"fileReaded"}});
                document.dispatchEvent(event);

            }
            else if (comEl[1] === "misato.txt") {
                const response = await fetch("/assets/content/misato_ascii.txt");
                const data = await response.text();
            
                content = data;
                classes.push("ascii-art");
                isAnimated=false;
            }
            else if (comEl[1] === "misato2.txt") {
                const response = await fetch("/assets/content/misato2_ascii.txt");
                const data = await response.text();
            
                content = data;
                classes.push("ascii-art");
                isAnimated=false;
            }
            else {
                content = "no file specified"
            }
            break;
        default:
            content = "unknown command, type 'help' for help"
            break;
    }

    return { content, classes, isAnimated };
}
