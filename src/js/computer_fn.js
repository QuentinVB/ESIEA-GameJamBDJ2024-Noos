
export function parseCommand(command) {
    console.log(command)
    const comEl = command.split(" ");

    let content = "";
    let classes = [];
    let isAnimated = false;
    switch (comEl[0]) {
        case "help":
        case "man":
        case "/?":
            content = "help missing...";
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
            }
            else {
                content = "no file specified"
            }
            break;
        default:
            content = "unknown command"
            break;
    }

    return { content, classes, isAnimated };
}