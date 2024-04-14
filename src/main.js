import * as terminal from "./js/terminal.js";
import '/assets/css/main.css'
import '/assets/css/terminal.css'
import '/assets/css/glitch.css'
import '/assets/css/scrollbar.css'
import ghostRun from "./js/ghost.js";
import { enterFullScreen } from "./js/textdisplay.js";
const glitchSound = new Audio("./assets/sound/electronic-glitch-98287.mp3");
const backgroundSound = new Audio("./assets/sound/Bit Space (loopable).mp3");
backgroundSound.loop =true;

const DEBUG = true;

const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const play= document.getElementById("play");

function run() {
    screen1.style.display = "block";
    screen2.style.display = "none";

    play.addEventListener("click",e=>{
        console.log("play");
        if(!DEBUG) enterFullScreen(document.documentElement);
        backgroundSound.play();
        glitchSound.play();
        screen1.style.display = "none";
        screen2.style.display = "block";
        playScreen2()
    },false);

    ghostRun();
    function playScreen2()
    {
        if(!DEBUG)
        {
            
    
            terminal.addRowToTerminal(
                `Date: ${new Date().toLocaleString("fr-FR")}
        Booting system v2.23.454
        Last User Log: 10/01/1996 21:11:00
        Diagnostics: [....................] OK
        Driver: [....................] OK
        
        SOUL.EXE not found !
        Run emergency shell, type "help" for help
        
        `, "bios", true, 50);
        
            document.addEventListener("display", e => {
                if (e.detail.msg === "ended") {
        
                    terminal.initShell()
                }
            });
        }
        else
        {
            terminal.initShell()
    
        }
    }
    
}
run(); 
