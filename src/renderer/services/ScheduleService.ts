import { LessonFormData } from '../types/form'

// Типы для сервиса расписания
export interface Lesson {
  id: string
  title: string
  time: string
  day: string
  room: string
  isOnline: boolean
  studentName: string
}

export interface ScheduleData {
  lessons: Lesson[]
  settings: {
    language: 'ru' | 'en'
  }
}

export interface ScheduleService {
  loadScheduleData(): Promise<ScheduleData>
  saveScheduleData(data: ScheduleData): Promise<void>
  addLesson(lessons: Lesson[], formData: LessonFormData): Lesson[]
  updateLesson(lessons: Lesson[], lessonId: string, formData: LessonFormData): Lesson[]
  deleteLesson(lessons: Lesson[], lessonId: string): Lesson[]
  getLessonById(lessons: Lesson[], lessonId: string): Lesson | undefined
}

// Реализация сервиса расписания
class ScheduleServiceImpl implements ScheduleService {
  private readonly STORAGE_KEY = 'juicy-sheets-schedule'

  async loadScheduleData(): Promise<ScheduleData> {
    try {
      // В будущем здесь будет вызов к main процессу через preload
      // const data = await window.electronAPI.getScheduleData()
      
      // Пока используем localStorage для демонстрации
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored)
      }

      // Возвращаем тестовые данные по умолчанию
      return this.getDefaultScheduleData()
    } catch (error) {
      console.error('Ошибка загрузки данных расписания:', error)
      throw new Error('Не удалось загрузить данные расписания')
    }
  }

  async saveScheduleData(data: ScheduleData): Promise<void> {
    try {
      // В будущем здесь будет вызов к main процессу через preload
      // await window.electronAPI.saveScheduleData(data)
      
      // Пока используем localStorage для демонстрации
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data))
      console.log('✅ Данные расписания сохранены')
    } catch (error) {
      console.error('Ошибка сохранения данных расписания:', error)
      throw new Error('Не удалось сохранить данные расписания')
    }
  }

  addLesson(lessons: Lesson[], formData: LessonFormData): Lesson[] {
    const newLesson: Lesson = {
      id: crypto.randomUUID(),
      title: formData.title,
      time: formData.time,
      day: formData.day,
      room: formData.room,
      isOnline: formData.isOnline,
      studentName: formData.studentName
    }

    return [...lessons, newLesson]
  }

  updateLesson(lessons: Lesson[], lessonId: string, formData: LessonFormData): Lesson[] {
    return lessons.map(lesson => 
      lesson.id === lessonId 
        ? {
            ...lesson,
            title: formData.title,
            time: formData.time,
            day: formData.day,
            room: formData.room,
            isOnline: formData.isOnline,
            studentName: formData.studentName
          }
        : lesson
    )
  }

  deleteLesson(lessons: Lesson[], lessonId: string): Lesson[] {
    return lessons.filter(lesson => lesson.id !== lessonId)
  }

  getLessonById(lessons: Lesson[], lessonId: string): Lesson | undefined {
    return lessons.find(lesson => lesson.id === lessonId)
  }

  private getDefaultScheduleData(): ScheduleData {
    return {
      lessons: [
        { 
          id: '1', 
          title: 'Математика', 
          time: '11:00', 
          day: 'Понедельник', 
          room: '101',
          isOnline: false,
          studentName: 'Матвей'
        },
        { 
          id: '2', 
          title: 'Физика', 
          time: '10:00', 
          day: 'Понедельник', 
          room: 'Zoom',
          isOnline: true,
          studentName: 'Алиса'
        },
        { 
          id: '3', 
          title: 'Химия', 
          time: '14:00', 
          day: 'Вторник', 
          room: '102',
          isOnline: false,
          studentName: 'Дмитрий'
        }
      ],
      settings: { language: 'ru' }
    }
  }
}

// Экспортируем экземпляр сервиса
export const scheduleService = new ScheduleServiceImpl()
