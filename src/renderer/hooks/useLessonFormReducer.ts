import { useReducer } from 'react'
import { 
  LessonFormState, 
  LessonFormAction, 
  INITIAL_FORM_STATE,
  validateLessonForm 
} from '../types/form'

// Reducer для управления состоянием формы
export const lessonFormReducer = (
  state: LessonFormState, 
  action: LessonFormAction
): LessonFormState => {
  switch (action.type) {
    case 'SET_FORM_DATA':
      return {
        ...state,
        formData: { ...state.formData, ...action.payload },
        errors: {} // Очищаем ошибки при изменении данных
      }

    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload
      }

    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: {}
      }

    case 'SET_STUDENTS':
      return {
        ...state,
        students: action.payload
      }

    case 'SET_DRAGGED_STUDENT':
      return {
        ...state,
        dragDrop: {
          ...state.dragDrop,
          draggedStudent: action.payload
        }
      }

    case 'SET_DRAG_OVER':
      return {
        ...state,
        dragDrop: {
          ...state.dragDrop,
          isDragOver: action.payload.isDragOver,
          dragOverZone: action.payload.zone
        }
      }

    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.payload
      }

    case 'SET_FORM_MODE':
      return {
        ...state,
        formMode: action.payload
      }

    case 'RESET_FORM':
      return INITIAL_FORM_STATE

    default:
      return state
  }
}

// Хук для использования reducer
export const useLessonFormReducer = (initialState?: Partial<LessonFormState>) => {
  const [state, dispatch] = useReducer(lessonFormReducer, {
    ...INITIAL_FORM_STATE,
    ...initialState
  })

  // Вспомогательные функции
  const setFormData = (data: Partial<LessonFormState['formData']>) => {
    dispatch({ type: 'SET_FORM_DATA', payload: data })
  }

  const setErrors = (errors: LessonFormState['errors']) => {
    dispatch({ type: 'SET_ERRORS', payload: errors })
  }

  const clearErrors = () => {
    dispatch({ type: 'CLEAR_ERRORS' })
  }

  const setDraggedStudent = (student: LessonFormState['dragDrop']['draggedStudent']) => {
    dispatch({ type: 'SET_DRAGGED_STUDENT', payload: student })
  }

  const setDragOver = (isDragOver: boolean, zone: 'time' | 'drop' | null = null) => {
    dispatch({ type: 'SET_DRAG_OVER', payload: { isDragOver, zone } })
  }

  const setSubmitting = (isSubmitting: boolean) => {
    dispatch({ type: 'SET_SUBMITTING', payload: isSubmitting })
  }

  const resetForm = () => {
    dispatch({ type: 'RESET_FORM' })
  }

  const setFormMode = (mode: LessonFormState['formMode']) => {
    dispatch({ type: 'SET_FORM_MODE', payload: mode })
  }

  // Валидация формы
  const validateForm = () => {
    const errors = validateLessonForm(state.formData)
    if (Object.keys(errors).length > 0) {
      setErrors(errors)
      return false
    }
    clearErrors()
    return true
  }

  // Обработка drop студента
  const handleStudentDrop = (student: LessonFormState['students'][0]) => {
    setFormData({
      studentName: student.name,
      studentId: student.id,
      title: student.name // Автозаполнение названия урока
    })
    setDraggedStudent(null)
    setDragOver(false)
  }

  // Удаление студента из списка
  const removeStudent = (studentId: string) => {
    const updatedStudents = state.students.filter(student => student.id !== studentId)
    dispatch({ type: 'SET_STUDENTS', payload: updatedStudents })
    
    // Если удаляемый студент был выбран, сбрасываем выбор
    if (state.formData.studentId === studentId) {
      setFormData({
        studentName: '',
        studentId: undefined,
        title: ''
      })
      setFormMode('student-selection')
    }
  }

  // Добавление нового студента в список
  const addStudent = (student: Student) => {
    const updatedStudents = [...state.students, student]
    dispatch({ type: 'SET_STUDENTS', payload: updatedStudents })
  }

  return {
    state,
    dispatch,
    // Вспомогательные функции
    setFormData,
    setErrors,
    clearErrors,
    setDraggedStudent,
    setDragOver,
    setSubmitting,
    resetForm,
    setFormMode,
    validateForm,
    handleStudentDrop,
    removeStudent,
    addStudent
  }
}
