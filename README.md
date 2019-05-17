# UNA Desktop App

## Rebranding

Change the following values to your own in `src/index.js` file:
```js
const BASE_URL = 'https://una.io/';
const TEMPLATE = 'protean';
const TITLE = 'UNA.IO Messenger';
const TRAY_TOOLTIP = 'UNA.IO Messenger (double-click - hide, click - focus)';
```

## Generate Icons

Make `1024x1024` icon and place it instead of `res/AppIcon.png`.   
To generate `AppIcon.icns` you can use use [IconGenerator](https://github.com/onmyway133/IconGenerator) app.   
To generate `AppIcon.ico` use any tool to resize it to `150x150` and convert to `.ico` format, for example [GIMP](https://www.gimp.org).   
Tray icons are needed for Windows only and can created using any suitable image editor.

## Packaging

Windows build must be made on Windows - run `package-win.bat`.  
Mac build must be made on Mac only - run `package-mac.sh`.

