import { LessonFormData, LessonFormErrors, AddStudentFormData, AddStudentFormErrors } from '../types/form'

export interface FormValidationService {
  validateLessonForm(data: LessonFormData): LessonFormErrors
  validateStudentForm(data: AddStudentFormData): AddStudentFormErrors
  isFormValid(errors: Record<string, string>): boolean
  getFirstError(errors: Record<string, string>): string | null
}

// Реализация сервиса валидации форм
class FormValidationServiceImpl implements FormValidationService {
  validateLessonForm(data: LessonFormData): LessonFormErrors {
    const errors: LessonFormErrors = {}

    if (!data.title.trim()) {
      errors.title = 'Название урока обязательно'
    }

    if (!data.time.trim()) {
      errors.time = 'Время урока обязательно'
    } else if (!this.isValidTimeFormat(data.time)) {
      errors.time = 'Время должно быть в формате ЧЧ:ММ'
    }

    if (!data.day.trim()) {
      errors.day = 'День недели обязателен'
    }

    if (!data.room.trim()) {
      errors.room = 'Место проведения обязательно'
    }

    if (!data.studentName.trim()) {
      errors.studentName = 'Имя студента обязательно'
    }

    return errors
  }

  validateStudentForm(data: AddStudentFormData): AddStudentFormErrors {
    const errors: AddStudentFormErrors = {}

    if (!data.name.trim()) {
      errors.name = 'Имя студента обязательно'
    } else if (data.name.trim().length < 2) {
      errors.name = 'Имя должно содержать минимум 2 символа'
    }

    if (!data.level.trim()) {
      errors.level = 'Уровень студента обязателен'
    } else if (!this.isValidLevel(data.level)) {
      errors.level = 'Выберите корректный уровень'
    }

    // Учебные материалы и заметки теперь не обязательны
    // но можно добавить дополнительные проверки

    return errors
  }

  isFormValid(errors: Record<string, string>): boolean {
    return Object.keys(errors).length === 0
  }

  getFirstError(errors: Record<string, string>): string | null {
    const errorKeys = Object.keys(errors)
    if (errorKeys.length === 0) {
      return null
    }
    return errors[errorKeys[0]]
  }

  private isValidTimeFormat(time: string): boolean {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    return timeRegex.test(time)
  }

  private isValidLevel(level: string): boolean {
    const validLevels = ['beginner', 'intermediate', 'advanced']
    return validLevels.includes(level)
  }
}

// Экспортируем экземпляр сервиса
export const formValidationService = new FormValidationServiceImpl()
