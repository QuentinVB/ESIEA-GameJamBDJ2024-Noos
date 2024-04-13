import { displayWithDelay } from "./textdisplay";
import { parseCommand } from "./computer_fn";

const command_history = [];
const body = document.getElementById("body");

const terminal = document.getElementById("terminal");
const inputEle = document.getElementById('input');
const promptLine = document.getElementById('prompt-line');
const invite = document.getElementById('prompt');

export function addRowToTerminal(content, classes = "", isAnimated = false, delay = 100) {
    if (content === undefined) return;
    const row = document.createElement("pre");
    row.classList.add("terminal-row");
    if (classes.length > 0) row.classList.add(classes);
    if (isAnimated) {
        displayWithDelay(row, content, delay)
    }
    else {
        row.innerHTML = content;
    }
    promptLine.before(row);
}

export function initShell() {
    invite.textContent = ":>";

    document.addEventListener("click", () => {
        inputEle.focus();
    });

    inputEle.addEventListener("keypress", (e) => {
        /*
        if(!(document.fullScreenElement && document.fullScreenElement !== null) ||  !(document.mozFullScreen || document.webkitIsFullScreen))
        {
            enterFullScreen(document.documentElement);
        }*/

        inputEle.size = inputEle.value.length + 1;
        if (e.keyCode == 13) {
            addRowToTerminal(invite.textContent + inputEle.value);
            const output = parseCommand(inputEle.value);
            addRowToTerminal(output.content, output.classes, output.isAnimated);
            command_history.push(inputEle.value);
            inputEle.value = "";
            updateCaretPosition();
            window.moveTo(0, 0);
            body.scrollTo(0, 0);

        }

    });


    const caretEle = document.getElementById('caret');
    const canvasEle = document.createElement('canvas');
    const context = canvasEle.getContext('2d');
    const measureWidth = (text, font) => {
        context.font = font;
        const metrics = context.measureText(text);
        return metrics.width;
    };

    const inputStyles = window.getComputedStyle(inputEle);
    const font = `${inputStyles.getPropertyValue('font-size')} ${inputStyles.getPropertyValue('font-family')}`;
    const paddingLeft = parseInt(inputStyles.getPropertyValue('padding-left'), 10) + 2;
    const caretWidth = caretEle.getBoundingClientRect().width;


    const updateCaretPosition = () => {
        const text = inputEle.value;
        const textWidth = measureWidth(text, font) + paddingLeft;
        const inputWidth = inputEle.getBoundingClientRect().width;
        if (textWidth + caretWidth < inputWidth) {
            caretEle.style.transform = `translate(${textWidth}px, -50%)`;
        }
    };

    inputEle.addEventListener('input', updateCaretPosition);
    updateCaretPosition();
    inputEle.focus();
}