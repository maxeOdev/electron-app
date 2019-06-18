// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const path = require("path");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let fileDetailWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      // preload: path.join(__dirname, 'preload.js'),
      webSecurity: false
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const { homedir } = require("os");
const { readdirSync } = require("fs");
const { ipcMain } = require("electron");

//On peut aussi écrire de la manière suivante.
//const homedir2 = require('os').homedir;
//console.log(homedir2());
ipcMain.on("getHomePath", (event, arg) => {
  const homeDir = homedir();
  event.reply("getHomePath-reply", homeDir);
});

ipcMain.on("getList", (event, arg) => {
  const list = readdirSync(arg);
  event.reply("getList-reply", list);
});

//file detail window
ipcMain.on("openFileWindow", (event, arg) => {
  fileDetailWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      // preload: path.join(__dirname, 'preload.js'),
      webSecurity: false
    }
  });
  fileDetailWindow.webContents.openDevTools();
  fileDetailWindow.loadURL(
    "file:/Users/simonaliotti/Workspace/PERIODE PRO/electron/electron-quick-start/pages/file-detail.html"
  );
  fileDetailWindow.webContents.on("did-finish-load", function() {
    fileDetailWindow.webContents.send("fileDetail", arg);
  });
});

ipcMain.on("closeDetailWindow", (event, arg) => {
  fileDetailWindow.close();
  fileDetailWindow = null;
});
 


