const hp5Iframe = document.querySelectorAll("iframe")[0].contentDocument;
const nextButton = hp5Iframe.getElementsByClassName("h5p-footer-button h5p-footer-next-slide")[0];
const allSlides = hp5Iframe.getElementsByClassName("h5p-slides-wrapper")[0].children;
let tueTitle = hp5Iframe.getElementsByClassName("h5p-footer-slide-count-delimiter")[0];
let pageTimer;
let speed = 1;

const nextPageFast = () => {
    nextButton.click();
    speeder();
}

const speeder = () => {
    // console.log("running speeder");
    tueTitle.innerText = `/ ${speed}x /`;
    const currentPage = hp5Iframe.getElementsByClassName("h5p-footer-slide-count-current")[0].innerText;
    const audio = hp5Iframe.getElementsByClassName("h5p-slides-wrapper")[0].children[currentPage - 1].getElementsByTagName("audio");
    const video = hp5Iframe.getElementsByClassName("h5p-slides-wrapper")[0].children[currentPage - 1].getElementsByTagName("video");
    const elementToSpeedUp = audio[0] ?? video[0];
    if (elementToSpeedUp) {
        clearTimeout(pageTimer);
        elementToSpeedUp.playbackRate = speed;
        elementToSpeedUp.onended = nextPageFast
    } else
        pageTimer = setTimeout(nextPageFast, 5000 / speed);
}

document.addEventListener('keyup', (e) => {
    if (e.code === "KeyD") speed += 0.25
    else if (e.code === "KeyA") speed -= 0.25
    else if (e.code === "KeyS") speed = 1;
    speeder();

});
document.addEventListener('click', e => speeder());

hp5Iframe.addEventListener('keyup', (e) => {
    if (e.code === "KeyD") speed += 0.25
    else if (e.code === "KeyA") speed -= 0.25
    else if (e.code === "KeyS") speed = 1;
    speeder();

});
hp5Iframe.addEventListener('click', e => speeder());

speeder();
