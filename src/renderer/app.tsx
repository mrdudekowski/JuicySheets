import React, { useState } from 'react'
import './styles/app.css'
import AddLessonButton from './components/AddLessonButton'
import AddLessonForm from './components/forms/AddLessonForm'
import ScheduleView from './components/ScheduleView'
import LoadingSpinner from './components/LoadingSpinner'
import TestFormReducer from './components/TestFormReducer'
import DeleteZone from './components/DeleteZone'
import { useSchedule } from './hooks/useSchedule'
import { useStudents } from './hooks/useStudents'
import { useErrorHandler } from './utils/errorHandling'
import { useDragDrop } from './hooks/useDragDrop'
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

  // Хук для работы со студентами
  const { students, deleteStudent, addStudent } = useStudents()

  // Хук для drag & drop
  const {
    isDeleteZoneDragOver,
    handleDeleteZoneDragOver,
    handleDeleteZoneDragLeave,
    handleDeleteZoneDrop
  } = useDragDrop()

  // Локальное состояние только для UI
  const [showAddForm, setShowAddForm] = useState(false)
  const [showTest, setShowTest] = useState(false)
  const [editingLesson, setEditingLesson] = useState<string | null>(null)

  // Обработчик удаления студента через drag & drop
  const handleStudentDelete = React.useCallback(async (studentId: string) => {
    try {
      console.log('🎯 Начинаем удаление студента:', studentId)
      console.log('🎯 Текущее количество студентов:', students.length)
      const student = students.find(s => s.id === studentId)
      const studentName = student?.name || 'Неизвестный студент'
      console.log('🎯 Удаляем студента:', studentName)
      await deleteStudent(studentId)
      console.log('✅ Студент удален:', studentName, studentId)
      console.log('✅ Новое количество студентов:', students.length - 1)
    } catch (error) {
      console.error('❌ Ошибка при удалении студента:', error)
      handleError(error, 'Удаление студента')
    }
  }, [students, deleteStudent, handleError])

  // Глобальные обработчики drag & drop для зоны удаления
  React.useEffect(() => {
    if (!showAddForm) return

    const handleGlobalDragOver = (e: DragEvent) => {
      e.preventDefault()
      console.log('🎯 Global drag over')
    }

    const handleGlobalDrop = (e: DragEvent) => {
      e.preventDefault()
      // Удаляем студента только если дроп пришёл в область delete-zone
      const target = e.target as Element | null
      const isOverDeleteZone = !!(target && target.closest && target.closest('.delete-zone'))

      // В некоторых браузерах target может быть window/документом — используем координаты
      const byPoint = document.elementsFromPoint
        ? document.elementsFromPoint(e.clientX, e.clientY).some(el => el.classList?.contains('delete-zone'))
        : false

      if (!isOverDeleteZone && !byPoint) {
        return
      }

      const studentId = e.dataTransfer?.getData('text/plain')
      console.log('🎯 Global drop (validated delete-zone):', { studentId })
      if (studentId) {
        handleStudentDelete(studentId)
      }
    }

    // Добавляем глобальные обработчики
    document.addEventListener('dragover', handleGlobalDragOver)
    document.addEventListener('drop', handleGlobalDrop)

    return () => {
      document.removeEventListener('dragover', handleGlobalDragOver)
      document.removeEventListener('drop', handleGlobalDrop)
    }
  }, [showAddForm, handleStudentDelete])

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


  const handleEditLesson = (lesson: any) => {
    // lesson has id
    setEditingLesson(lesson?.id)
    setShowAddForm(true)
  }

  // Обработчики для зоны удаления
  const handleGlobalDeleteZoneDragOver = (e: React.DragEvent) => {
    handleDeleteZoneDragOver(e)
  }

  const handleGlobalDeleteZoneDragEnter = (e: React.DragEvent) => {
    handleDeleteZoneDragOver(e)
  }

  const handleGlobalDeleteZoneDragLeave = (e: React.DragEvent) => {
    handleDeleteZoneDragLeave(e)
  }

  const handleGlobalDeleteZoneDrop = (e: React.DragEvent) => {
    handleDeleteZoneDrop(e, handleStudentDelete)
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
          students={students}
          onAddStudentGlobal={async (data) => {
            await addStudent(data)
          }}
          onDeleteStudentGlobal={async (studentId) => {
            await deleteStudent(studentId)
          }}
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

      {/* Зона удаления - показывается только когда открыто модальное окно */}
      {showAddForm && (
        <DeleteZone
          isDragOver={isDeleteZoneDragOver}
          onDragOver={handleGlobalDeleteZoneDragOver}
          onDragEnter={handleGlobalDeleteZoneDragEnter}
          onDragLeave={handleGlobalDeleteZoneDragLeave}
          onDrop={handleGlobalDeleteZoneDrop}
        />
      )}

    </div>
  )
}

export default App