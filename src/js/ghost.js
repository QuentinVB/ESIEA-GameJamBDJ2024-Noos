import { displayWithDelay } from "./textdisplay";
const ghost = document.getElementById("ghost");

const glitchSound = new Audio("./assets/sound/white-noised-glitch-40301.mp3");

const storyVar ={
    iceRead:false
}

export default function ghostRun() {

    document.addEventListener("userCmd", e => {

        if (e.detail.msg === "iceRead" && !storyVar.iceRead) {
            setTimeout(() => { updateGhostMsg("Bonjour ?"); glitchSound.currentTime = 0; glitchSound.play() }, 10000)
            setTimeout(() => { updateGhostMsg("Hello ?"); glitchSound.currentTime = 0; glitchSound.play() }, 15000)
            setTimeout(() => { updateGhostMsg("Je sù!s dans la racine"); glitchSound.currentTime = 0; glitchSound.play() }, 20000)
            //white-noised-glitch-40301.mp3
            storyVar.iceRead = false;
        }
    }, false)


}

function updateGhostMsg(ghostText) {
    displayWithDelay(ghost.childNodes[1].childNodes[0], ghostText)
    ghost.childNodes[1].dataset.text = ghostText;
}