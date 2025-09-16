import React, { useCallback, useState, useEffect } from 'react'
import { LessonFormData, Student, AddStudentFormData } from '../../types/form'
import { useDragDrop } from '../../hooks/useDragDrop'
import { useFormMode } from '../../hooks/useFormMode'
import { useErrorHandler } from '../../utils/errorHandling'
import { formValidationService } from '../../services/FormValidationService'
import StudentSelectionMode from '../StudentSelectionMode'
import LessonCreationMode from '../LessonCreationMode'
import AddStudentForm from '../AddStudentForm'
import './AddLessonForm.css'

interface AddLessonFormProps {
  onSubmit: (formData: LessonFormData) => void
  onCancel: () => void
  isEditing?: boolean
  // lifted state from App (optional for backward-compat in tests)
  students?: Student[]
  onAddStudentGlobal?: (formData: AddStudentFormData) => Promise<void>
  onDeleteStudentGlobal?: (studentId: string) => Promise<void>
}

const AddLessonForm: React.FC<AddLessonFormProps> = ({ 
  onSubmit, 
  onCancel, 
  isEditing = false,
  students,
  onAddStudentGlobal,
  onDeleteStudentGlobal
}) => {
  // Используем переданные сверху данные вместо локального useStudents
  const { handleError } = useErrorHandler()
  const {
    formMode,
    setFormMode,
    isStudentSelection,
    isLessonCreation,
    isAddStudent,
    goToStudentSelection,
    goToLessonCreation,
    goToAddStudent,
    resetFormMode
  } = useFormMode()

  const {
    draggedStudent,
    isDragOver,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    setDragOver,
    clearDraggedStudent
  } = useDragDrop()

  // Локальное состояние формы
  const [formData, setFormData] = useState<LessonFormData>({
    title: '',
    time: '',
    day: '',
    room: '',
    isOnline: false,
    studentName: '',
    studentId: undefined
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Уведомления
  const [deletedStudentName, setDeletedStudentName] = useState<string | null>(null)
  const [addedStudentName, setAddedStudentName] = useState<string | null>(null)

  // Инициализация формы при редактировании
  useEffect(() => {
    if (isEditing) {
      // В будущем здесь будет загрузка данных урока для редактирования
      console.log('Режим редактирования урока')
    }
  }, [isEditing])


  // Обработчики для drag & drop студентов
  const handleStudentDragStart = useCallback((student: Student) => {
    handleDragStart({} as React.DragEvent, student)
  }, [handleDragStart])

  const handleStudentDragEnd = useCallback((e: React.DragEvent) => {
    handleDragEnd(e)
  }, [handleDragEnd])

  // Обработка выбора студента
  const handleStudentSelect = useCallback((student: Student) => {
    if (student && student.id) {
      setFormData(prev => ({
        ...prev,
        studentName: student.name,
        studentId: student.id,
        title: `${student.name} - Урок`
      }))
      goToLessonCreation()
    } else {
      // Сброс выбора студента
      setFormData(prev => ({
        ...prev,
        studentName: '',
        studentId: undefined,
        title: ''
      }))
      goToStudentSelection()
    }
  }, [goToLessonCreation, goToStudentSelection])

  // Возврат к выбору студента
  const handleBackToSelection = useCallback(() => {
    goToStudentSelection()
  }, [goToStudentSelection])

  // Добавление нового студента
  const handleAddStudent = useCallback(() => {
    goToAddStudent()
  }, [goToAddStudent])

  // Обработка закрытия формы добавления студента
  const handleCloseAddStudentForm = useCallback(() => {
    goToStudentSelection()
  }, [goToStudentSelection])

  // Обработка отправки формы добавления студента
  const handleAddStudentSubmit = useCallback(async (formData: AddStudentFormData) => {
    try {
      if (onAddStudentGlobal) {
        await onAddStudentGlobal(formData)
      }
      console.log('✅ Новый студент добавлен:', formData.name)
      
      // Показываем уведомление об успешном добавлении
      setAddedStudentName(formData.name)
      setTimeout(() => setAddedStudentName(null), 3000)
      
      // Возвращаемся к выбору студента
      goToStudentSelection()
    } catch (error) {
      handleError(error, 'Добавление студента')
    }
  }, [onAddStudentGlobal, goToStudentSelection, handleError])

  // Обработка изменения полей формы
  const handleFieldChange = useCallback((field: keyof LessonFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Очищаем ошибку для этого поля
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }, [errors])

  // Валидация формы
  const validateForm = useCallback(() => {
    const validationErrors = formValidationService.validateLessonForm(formData)
    setErrors(validationErrors)
    return formValidationService.isFormValid(validationErrors)
  }, [formData])

  // Обработка отправки формы
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      console.log('❌ Форма содержит ошибки')
      return
    }

    try {
      setIsSubmitting(true)
      await onSubmit(formData)
      console.log('✅ Форма отправлена успешно')
    } catch (error) {
      handleError(error, 'Отправка формы урока')
    } finally {
      setIsSubmitting(false)
    }
  }, [formData, validateForm, onSubmit, handleError])

  // Обработка отмены
  const handleCancel = useCallback(() => {
    setFormData({
      title: '',
      time: '',
      day: '',
      room: '',
      isOnline: false,
      studentName: '',
      studentId: undefined
    })
    setErrors({})
    resetFormMode()
    onCancel()
  }, [onCancel, resetFormMode])

  // Обработка сброса формы
  const handleReset = useCallback(() => {
    setFormData({
      title: '',
      time: '',
      day: '',
      room: '',
      isOnline: false,
      studentName: '',
      studentId: undefined
    })
    setErrors({})
    resetFormMode()
  }, [resetFormMode])

  return (
    <div className="lesson-form-overlay">
      <div className="lesson-form">
        <div className="form-header">
          <h2>{isEditing ? 'Редактировать урок' : 'Добавить урок'}</h2>
          <button 
            className="close-btn"
            onClick={handleCancel}
            title="Закрыть форму"
          >
            ✕
          </button>
        </div>

        <div className="form-content">
          {/* Режим выбора студента */}
          {isStudentSelection && (
            <StudentSelectionMode
              students={students || []}
              onStudentSelect={handleStudentSelect}
              onAddStudent={handleAddStudent}
              onStudentDragStart={handleStudentDragStart}
              onStudentDragEnd={handleStudentDragEnd}
            />
          )}

          {/* Режим создания урока */}
          {isLessonCreation && (
            <LessonCreationMode
              formData={formData}
              errors={errors}
              onFieldChange={handleFieldChange}
              onSubmit={handleSubmit}
              onBackToSelection={handleBackToSelection}
              isSubmitting={isSubmitting}
            />
          )}

          {/* Режим добавления студента */}
          {isAddStudent && (
            <AddStudentForm
              onSubmit={handleAddStudentSubmit}
              onCancel={handleCloseAddStudentForm}
              isOpen={true}
            />
          )}

        </div>

        {/* Уведомления */}
        {deletedStudentName && (
          <div className="notification success">
            ✅ Студент "{deletedStudentName}" удален
          </div>
        )}
        
        {addedStudentName && (
          <div className="notification success">
            ✅ Студент "{addedStudentName}" добавлен
          </div>
        )}
      </div>
    </div>
  )
}

export default AddLessonForm