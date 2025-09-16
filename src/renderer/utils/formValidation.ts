import { LessonFormData, LessonFormErrors, AddStudentFormData, AddStudentFormErrors } from '../types/form'

// Общие функции валидации форм
export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value.trim()) {
    return `${fieldName} обязательно`
  }
  return null
}

export const validateMinLength = (value: string, minLength: number, fieldName: string): string | null => {
  if (value.trim().length < minLength) {
    return `${fieldName} должно содержать минимум ${minLength} символов`
  }
  return null
}

export const validateTimeFormat = (time: string): string | null => {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
  if (!timeRegex.test(time)) {
    return 'Время должно быть в формате ЧЧ:ММ'
  }
  return null
}

export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (email && !emailRegex.test(email)) {
    return 'Некорректный формат email'
  }
  return null
}

export const validatePhone = (phone: string): string | null => {
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/
  if (phone && !phoneRegex.test(phone)) {
    return 'Некорректный формат телефона'
  }
  return null
}

// Валидация формы урока
export const validateLessonForm = (data: LessonFormData): LessonFormErrors => {
  const errors: LessonFormErrors = {}

  const titleError = validateRequired(data.title, 'Название урока')
  if (titleError) errors.title = titleError

  const timeError = validateRequired(data.time, 'Время урока')
  if (timeError) {
    errors.time = timeError
  } else {
    const timeFormatError = validateTimeFormat(data.time)
    if (timeFormatError) errors.time = timeFormatError
  }

  const dayError = validateRequired(data.day, 'День недели')
  if (dayError) errors.day = dayError

  const roomError = validateRequired(data.room, 'Место проведения')
  if (roomError) errors.room = roomError

  const studentNameError = validateRequired(data.studentName, 'Имя студента')
  if (studentNameError) errors.studentName = studentNameError

  return errors
}

// Валидация формы студента
export const validateStudentForm = (data: AddStudentFormData): AddStudentFormErrors => {
  const errors: AddStudentFormErrors = {}

  const nameError = validateRequired(data.name, 'Имя студента')
  if (nameError) {
    errors.name = nameError
  } else {
    const nameLengthError = validateMinLength(data.name, 2, 'Имя')
    if (nameLengthError) errors.name = nameLengthError
  }

  const levelError = validateRequired(data.level, 'Уровень студента')
  if (levelError) {
    errors.level = levelError
  } else if (!isValidLevel(data.level)) {
    errors.level = 'Выберите корректный уровень'
  }

  // Валидация email (если указан)
  if (data.email) {
    const emailError = validateEmail(data.email)
    if (emailError) errors.email = emailError
  }

  // Валидация телефона (если указан)
  if (data.phone) {
    const phoneError = validatePhone(data.phone)
    if (phoneError) errors.phone = phoneError
  }

  return errors
}

// Проверка валидности уровня
const isValidLevel = (level: string): boolean => {
  const validLevels = ['beginner', 'intermediate', 'advanced']
  return validLevels.includes(level)
}

// Проверка валидности формы
export const isFormValid = (errors: Record<string, string>): boolean => {
  return Object.keys(errors).length === 0
}

// Получение первой ошибки
export const getFirstError = (errors: Record<string, string>): string | null => {
  const errorKeys = Object.keys(errors)
  if (errorKeys.length === 0) {
    return null
  }
  return errors[errorKeys[0]]
}

// Очистка ошибок при изменении поля
export const clearFieldError = (errors: Record<string, string>, fieldName: string): Record<string, string> => {
  const newErrors = { ...errors }
  delete newErrors[fieldName]
  return newErrors
}
