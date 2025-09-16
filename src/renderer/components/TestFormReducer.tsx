import React from 'react'
import { useLessonFormReducer } from '../hooks/useLessonFormReducer'
import { Student } from '../types/form'
import './TestFormReducer.css'

const TestFormReducer: React.FC = () => {
  const {
    state,
    setFormData,
    setDraggedStudent,
    setDragOver,
    handleStudentDrop,
    validateForm,
    resetForm
  } = useLessonFormReducer()

  // Тестируем изменение данных формы
  const testFormData = () => {
    console.log('🧪 Тестируем изменение данных формы...')
    setFormData({
      title: 'Математика',
      time: '10:00',
      day: 'Понедельник'
    })
  }

  // Тестируем drag & drop
  const testDragDrop = (student: Student) => {
    console.log('🧪 Тестируем drag & drop...')
    setDraggedStudent(student)
    setDragOver(true, 'drop')
    
    // Симулируем drop через 1 секунду
    setTimeout(() => {
      handleStudentDrop(student)
    }, 1000)
  }

  // Тестируем валидацию
  const testValidation = () => {
    console.log('🧪 Тестируем валидацию...')
    const isValid = validateForm()
    console.log('Форма валидна:', isValid)
  }

  // Тестируем сброс формы
  const testReset = () => {
    console.log('🧪 Тестируем сброс формы...')
    resetForm()
  }

  return (
    <div className="test-container">
      <h2>🧪 Тестирование Reducer и Типов</h2>
      
      {/* Текущее состояние */}
      <div className="state-display">
        <h3>📊 Текущее состояние:</h3>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>

      {/* Компактное отображение ключевых данных */}
      <div className="key-data-display">
        <h3>🔑 Ключевые данные:</h3>
        <div className="key-data-grid">
          <div className="key-data-item">
            <strong>Форма:</strong>
            <div>Название: {state.formData.title || 'Пусто'}</div>
            <div>Время: {state.formData.time || 'Пусто'}</div>
            <div>День: {state.formData.day || 'Пусто'}</div>
            <div>Студент: {state.formData.studentName || 'Пусто'}</div>
          </div>
          <div className="key-data-item">
            <strong>Drag & Drop:</strong>
            <div>Перетаскивается: {state.dragDrop.draggedStudent?.name || 'Никто'}</div>
            <div>Над зоной: {state.dragDrop.isDragOver ? 'Да' : 'Нет'}</div>
            <div>Зона: {state.dragDrop.dragOverZone || 'Нет'}</div>
          </div>
          <div className="key-data-item">
            <strong>Статус:</strong>
            <div>Отправка: {state.isSubmitting ? 'Да' : 'Нет'}</div>
            <div>Ошибки: {Object.keys(state.errors).length}</div>
            <div>Студентов: {state.students.length}</div>
          </div>
        </div>
      </div>

      {/* Кнопки тестирования */}
      <div className="test-buttons">
        <button onClick={testFormData} className="test-btn">
          📝 Тест данных формы
        </button>
        
        <button onClick={testValidation} className="test-btn">
          ✅ Тест валидации
        </button>
        
        <button onClick={testReset} className="test-btn">
          🔄 Тест сброса
        </button>
      </div>

      {/* Тест drag & drop */}
      <div className="drag-test">
        <h3>🎯 Тест Drag & Drop:</h3>
        <div className="students-grid">
          {state.students.slice(0, 3).map(student => (
            <div 
              key={student.id}
              className="student-card"
              onClick={() => testDragDrop(student)}
            >
              👤 {student.name}
            </div>
          ))}
        </div>
      </div>

      {/* Отображение ошибок */}
      {Object.keys(state.errors).length > 0 && (
        <div className="errors-display">
          <h3>❌ Ошибки:</h3>
          {Object.entries(state.errors).map(([field, error]) => (
            <div key={field} className="error-item">
              <strong>{field}:</strong> {error}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TestFormReducer
