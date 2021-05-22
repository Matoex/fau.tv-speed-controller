[![License](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://github.com/gorhill/uBlock/blob/master/LICENSE.txt)

Control the playback speed of your FAU.tv videos.
***

<p align="center">
<a href="https://addons.mozilla.org/en-US/firefox/addon/fau-tv-playback-speed-control/"><img src="https://user-images.githubusercontent.com/585534/107280546-7b9b2a00-6a26-11eb-8f9f-f95932f4bfec.png" alt="Get uBlock Origin for Firefox"></a> 
<a href="https://chrome.google.com/webstore/detail/fautv-playback-speed-cont/hbllafnglaponcppfpknohheppjhdhbk"><img src="https://user-images.githubusercontent.com/585534/107280622-91a8ea80-6a26-11eb-8d07-77c548b28665.png" alt="Get uBlock Origin for Chromium"></a>
  
***




Adapted version of https://github.com/Jeansidharta/Youtube-Playback-speed-extension for the video portal of FAU Erlangen https://www.fau.tv/

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

## Hotkeys
You can change the speed without opening the extension using the following hotkeys:

Reset to 1x with "s"

speed += 0.25  with "d"

speed -= 0.25  with "a"

-10s with "j"

+10s with "k"

## How to speed up AuD-Tafelübungen
Open your browser console on a AuD Tafelübung and paste the content of [tafeluebungsslider.js](tafeluebungsspeeder.js) in.
There you have the following features:

#### In the bottom line you have
![](https://matoex.uber.space/xbackbone/QaQI5/mUluraZa54.png/raw)

#### Change the Speed:
Reset to 1x with "s"
speed += 0.25  with "d"
speed -= 0.25  with "a"

#### Slides with no audio will be skipped in 5s/current speed

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

Note:

Downloading and copying the Videourl is currently disabled in Firefox.

Firefox may not support audio if the speed is above x4.


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


## Changelog

##### 2021-04-13
- Changed profile picture
- added +-10s with j/k buttons (currently only supported on the viewed page itself, not on the opend popup) 

##### 2021-04-12
- Added Support for H5P Videos like in PFP
- Added Hotkeys (A,S,D)
