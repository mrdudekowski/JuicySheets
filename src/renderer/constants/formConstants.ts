// Константы для форм

// Уровни студентов
export const STUDENT_LEVELS = [
  { value: 'beginner', label: 'Начинающий' },
  { value: 'intermediate', label: 'Средний' },
  { value: 'advanced', label: 'Продвинутый' }
] as const

// Дни недели
export const DAYS_OF_WEEK = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье'
] as const

// Временные слоты (каждые 30 минут)
export const TIME_SLOTS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00'
] as const

// Режимы формы
export const FORM_MODES = {
  STUDENT_SELECTION: 'student-selection',
  LESSON_CREATION: 'lesson-creation',
  ADD_STUDENT: 'add-student'
} as const

// Типы уроков
export const LESSON_TYPES = {
  ONLINE: 'online',
  OFFLINE: 'offline'
} as const

// Сообщения об ошибках
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'Поле обязательно для заполнения',
  INVALID_EMAIL: 'Некорректный формат email',
  INVALID_PHONE: 'Некорректный формат телефона',
  INVALID_TIME: 'Время должно быть в формате ЧЧ:ММ',
  MIN_LENGTH: 'Минимальная длина',
  NETWORK_ERROR: 'Ошибка сети',
  SERVER_ERROR: 'Ошибка сервера',
  VALIDATION_ERROR: 'Ошибка валидации',
  UNKNOWN_ERROR: 'Неизвестная ошибка'
} as const

// Сообщения об успехе
export const SUCCESS_MESSAGES = {
  LESSON_ADDED: 'Урок успешно добавлен',
  LESSON_UPDATED: 'Урок успешно обновлен',
  LESSON_DELETED: 'Урок успешно удален',
  STUDENT_ADDED: 'Студент успешно добавлен',
  STUDENT_UPDATED: 'Студент успешно обновлен',
  STUDENT_DELETED: 'Студент успешно удален',
  DATA_SAVED: 'Данные успешно сохранены'
} as const

// Настройки валидации
export const VALIDATION_RULES = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
  MIN_TITLE_LENGTH: 3,
  MAX_TITLE_LENGTH: 100,
  MIN_ROOM_LENGTH: 2,
  MAX_ROOM_LENGTH: 50,
  MIN_NOTES_LENGTH: 0,
  MAX_NOTES_LENGTH: 500
} as const

// Настройки UI
export const UI_CONSTANTS = {
  DEBOUNCE_DELAY: 300,
  NOTIFICATION_DURATION: 3000,
  ANIMATION_DURATION: 200,
  MAX_SEARCH_RESULTS: 10
} as const

// Цвета для дней недели
export const DAY_COLORS = {
  'Понедельник': '#ff6b6b',
  'Вторник': '#4ecdc4',
  'Среда': '#45b7d1',
  'Четверг': '#96ceb4',
  'Пятница': '#feca57',
  'Суббота': '#ff9ff3',
  'Воскресенье': '#54a0ff'
} as const

// Иконки для типов уроков
export const LESSON_ICONS = {
  ONLINE: '🌐',
  OFFLINE: '🏫',
  TIME: '🕐',
  ROOM: '📍',
  STUDENT: '👤',
  EDIT: '✏️',
  DELETE: '🗑️',
  ADD: '➕'
} as const

// Настройки localStorage
export const STORAGE_KEYS = {
  SCHEDULE: 'juicy-sheets-schedule',
  STUDENTS: 'juicy-sheets-students',
  SETTINGS: 'juicy-sheets-settings'
} as const

// Настройки API (для будущего использования)
export const API_ENDPOINTS = {
  LESSONS: '/api/lessons',
  STUDENTS: '/api/students',
  SCHEDULE: '/api/schedule'
} as const

// Настройки тестирования
export const TEST_CONSTANTS = {
  MOCK_DELAY: 1000,
  TEST_TIMEOUT: 5000
} as const
