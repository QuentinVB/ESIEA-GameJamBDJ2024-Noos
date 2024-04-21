import { displayWithDelay } from "./textdisplay";


const body = document.getElementById("body");

const terminal = document.getElementById("terminal");
const inputEle = document.getElementById('input');
const promptLine = document.getElementById('prompt-line');
const invite = document.getElementById('prompt');

export function addRowToTerminal(content, classes = "", isAnimated = false, delay = 40) {
    if (content === undefined || content === "") return;
    const row = document.createElement("pre");
    row.classList.add("terminal-row");
    if (classes.length > 0) row.classList.add(...classes);
    if (isAnimated) {
        displayWithDelay(row, content, delay)
    }
    else {
        row.innerHTML = content;
    }
    promptLine.before(row);
}

export function initShell(computer) {

    const caretEle = document.getElementById('caret');

    invite.textContent = ":>";

    document.addEventListener("click", () => {
        inputEle.focus();
    });

    inputEle.addEventListener("keypress", (e) => {
        inputEle.size = inputEle.value.length + 1;
        if (e.keyCode == 13) {
            if(inputEle.value ==="") return;
            promptLine.scrollIntoView({ behavior: "smooth",block:"center", inline: "nearest"})
            addRowToTerminal(invite.textContent + inputEle.value);
            try {
                computer.parseCommand(inputEle.value)
                    .then(output => {
                        if(output.content !== "") addRowToTerminal(output.content, output.classes, output.isAnimated);
                        
                    })

            } catch (error) {
                console.error(error)
            }
            inputEle.value = "";
            updateCaretPosition();
        }
    });


    
    const canvasEle = document.createElement('canvas');
    const context = canvasEle.getContext('2d');
    const measureWidth = (text, font) => {
        context.font = font;
        const metrics = context.measureText(text);
        return metrics.width ?? 0;
    };

    const inputStyles = window.getComputedStyle(inputEle);
    const font = `${inputStyles.getPropertyValue('font-size')} ${inputStyles.getPropertyValue('font-family')}`;
    const paddingLeft = parseInt(inputStyles.getPropertyValue('padding-left'), 10) + 2;
    const caretWidth = caretEle.getBoundingClientRect().width;


    const updateCaretPosition = e => {
        const caretPos = e?.target?.selectionStart ?? 0;

        const text = inputEle.value;
        const ratio = (caretPos/inputEle.value.length) ?? 0;
        const textWidth = (measureWidth(text, font)*ratio) + paddingLeft;
        //console.log(textWidth,ratio)
        const inputWidth = inputEle.getBoundingClientRect().width;
        if (textWidth + caretWidth < inputWidth) {
            caretEle.style.transform = `translate(${textWidth}px, -50%)`;
        }
    };



    inputEle.addEventListener('keyup', updateCaretPosition);
    updateCaretPosition();
    inputEle.focus();
}