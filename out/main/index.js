"use strict";
const electron = require("electron");
const path = require("path");
class MainProcess {
  mainWindow = null;
  constructor() {
    electron.app.whenReady().then(() => {
      this.createWindow();
    });
    electron.app.on("window-all-closed", () => {
      if (process.platform !== "darwin") {
        electron.app.quit();
      }
    });
  }
  // Создаем главное окно приложения
  createWindow() {
    this.mainWindow = new electron.BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, "../preload/index.js")
      }
    });
    if (process.env.NODE_ENV === "development") {
      this.mainWindow.loadURL("http://localhost:5173");
    } else {
      this.mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
    }
  }
}
new MainProcess();
