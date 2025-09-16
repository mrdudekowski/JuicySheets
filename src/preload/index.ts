import { contextBridge, ipcRenderer } from 'electron'

// Это "переводчик" - связывает main и renderer процессы
class PreloadBridge {
  constructor() {
    this.setupAPI()
  }

  // Настраиваем API для React приложения
  private setupAPI(): void {
    // Предоставляем безопасный API для renderer процесса
    contextBridge.exposeInMainWorld('electronAPI', {
      // Получаем данные расписания
      getScheduleData: () => ipcRenderer.invoke('get-schedule-data'),
      
      // Сохраняем данные расписания
      saveScheduleData: (data: any) => ipcRenderer.invoke('save-schedule-data', data),
      
      // Получаем данные из Google Sheets
      getGoogleSheetsData: () => ipcRenderer.invoke('get-google-sheets-data'),
      
      // Сохраняем данные в Google Sheets
      saveToGoogleSheets: (data: any) => ipcRenderer.invoke('save-to-google-sheets', data),
      
      // Экспорт расписания
      exportSchedule: (format: string) => ipcRenderer.invoke('export-schedule', format),
      
      // Слушаем события от main процесса
      onScheduleUpdate: (callback: (data: any) => void) => {
        ipcRenderer.on('schedule-update', (_, data) => callback(data))
      },
      
      // Удаляем слушатель событий
      removeScheduleUpdateListener: () => {
        ipcRenderer.removeAllListeners('schedule-update')
      }
    })
  }
}

// Запускаем "переводчика"
new PreloadBridge()