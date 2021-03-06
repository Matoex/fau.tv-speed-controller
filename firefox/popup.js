let rangeText = document.getElementById("rangeText");
let slider = document.getElementById("playbackSlider");
let resetButton = document.getElementById("resetButton");

const lowerPlaybackLimit = 0;
const upperPlaybackLimit = 16;

function setSpeed(speed) {
    slider.value = speed;
    let valueString = speed.toString();
    if (valueString.indexOf(".") == -1) valueString += ".0";
    rangeText.value = valueString;
    updatePlaybackSpeed(speed);
}

function getPlaybackSpeed() {
    browser.tabs.query({ "active": true, "status": "complete" }, (tabs) => {
        if (tabs.length == 0) {
            setTimeout(getPlaybackSpeed, 100);
            return;
        }
        for (let tab of tabs) {
            browser.tabs.sendMessage(tab.id, { "message": "get playback speed" });

        }
    });
}
getPlaybackSpeed();


function getVideoUrlOnload() {
    browser.tabs.query({ "active": true, "status": "complete" }, (tabs) => {
        if (tabs.length == 0) {
            setTimeout(getPlaybackSpeed, 100);
            return;
        }
        for (let tab of tabs) {
            browser.tabs.sendMessage(tab.id, { "message": "get video url" });
        }
    });
}
getVideoUrlOnload();



browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message == "current speed") {
        setSpeed(request.speed);
    }
    if (request.message == "current videourl") {
        videourl = request.videourl;
    }
});

resetButton.addEventListener("click", () => {
    setSpeed(1.0);
});

rangeText.addEventListener("keydown", (e) => {
    if (e.key != "Enter") return;
    let value = parseFloat(rangeText.value);
    value = Math.round(value * 10) / 10;
    if (value < lowerPlaybackLimit) value = lowerPlaybackLimit;
    if (value > upperPlaybackLimit) value = upperPlaybackLimit;
    setSpeed(value);
});

slider.addEventListener("input", (e) => {
    setSpeed(slider.value);
});

function updatePlaybackSpeed(speed) {
    browser.tabs.query({ currentWindow: true, active: true }, (tabs) => {
        for (let tab of tabs) {
            browser.tabs.sendMessage(tab.id, { "message": "set playback speed", "speed": speed });
        }
    });
}

//copyLinkButton.addEventListener("click", () => {
// copyToClipboard(videourl);
//});


downloadVideoButton.addEventListener("click", () => {
    browser.tabs.query({ currentWindow: true, active: true }, (tabs) => {
        for (let tab of tabs) {
            browser.tabs.sendMessage(tab.id, { "message": "open new Tab", "videourl": videourl });
        }
    });
});

function copyToClipboard(str) {
    // const el = document.createElement('textarea');
    // el.value = str;
    // el.setAttribute('readonly', '');
    // el.style.position = 'absolute';
    // el.style.left = '-9999px';
    // document.body.appendChild(el);
    // el.select();
    // document.execCommand('copy');
    // document.body.removeChild(el);
    // alert('Video URL got copied to your clipboard')
}

document.addEventListener('keyup', (e) => {
    let value = parseFloat(rangeText.value);
    if (e.code === "KeyA") {
        sendTabMessage("set playback speed down");
        setSliderAndRangetextValue(value - 0.25);
    } else if (e.code === "KeyS") {
        sendTabMessage("set playback speed one");
        setSliderAndRangetextValue(1);
    } else if (e.code === "KeyD") {
        sendTabMessage("set playback speed up");
        setSliderAndRangetextValue(value + 0.25);
    }
});

function sendTabMessage(m) {
    browser.tabs.query({ currentWindow: true, active: true }, (tabs) => {
        for (let tab of tabs) {
            browser.tabs.sendMessage(tab.id, { "message": m });
        }
    });
}

function setSliderAndRangetextValue(speed) {
    if (speed > 16 || speed < 0) {
        console.log(`invalid speed ${speed}`);
        return;
    }
    slider.value = speed;
    let valueString = speed.toString();
    if (valueString.indexOf(".") == -1) valueString += ".0";
    rangeText.value = valueString;
}