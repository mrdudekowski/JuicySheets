import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'

// Создаем корневой элемент React
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

// Рендерим главный компонент
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)