import { useState, useEffect, useCallback } from 'react'
import { Student, AddStudentFormData } from '../types/form'
import { studentService } from '../services/StudentService'

export interface UseStudentsReturn {
  students: Student[]
  loading: boolean
  error: string | null
  addStudent: (formData: AddStudentFormData) => Promise<void>
  updateStudent: (studentId: string, formData: AddStudentFormData) => Promise<void>
  deleteStudent: (studentId: string) => Promise<void>
  getStudentById: (studentId: string) => Student | undefined
  searchStudents: (query: string) => Student[]
  refreshStudents: () => Promise<void>
}

export const useStudents = (): UseStudentsReturn => {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Загружаем данные при инициализации
  useEffect(() => {
    loadStudents()
  }, [])

  const loadStudents = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await studentService.loadStudents()
      setStudents(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка'
      setError(errorMessage)
      console.error('Ошибка загрузки студентов:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const saveStudents = useCallback(async (updatedStudents: Student[]) => {
    try {
      await studentService.saveStudents(updatedStudents)
      setStudents(updatedStudents)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка'
      setError(errorMessage)
      console.error('Ошибка сохранения студентов:', err)
      throw err
    }
  }, [])

  const addStudent = useCallback(async (formData: AddStudentFormData) => {
    try {
      setError(null)
      const updatedStudents = studentService.addStudent(students, formData)
      await saveStudents(updatedStudents)
      console.log('✅ Студент добавлен:', formData.name)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка'
      setError(errorMessage)
      console.error('Ошибка при добавлении студента:', err)
      // Не выбрасываем ошибку, чтобы не прерывать выполнение
    }
  }, [students, saveStudents])

  const updateStudent = useCallback(async (studentId: string, formData: AddStudentFormData) => {
    try {
      setError(null)
      const updatedStudents = studentService.updateStudent(students, studentId, formData)
      await saveStudents(updatedStudents)
      console.log('✅ Студент обновлен:', formData.name)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка'
      setError(errorMessage)
      console.error('Ошибка при обновлении студента:', err)
      throw err
    }
  }, [students, saveStudents])

  const deleteStudent = useCallback(async (studentId: string) => {
    try {
      setError(null)
      const updatedStudents = studentService.deleteStudent(students, studentId)
      
      // Сначала обновляем UI мгновенно
      setStudents(updatedStudents)
      
      // Потом сохраняем в localStorage (асинхронно)
      await studentService.saveStudents(updatedStudents)
      
      console.log('✅ Студент удален:', studentId, 'Осталось студентов:', updatedStudents.length)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка'
      setError(errorMessage)
      console.error('Ошибка при удалении студента:', err)
      // Не выбрасываем ошибку, чтобы не прерывать выполнение
    }
  }, [students])

  const getStudentById = useCallback((studentId: string): Student | undefined => {
    return studentService.getStudentById(students, studentId)
  }, [students])

  const searchStudents = useCallback((query: string): Student[] => {
    return studentService.searchStudents(students, query)
  }, [students])

  const refreshStudents = useCallback(async () => {
    await loadStudents()
  }, [loadStudents])

  return {
    students,
    loading,
    error,
    addStudent,
    updateStudent,
    deleteStudent,
    getStudentById,
    searchStudents,
    refreshStudents
  }
}
