import * as terminal from "./js/terminal.js";
import '/assets/css/main.css'
import '/assets/css/terminal.css'
import '/assets/css/glitch.css'
import ghostRun from "./js/ghost.js";

function run() {

    
    ghostRun();

    terminal.addRowToTerminal(
        `Date: ${new Date().toLocaleString("fr-FR")}
Booting system v2.23.454
Last User Log: 10/01/1996 21:11:00
Diagnostics: [....................] OK
Driver: [....................] OK

SOUL.EXE not found !
Run emergency shell, type "help" for help

`, "bios", true, 50);

    terminal.initShell()

};


run(); 
