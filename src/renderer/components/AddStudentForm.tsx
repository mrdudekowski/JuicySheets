import React, { useState, useCallback } from 'react'
import { AddStudentFormData, AddStudentFormErrors } from '../types/form'
import './AddStudentForm.css'

interface AddStudentFormProps {
  onSubmit: (formData: AddStudentFormData) => void
  onCancel: () => void
  isOpen: boolean
}

const INITIAL_FORM_DATA: AddStudentFormData = {
  name: '',
  level: '',
  materials: '',
  notes: ''
}

const AddStudentForm: React.FC<AddStudentFormProps> = ({ 
  onSubmit, 
  onCancel, 
  isOpen = false 
}) => {
  const [formData, setFormData] = useState<AddStudentFormData>(INITIAL_FORM_DATA)
  const [errors, setErrors] = useState<AddStudentFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Обработка изменения полей
  const handleInputChange = useCallback((field: keyof AddStudentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Очищаем ошибку при изменении поля
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }, [errors])

  // Валидация формы
  const validateForm = useCallback((): boolean => {
    const newErrors: AddStudentFormErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Имя студента обязательно'
    }
    
    if (!formData.level.trim()) {
      newErrors.level = 'Уровень студента обязателен'
    }
    
    // Учебные материалы и заметки теперь не обязательны

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  // Обработка отправки формы
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      await onSubmit(formData)
      // Сброс формы после успешной отправки
      setFormData(INITIAL_FORM_DATA)
      setErrors({})
    } catch (error) {
      console.error('Ошибка при добавлении студента:', error)
    } finally {
      setIsSubmitting(false)
    }
  }, [formData, validateForm, onSubmit])

  // Обработка отмены
  const handleCancel = useCallback(() => {
    setFormData(INITIAL_FORM_DATA)
    setErrors({})
    onCancel()
  }, [onCancel])

  if (!isOpen) return null

  return (
    <div className="add-student-form-overlay">
      <div className="add-student-form">
        <div className="form-header">
          <h2>Добавить студента</h2>
          <button 
            className="close-btn" 
            onClick={handleCancel}
            title="Закрыть форму"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="student-form">
          <div className="form-content">
            {/* Имя студента */}
            <div className="form-group">
              <label htmlFor="student-name" className="form-label">
                <span className="label-icon">👤</span>
                Имя студента *
              </label>
              <input
                id="student-name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="Введите имя студента"
                disabled={isSubmitting}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            {/* Уровень студента */}
            <div className="form-group">
              <label htmlFor="student-level" className="form-label">
                <span className="label-icon">📊</span>
                Уровень студента *
              </label>
              <select
                id="student-level"
                value={formData.level}
                onChange={(e) => handleInputChange('level', e.target.value)}
                className={`form-select ${errors.level ? 'error' : ''}`}
                disabled={isSubmitting}
              >
                <option value="">Выберите уровень</option>
                <option value="beginner">Начинающий</option>
                <option value="elementary">Элементарный</option>
                <option value="intermediate">Средний</option>
                <option value="upper-intermediate">Выше среднего</option>
                <option value="advanced">Продвинутый</option>
                <option value="proficient">Профессиональный</option>
              </select>
              {errors.level && <span className="error-message">{errors.level}</span>}
            </div>

            {/* Учебные материалы */}
            <div className="form-group">
              <label htmlFor="student-materials" className="form-label">
                <span className="label-icon">📚</span>
                Учебные материалы
              </label>
              <textarea
                id="student-materials"
                value={formData.materials}
                onChange={(e) => handleInputChange('materials', e.target.value)}
                className="form-textarea"
                placeholder="Опишите учебные материалы для студента (необязательно)"
                rows={3}
                disabled={isSubmitting}
              />
            </div>

            {/* Заметки */}
            <div className="form-group">
              <label htmlFor="student-notes" className="form-label">
                <span className="label-icon">📝</span>
                Заметки
              </label>
              <textarea
                id="student-notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="form-textarea"
                placeholder="Дополнительные заметки о студенте (необязательно)"
                rows={3}
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Кнопки действий */}
          <div className="form-actions">
            <button
              type="button"
              onClick={handleCancel}
              className="cancel-btn"
              disabled={isSubmitting}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Добавляем...' : 'Добавить студента'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddStudentForm
