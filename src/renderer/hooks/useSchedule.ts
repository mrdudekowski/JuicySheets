import { useState, useEffect, useCallback } from 'react'
import { LessonFormData } from '../types/form'
import { scheduleService, ScheduleData, Lesson } from '../services/ScheduleService'

export interface UseScheduleReturn {
  scheduleData: ScheduleData
  loading: boolean
  error: string | null
  addLesson: (formData: LessonFormData) => Promise<void>
  updateLesson: (lessonId: string, formData: LessonFormData) => Promise<void>
  deleteLesson: (lessonId: string) => Promise<void>
  getLessonById: (lessonId: string) => Lesson | undefined
  refreshSchedule: () => Promise<void>
}

export const useSchedule = (): UseScheduleReturn => {
  const [scheduleData, setScheduleData] = useState<ScheduleData>({
    lessons: [],
    settings: { language: 'ru' }
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Загружаем данные при инициализации
  useEffect(() => {
    loadScheduleData()
  }, [])

  const loadScheduleData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await scheduleService.loadScheduleData()
      setScheduleData(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка'
      setError(errorMessage)
      console.error('Ошибка загрузки расписания:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const saveScheduleData = useCallback(async (data: ScheduleData) => {
    try {
      await scheduleService.saveScheduleData(data)
      setScheduleData(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка'
      setError(errorMessage)
      console.error('Ошибка сохранения расписания:', err)
      throw err
    }
  }, [])

  const addLesson = useCallback(async (formData: LessonFormData) => {
    try {
      setError(null)
      const updatedLessons = scheduleService.addLesson(scheduleData.lessons, formData)
      const updatedData = { ...scheduleData, lessons: updatedLessons }
      await saveScheduleData(updatedData)
      console.log('✅ Урок добавлен:', formData.title)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка'
      setError(errorMessage)
      console.error('Ошибка при добавлении урока:', err)
      throw err
    }
  }, [scheduleData, saveScheduleData])

  const updateLesson = useCallback(async (lessonId: string, formData: LessonFormData) => {
    try {
      setError(null)
      const updatedLessons = scheduleService.updateLesson(scheduleData.lessons, lessonId, formData)
      const updatedData = { ...scheduleData, lessons: updatedLessons }
      await saveScheduleData(updatedData)
      console.log('✅ Урок обновлен:', formData.title)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка'
      setError(errorMessage)
      console.error('Ошибка при обновлении урока:', err)
      throw err
    }
  }, [scheduleData, saveScheduleData])

  const deleteLesson = useCallback(async (lessonId: string) => {
    try {
      setError(null)
      const updatedLessons = scheduleService.deleteLesson(scheduleData.lessons, lessonId)
      const updatedData = { ...scheduleData, lessons: updatedLessons }
      await saveScheduleData(updatedData)
      console.log('✅ Урок удален:', lessonId)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка'
      setError(errorMessage)
      console.error('Ошибка при удалении урока:', err)
      throw err
    }
  }, [scheduleData, saveScheduleData])

  const getLessonById = useCallback((lessonId: string): Lesson | undefined => {
    return scheduleService.getLessonById(scheduleData.lessons, lessonId)
  }, [scheduleData.lessons])

  const refreshSchedule = useCallback(async () => {
    await loadScheduleData()
  }, [loadScheduleData])

  return {
    scheduleData,
    loading,
    error,
    addLesson,
    updateLesson,
    deleteLesson,
    getLessonById,
    refreshSchedule
  }
}
