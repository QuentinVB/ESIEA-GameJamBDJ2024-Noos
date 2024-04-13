export function displayWithDelay(target,content,speed=100)
{
    let currentText = ["█"];
    let idx = 0;
            let interval = setInterval(() => {
                if (idx == content.length)
                {
                    clearInterval(interval);
                    currentText.length--;
                    target.textContent=currentText.join('');
                    const event = new CustomEvent("display",{detail:{msg:"ended"}});
                    document.dispatchEvent(event);
                    return;
                };
                currentText[currentText.length-1]= content[idx];
                currentText.push("█");
                target.textContent=currentText.join('');
                idx++;
            }, speed);
}

export function enterFullScreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();     // Firefox
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();  // Safari
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();      // IE/Edge
    }
};