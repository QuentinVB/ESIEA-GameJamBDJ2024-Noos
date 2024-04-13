import { displayWithDelay } from "./textdisplay";
const ghost = document.getElementById("ghost");

export default function ghostRun() {

    document.addEventListener("userCmd",e=>{
        if(e.detail.msg === "fileReaded")
        {
            setTimeout(()=>{updateGhostMsg("Bonjour ?");},12000)
            setTimeout(()=>{updateGhostMsg("Hello ?");},24000)
            setTimeout(()=>{updateGhostMsg("Je sù!s dans la racine");},30000)
            //white-noised-glitch-40301.mp3
        }
    },false)

    
}

function updateGhostMsg(ghostText)
{
    displayWithDelay(ghost.childNodes[1].childNodes[0], ghostText)
    ghost.childNodes[1].dataset.text = ghostText;
}