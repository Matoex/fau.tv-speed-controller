Adapted version of https://github.com/Jeansidharta/Youtube-Playback-speed-extension for the video portal of FAU Erlangen https://www.fau.tv/

# Note
**Added web.whatsapp.com support, this is beta only.**

**"Copy link" button as well as "Download Video" Button have no functionality on whatsapp.com.**

**Speed getting was eliminated (therefore the Slider is initialized with "-1").**

**Currently only setting the speed works.**

**On setting the speed, the speed of all voice message speeds will be set if the voice message existed before opening the popup.**

**To modify the speed of new voice messages, simply reopen the popup an set the slider again.**

**Getting the correct speed value for setting the slider will be added in the near to far future, but only if there is some demand for it.**

## The interface

If the current tab is not a fau.TV video, the extension icon will appear grayed-out (chrome)/will not apear (firefox) and will be disabled. 

Otherwise, clicking it will display a pop-up with a number, a slider and three buttons:

- The number displays the current video speed. It will change according to the slider. If you desire a specific speed, you may manually type the number you want. It's maximum precision, however is of 0.1. More decimal numbers will be rounded.

- The slider controls the video speed, going from 0.0 to 4.0.

- The "reset" button will set the video speed to 1.0.

- The "copy video link" button will copy the video link in your clipboard. You can open this videourl as a networkstre e.g. in VLC Media Player.

- The "download video" button: 
If the video-url is a m3u8-file, it will warn you and then opens the m3u8 file in a new tab, which will download there. Note: A m3u8 file can not be watched like a normal video!

If the video-url is not a m3u8 file, it will open the video-url in a new tab. Depending on your browser it will start the download immediately or open the raw video in a new tab. Then you can download the video by clicking the right mouse button -> save video as...


## If you want to save a m3u8 video as a video-file, you can follow these steps:
How to download a m3u8-video using VLC media player 

1. copy the video link
2. open VLC media player
3. Click Media->Convert/Save... or hit Ctrl+R
4. Select Network
5. Paste the videourl
6. Hit convert/save...
7. Select a prefered video profile (Video - H.264 + MP3 (MP4) recomended for Videos) and a destination file.
8. Hit start.
9. Watch the download progress in the VLC Video Timeline
10. When the download is finished, you can open your destination file.

## How to install

### How to install on chrome

- download this repository and unzip it.

- in your chrome browser, open the options menu (three dots at the top right of your screen)->more tools->extensions or simply open the URL `chrome://extensions/`

- check the "developer options" button at the top right of the screen. This will open a menu at the top of your screen.

- click on "Load unpacked" and **select the chrome folder** in the previously unziped project folder.

after this, the extension will be installed.


### How to install on firefox

- download this repository and unzip it.

- in your firefox browser, open the URL `about:debugging#/runtime/this-firefox`

- click on Temporary Extensions->"Load Teporary Add-on..."

- **select the file `manifest.json` in the subdirectory `firefox/`** of previously unziped project folder.

after this, the extension will be installed.

### How to install on Edge

- download this repository and unzip it.

- in your edge browser, open the options menu (three dots at the top right of your screen)->extensions or simply open the URL `edge://extensions/`

- check the "developer options" button at the bottom left of the screen. This will open a menu at the top of your screen.

- click on "Load unpacked" and **select the chrome folder** in the previously unziped project folder.

after this, the extension will be installed.
