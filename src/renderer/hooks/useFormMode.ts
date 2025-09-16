import { useState, useCallback } from 'react'

export type FormMode = 'student-selection' | 'lesson-creation' | 'add-student'

export interface UseFormModeReturn {
  formMode: FormMode
  setFormMode: (mode: FormMode) => void
  isStudentSelection: boolean
  isLessonCreation: boolean
  isAddStudent: boolean
  goToStudentSelection: () => void
  goToLessonCreation: () => void
  goToAddStudent: () => void
  resetFormMode: () => void
}

export const useFormMode = (initialMode: FormMode = 'student-selection'): UseFormModeReturn => {
  const [formMode, setFormMode] = useState<FormMode>(initialMode)

  const isStudentSelection = formMode === 'student-selection'
  const isLessonCreation = formMode === 'lesson-creation'
  const isAddStudent = formMode === 'add-student'

  const goToStudentSelection = useCallback(() => {
    setFormMode('student-selection')
  }, [])

  const goToLessonCreation = useCallback(() => {
    setFormMode('lesson-creation')
  }, [])

  const goToAddStudent = useCallback(() => {
    setFormMode('add-student')
  }, [])

  const resetFormMode = useCallback(() => {
    setFormMode('student-selection')
  }, [])

  return {
    formMode,
    setFormMode,
    isStudentSelection,
    isLessonCreation,
    isAddStudent,
    goToStudentSelection,
    goToLessonCreation,
    goToAddStudent,
    resetFormMode
  }
}
