let rangeText = document.getElementById("rangeText");
let slider = document.getElementById("playbackSlider");
let resetButton = document.getElementById("resetButton");

const lowerPlaybackLimit = 0;
const upperPlaybackLimit = 4;

//speed is float
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

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message == "current speed") {
        setSpeed(request.speed);
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