"use strict";
const electron = require("electron");
class PreloadBridge {
  constructor() {
    this.setupAPI();
  }
  // Настраиваем API для React приложения
  setupAPI() {
    electron.contextBridge.exposeInMainWorld("electronAPI", {
      // Получаем данные расписания
      getScheduleData: () => electron.ipcRenderer.invoke("get-schedule-data"),
      // Сохраняем данные расписания
      saveScheduleData: (data) => electron.ipcRenderer.invoke("save-schedule-data", data),
      // Получаем данные из Google Sheets
      getGoogleSheetsData: () => electron.ipcRenderer.invoke("get-google-sheets-data"),
      // Сохраняем данные в Google Sheets
      saveToGoogleSheets: (data) => electron.ipcRenderer.invoke("save-to-google-sheets", data),
      // Экспорт расписания
      exportSchedule: (format) => electron.ipcRenderer.invoke("export-schedule", format),
      // Слушаем события от main процесса
      onScheduleUpdate: (callback) => {
        electron.ipcRenderer.on("schedule-update", (_, data) => callback(data));
      },
      // Удаляем слушатель событий
      removeScheduleUpdateListener: () => {
        electron.ipcRenderer.removeAllListeners("schedule-update");
      }
    });
  }
}
new PreloadBridge();
