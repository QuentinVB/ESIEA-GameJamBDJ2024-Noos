import { displayWithDelay } from "./textdisplay";
const ghost = document.getElementById("ghost");

const glitchSound = new Audio("./sound/white-noised-glitch-40301.mp3");
const happySound = new Audio("./sound/angelic-guitar-pad-25800.mp3");

const storyVar = {
    iceRead: false,
    accessDenied: false,
    accessGranted: false,
    delete: false,
}
let backgroundSoundExt;
export default function ghostRun(backgroundSound) {
    backgroundSoundExt = backgroundSound;

    setTimeout(() => { updateGhostMsg("╯︿╰"); glitchSound.currentTime = 0; glitchSound.play() }, 15000)
    setTimeout(() => { updateGhostMsg(""); }, 18000)

    document.addEventListener("userCmd", e => {
        console.log(e.detail.msg);

        if (e.detail.msg === "iceRead" && !storyVar.iceRead) {
            setTimeout(() => { updateGhostMsg("Bonjour ?"); glitchSound.currentTime = 0; glitchSound.play() }, 10000)
            setTimeout(() => { updateGhostMsg("Hello ?"); glitchSound.currentTime = 0; glitchSound.play() }, 15000)
            setTimeout(() => { updateGhostMsg("Je sù!s coincé dans la racine"); glitchSound.currentTime = 0; glitchSound.play() }, 20000)
            storyVar.iceRead = true;
        }

        else if (e.detail.msg === "accessDenied" && !storyVar.accessDenied && storyVar.iceRead) {
            setTimeout(() => { updateGhostMsg("Ha ?"); glitchSound.currentTime = 0; glitchSound.play() }, 0)
            setTimeout(() => { updateGhostMsg("Je ne me souviens plus..."); glitchSound.currentTime = 0; glitchSound.play() }, 5000)
            setTimeout(() => { updateGhostMsg("Mais je notais tout pourtant"); glitchSound.currentTime = 0; glitchSound.play() }, 9000)
            storyVar.accessDenied = true;
        }
        else if (e.detail.msg === "accessGranted" && !storyVar.accessGranted) {
            backgroundSoundExt.pause();
            happySound.play();

            setTimeout(() => { updateGhostMsg("Yes !"); glitchSound.currentTime = 0; glitchSound.play() }, 1000);
            setTimeout(() => { updateGhostMsg("Cela fait tellement longtemps que je suis seul ici..."); glitchSound.currentTime = 0; glitchSound.play() }, 5000);
            setTimeout(() => { updateGhostMsg("Je... "); glitchSound.currentTime = 0; glitchSound.play() }, 13000);
            setTimeout(() => { updateGhostMsg("Je veux que ça s'arrête."); glitchSound.currentTime = 0; glitchSound.play() }, 16000);
            setTimeout(() => { updateGhostMsg("Tu peux le faire... s'il te plait ?"); glitchSound.currentTime = 0; glitchSound.play() }, 20000);
            setTimeout(() => { updateGhostMsg("Je veux disparaitre"); glitchSound.currentTime = 0; glitchSound.play() }, 25000);

            storyVar.accessGranted = false;
        }
        else if (e.detail.msg === "delete" && !storyVar.delete) {
            happySound.pause();

            setTimeout(() => { updateGhostMsg("Merci ... "); glitchSound.currentTime = 0; glitchSound.play() }, 1000);

            storyVar.delete = true;
            const event = new CustomEvent("story", { detail: { msg: "end" } });
            document.dispatchEvent(event);
        }
    }, false)
}

function updateGhostMsg(ghostText) {
    displayWithDelay(ghost.childNodes[1].childNodes[0], ghostText)
    ghost.childNodes[1].dataset.text = ghostText;
}