
export function parseCommand(command) {
    console.log("recieved to interpret: "+command)
    const comEl = command.split(" ");

    let content = "";
    let classes = [];
    let isAnimated = false;
    switch (comEl[0]) {
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
                content = `si tu lis ces lignes, c'est que je suis mort\n ne sois pas triste`
                classes.push("doc");
                isAnimated = true;

                const event = new CustomEvent("userCmd",{detail:{msg:"fileReaded"}});
                document.dispatchEvent(event);

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
