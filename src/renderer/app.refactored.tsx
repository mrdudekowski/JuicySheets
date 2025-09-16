import React, { useState } from 'react'
import './styles/App.css'
import AddLessonButton from './components/AddLessonButton'
import AddLessonForm from './components/forms/AddLessonForm'
import ScheduleView from './components/ScheduleView'
import LoadingSpinner from './components/LoadingSpinner'
import TestFormReducer from './components/TestFormReducer'
import { useSchedule } from './hooks/useSchedule'
import { useErrorHandler } from './utils/errorHandling'
import { LessonFormData } from './types/form'

// Главный компонент приложения (рефакторированная версия)
const App: React.FC = () => {
  // Используем новые хуки вместо локального состояния
  const {
    scheduleData,
    loading,
    error,
    addLesson,
    updateLesson,
    deleteLesson,
    refreshSchedule
  } = useSchedule()

  const { handleError } = useErrorHandler()

  // Локальное состояние только для UI
  const [showAddForm, setShowAddForm] = useState(false)
  const [showTest, setShowTest] = useState(false)
  const [editingLesson, setEditingLesson] = useState<string | null>(null)

  // Обработчики для формы урока
  const handleAddLesson = async (formData: LessonFormData) => {
    try {
      await addLesson(formData)
      setShowAddForm(false)
      console.log('✅ Урок добавлен успешно')
    } catch (error) {
      handleError(error, 'Добавление урока')
    }
  }

  const handleUpdateLesson = async (formData: LessonFormData) => {
    try {
      if (editingLesson) {
        await updateLesson(editingLesson, formData)
        setEditingLesson(null)
        setShowAddForm(false)
        console.log('✅ Урок обновлен успешно')
      }
    } catch (error) {
      handleError(error, 'Обновление урока')
    }
  }

  const handleDeleteLesson = async (lessonId: string) => {
    try {
      await deleteLesson(lessonId)
      console.log('✅ Урок удален успешно')
    } catch (error) {
      handleError(error, 'Удаление урока')
    }
  }

  const handleEditLesson = (lessonId: string) => {
    setEditingLesson(lessonId)
    setShowAddForm(true)
  }

  // Обработчики для UI
  const handleOpenAddForm = () => {
    setEditingLesson(null)
    setShowAddForm(true)
  }

  const handleCloseAddForm = () => {
    setShowAddForm(false)
    setEditingLesson(null)
  }

  const toggleTest = () => {
    setShowTest(!showTest)
  }

  // Обработка ошибок
  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h2>❌ Ошибка загрузки</h2>
          <p>{error}</p>
          <button onClick={refreshSchedule} className="retry-btn">
            🔄 Попробовать снова
          </button>
        </div>
      </div>
    )
  }

  // Состояние загрузки
  if (loading) {
    return (
      <div className="app">
        <header className="app-header">
          <div className="header-text">
            <h1>JuicySheets V2</h1>
            <p>Управление расписанием уроков</p>
          </div>
        </header>
        <LoadingSpinner 
          message="Загрузка расписания..." 
          size="large"
        />
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-text">
          <h1>JuicySheets V2</h1>
          <p>Управление расписанием уроков</p>
        </div>
      </header>

      <aside className="sidebar">
        <AddLessonButton onClick={handleOpenAddForm} />
        <button 
          onClick={toggleTest}
          className="test-toggle-btn"
          title="Переключить тестовый режим"
        >
          🧪
        </button>
      </aside>
      
      <main className="app-main">
        <ScheduleView
          lessons={scheduleData.lessons}
          onEditLesson={handleEditLesson}
          onDeleteLesson={handleDeleteLesson}
        />
      </main>

      {/* Форма добавления/редактирования урока */}
      {showAddForm && (
        <AddLessonForm
          onSubmit={editingLesson ? handleUpdateLesson : handleAddLesson}
          onCancel={handleCloseAddForm}
          isEditing={!!editingLesson}
        />
      )}

      {/* Тестовый компонент */}
      {showTest && (
        <div className="test-overlay">
          <TestFormReducer />
          <button 
            onClick={toggleTest}
            className="close-test-btn"
            title="Закрыть тест"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}

export default App
