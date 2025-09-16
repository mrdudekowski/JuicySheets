// Типы для студентов
export interface Student {
  id: string
  name: string
  avatar?: string
  email?: string
  phone?: string
  level?: string
  materials?: string
  notes?: string
}

// Типы для формы добавления студента
export interface AddStudentFormData {
  name: string
  level: string
  materials: string
  notes: string
}

export interface AddStudentFormErrors {
  name?: string
  level?: string
  // materials и notes больше не валидируются как обязательные
}

// Типы для форм
export interface LessonFormData {
  title: string
  time: string
  day: string
  room: string
  isOnline: boolean
  studentName: string
  studentId?: string
}

export interface LessonFormErrors {
  title?: string
  time?: string
  day?: string
  room?: string
  studentName?: string
}

// Типы для drag & drop
export interface DragDropState {
  draggedStudent: Student | null
  isDragOver: boolean
  dragOverZone: 'time' | 'drop' | null
}

// Типы для формы с drag & drop
export type FormMode = 'student-selection' | 'lesson-creation'

export interface LessonFormState {
  formData: LessonFormData
  errors: LessonFormErrors
  students: Student[]
  dragDrop: DragDropState
  isSubmitting: boolean
  formMode: FormMode
}

// Типы для действий (actions)
export type LessonFormAction =
  | { type: 'SET_FORM_DATA'; payload: Partial<LessonFormData> }
  | { type: 'SET_ERRORS'; payload: LessonFormErrors }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'SET_STUDENTS'; payload: Student[] }
  | { type: 'SET_DRAGGED_STUDENT'; payload: Student | null }
  | { type: 'SET_DRAG_OVER'; payload: { isDragOver: boolean; zone: 'time' | 'drop' | null } }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'SET_FORM_MODE'; payload: FormMode }
  | { type: 'RESET_FORM' }

export interface LessonFormProps {
  onSubmit: (data: LessonFormData) => void
  onCancel: () => void
  initialData?: Partial<LessonFormData>
  isEditing?: boolean
}

// Валидация формы
export const validateLessonForm = (data: LessonFormData): LessonFormErrors => {
  const errors: LessonFormErrors = {}

  if (!data.title.trim()) {
    errors.title = 'Название урока обязательно'
  }

  if (!data.time.trim()) {
    errors.time = 'Время урока обязательно'
  } else if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(data.time)) {
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

// Опции для селектов
export const DAYS_OF_WEEK = [
  'Понедельник',
  'Вторник', 
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье'
] as const

export const TIME_SLOTS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00'
] as const

// Mock данные студентов
export const MOCK_STUDENTS: Student[] = [
  {
    id: '1',
    name: 'Иван Петров',
    email: 'ivan@example.com',
    phone: '+7 (999) 123-45-67',
    level: 'intermediate',
    materials: 'Учебник "English Grammar in Use", аудио материалы',
    notes: 'Хорошо усваивает грамматику, нужно больше практики в разговорной речи'
  },
  {
    id: '2',
    name: 'Мария Сидорова',
    email: 'maria@example.com',
    phone: '+7 (999) 234-56-78',
    level: 'beginner',
    materials: 'Учебник "Headway Beginner", карточки с словами',
    notes: 'Начинающий уровень, очень мотивированная'
  },
  {
    id: '3',
    name: 'Алексей Козлов',
    email: 'alexey@example.com',
    phone: '+7 (999) 345-67-89',
    level: 'advanced',
    materials: 'Учебник "Advanced Grammar", статьи из The Guardian',
    notes: 'Продвинутый уровень, готовится к IELTS'
  },
  {
    id: '4',
    name: 'Елена Волкова',
    email: 'elena@example.com',
    phone: '+7 (999) 456-78-90',
    level: 'elementary',
    materials: 'Учебник "New English File Elementary", видео уроки',
    notes: 'Элементарный уровень, любит интерактивные задания'
  },
  {
    id: '5',
    name: 'Дмитрий Морозов',
    email: 'dmitry@example.com',
    phone: '+7 (999) 567-89-01',
    level: 'upper-intermediate',
    materials: 'Учебник "Outcomes Upper-Intermediate", подкасты',
    notes: 'Выше среднего, интересуется бизнес английским'
  },
  {
    id: '6',
    name: 'Анна Соколова',
    email: 'anna@example.com',
    phone: '+7 (999) 678-90-12',
    level: 'proficient',
    materials: 'Аутентичные материалы, TED Talks, литература',
    notes: 'Профессиональный уровень, преподает английский'
  }
]

// Начальное состояние формы
export const INITIAL_FORM_STATE: LessonFormState = {
  formData: {
    title: '',
    time: '',
    day: '',
    room: '',
    isOnline: false,
    studentName: '',
    studentId: undefined
  },
  errors: {},
  students: MOCK_STUDENTS,
  dragDrop: {
    draggedStudent: null,
    isDragOver: false,
    dragOverZone: null
  },
  isSubmitting: false,
  formMode: 'student-selection'
}
