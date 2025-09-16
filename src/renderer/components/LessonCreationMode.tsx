import React from 'react'
import { LessonFormData } from '../types/form'
import './LessonCreationMode.css'

interface LessonCreationModeProps {
  formData: LessonFormData
  errors: Record<string, string>
  isSubmitting: boolean
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onBackToSelection: () => void
  onSubmit: (e: React.FormEvent) => void
}

const LessonCreationMode: React.FC<LessonCreationModeProps> = ({
  formData,
  errors,
  isSubmitting,
  onInputChange,
  onBackToSelection,
  onSubmit
}) => {
  return (
    <div className="lesson-creation-mode">
      <form onSubmit={onSubmit} className="lesson-form">
        {/* Заголовок с информацией о студенте */}
        <div className="lesson-header">
          <h3>📚 Создание урока</h3>
          <div className="selected-student-info">
            <span className="student-icon">👤</span>
            <span className="student-name">{formData.studentName}</span>
          </div>
        </div>

        {/* Поля формы */}
        <div className="form-fields">
          <div className="form-group">
            <label htmlFor="title">Название урока:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={onInputChange}
              className={errors.title ? 'error' : ''}
              placeholder="Название урока"
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="time">Время:</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={onInputChange}
                className={errors.time ? 'error' : ''}
              />
              {errors.time && <span className="error-message">{errors.time}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="day">День недели:</label>
              <select
                id="day"
                name="day"
                value={formData.day}
                onChange={onInputChange}
                className={errors.day ? 'error' : ''}
              >
                <option value="">Выберите день</option>
                <option value="Понедельник">Понедельник</option>
                <option value="Вторник">Вторник</option>
                <option value="Среда">Среда</option>
                <option value="Четверг">Четверг</option>
                <option value="Пятница">Пятница</option>
                <option value="Суббота">Суббота</option>
                <option value="Воскресенье">Воскресенье</option>
              </select>
              {errors.day && <span className="error-message">{errors.day}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="room">Место проведения:</label>
            <input
              type="text"
              id="room"
              name="room"
              value={formData.room}
              onChange={onInputChange}
              className={errors.room ? 'error' : ''}
              placeholder="Комната, онлайн, адрес..."
            />
            {errors.room && <span className="error-message">{errors.room}</span>}
          </div>

          <div className="form-group checkbox-group">
            <label htmlFor="isOnline">
              <input
                type="checkbox"
                id="isOnline"
                name="isOnline"
                checked={formData.isOnline}
                onChange={onInputChange}
              />
              Онлайн урок
            </label>
          </div>
        </div>

        {/* Кнопки действий */}
        <div className="form-actions">
          <button 
            type="button" 
            onClick={onBackToSelection} 
            className="back-btn"
            disabled={isSubmitting}
          >
            ← Назад к выбору студента
          </button>
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Создание...' : 'Создать урок'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default LessonCreationMode
