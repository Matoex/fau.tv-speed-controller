const hp5Iframe = document.querySelectorAll("iframe")[0].contentDocument;
const nextButton = hp5Iframe.getElementsByClassName("h5p-footer-button h5p-footer-next-slide")[0];
const allSlides = hp5Iframe.getElementsByClassName("h5p-slides-wrapper")[0].children;
const speedDisplayDiv = hp5Iframe.getElementsByClassName("h5p-footer-slide-count-delimiter")[0];
let pageTimer;
let speed = 1;

function nextPageFast() {
    nextButton.click();
    speeder();
}

function speeder() {
    speedDisplayDiv.innerText = `/ ${speed}x /`;
    const currentPage = hp5Iframe.getElementsByClassName("h5p-footer-slide-count-current")[0].innerText;
    const elementToSpeedUp = allSlides[currentPage - 1].querySelectorAll("audio,video")[0];
    clearTimeout(pageTimer);
    if (elementToSpeedUp) {
        elementToSpeedUp.playbackRate = speed;
        elementToSpeedUp.onended = nextPageFast;
    } else
        pageTimer = setTimeout(nextPageFast, 5000 / speed);
}

function onKeyListener(e) {
    if (e.code === "KeyD") speed += 0.25
    else if (e.code === "KeyA") speed -= 0.25
    else if (e.code === "KeyS") speed = 1;
    speeder();
}

document.addEventListener('keyup', onKeyListener);
document.addEventListener('click', e => speeder());
hp5Iframe.addEventListener('keyup', onKeyListener);
hp5Iframe.addEventListener('click', e => speeder());

speeder();
