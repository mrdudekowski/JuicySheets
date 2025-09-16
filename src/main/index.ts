import { app, BrowserWindow } from 'electron'
import { join } from 'path'

// Это "директор" - управляет всем приложением
class MainProcess {
  private mainWindow: BrowserWindow | null = null

  constructor() {
    // Когда приложение готово - создаем окно
    app.whenReady().then(() => {
      this.createWindow()
    })

    // Когда все окна закрыты - выходим из приложения
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })
  }

  // Создаем главное окно приложения
  private createWindow(): void {
    this.mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: join(__dirname, '../preload/index.js')
      }
    })

    // Загружаем React приложение
    if (process.env.NODE_ENV === 'development') {
      this.mainWindow.loadURL('http://localhost:5173')
    } else {
      this.mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }
  }
}

// Запускаем "директора"
new MainProcess()