
let audios;
let targetVideoSpeed=1;
function urlUpdate() {
    chrome.runtime.sendMessage({ "message": "inactivate_icon" });
    video = undefined;

    let intervalHandler;
    function findVideo() {
        audios = document.getElementsByTagName("audio");

        clearInterval(intervalHandler);
        chrome.runtime.sendMessage({ "message": "activate_icon" });
        for (let i = 0; i < audios.length; i++) {
            audios[i].playbackRate = targetVideoSpeed;

        }

    }
    intervalHandler = setInterval(findVideo, 1000);
    findVideo();
    
}

{
    let lastURL;
    function verityURL() {
        if (location.href != lastURL) {
            urlUpdate();
            lastURL = location.href;
        }
    }
    setInterval(verityURL, 1000);
    verityURL();
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.message == "set playback speed") {
        let speed = message.speed;
        if (speed > 16 || speed < 0) {
            console.log(`invalid speed ${speed}`);
            return;
        }
        targetVideoSpeed = speed;

        //if (video !== undefined) {
        
        chrome.runtime.sendMessage({ "message": "activate_icon" });
        for (let i = 0; i < audios.length; i++) {
            audios[i].playbackRate = targetVideoSpeed;

        }
    }
});
