Adapted version of https://github.com/Jeansidharta/Youtube-Playback-speed-extension for the video portal of our university https://www.fau.tv/

# About

This is a chrome browser extension designed to allow a finer control of the playback speed of FAU.TV Videos. It was made using the [chrome extensions API](https://developer.chrome.com/extensions).

# The interface

If the current tab is not a fau.TV video, the extension icon will appear grayed-out and will be disabled. Otherwise, clicking it will display a pop-up with a number, a slider and a button named "reset":

- The number displays the current video speed. It will change according to the slider. If you desire a specific speed, you may manually type the number you want. It's maximum precision, however is of 0.1. More decimal numbers will be rounded.

- The slider controls the video speed, going from 0.0 to 4.0

- The reset button will set the video speed to 1.0

# How to install

You can  install from this local directory.

- download this repository and unzip it.

- in your chrome browser, open the options menu (three dots at the top right of your screen)->more tools->extensions

- check the "developer options" button at the top right of the screen. This will open a menu at the top of your screen.

- click on "Load unpacked" and select the previously unziped project folder.

after this, the extension will be installed.