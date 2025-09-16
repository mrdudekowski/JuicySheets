// Утилиты для обработки ошибок

export interface AppError {
  message: string
  code?: string
  details?: any
  timestamp: Date
}

export interface ErrorHandler {
  handleError: (error: unknown, context?: string) => AppError
  logError: (error: AppError) => void
  showError: (error: AppError) => void
}

// Создание объекта ошибки
export const createError = (message: string, code?: string, details?: any): AppError => {
  return {
    message,
    code,
    details,
    timestamp: new Date()
  }
}

// Обработка неизвестных ошибок
export const handleUnknownError = (error: unknown, context?: string): AppError => {
  let message = 'Произошла неизвестная ошибка'
  let code = 'UNKNOWN_ERROR'
  let details = error

  if (error instanceof Error) {
    message = error.message
    code = error.name
    details = {
      stack: error.stack,
      name: error.name
    }
  } else if (typeof error === 'string') {
    message = error
    code = 'STRING_ERROR'
  }

  if (context) {
    message = `${context}: ${message}`
  }

  return createError(message, code, details)
}

// Логирование ошибок
export const logError = (error: AppError): void => {
  console.error('🚨 Ошибка приложения:', {
    message: error.message,
    code: error.code,
    details: error.details,
    timestamp: error.timestamp.toISOString()
  })
}

// Показ ошибки пользователю (в будущем можно интегрировать с toast уведомлениями)
export const showError = (error: AppError): void => {
  // Пока просто логируем, в будущем можно показать toast или модальное окно
  console.error('❌ Ошибка для пользователя:', error.message)
  
  // В будущем здесь будет:
  // toast.error(error.message)
  // или
  // showModal({ type: 'error', message: error.message })
}

// Обработка ошибок API
export const handleApiError = (error: unknown, endpoint?: string): AppError => {
  let message = 'Ошибка при обращении к серверу'
  let code = 'API_ERROR'

  if (error instanceof Error) {
    if (error.message.includes('Network Error')) {
      message = 'Ошибка сети. Проверьте подключение к интернету'
      code = 'NETWORK_ERROR'
    } else if (error.message.includes('404')) {
      message = 'Запрашиваемый ресурс не найден'
      code = 'NOT_FOUND'
    } else if (error.message.includes('403')) {
      message = 'Недостаточно прав для выполнения операции'
      code = 'FORBIDDEN'
    } else if (error.message.includes('500')) {
      message = 'Внутренняя ошибка сервера'
      code = 'SERVER_ERROR'
    } else {
      message = error.message
    }
  }

  if (endpoint) {
    message = `${endpoint}: ${message}`
  }

  return createError(message, code, { endpoint, originalError: error })
}

// Обработка ошибок валидации
export const handleValidationError = (errors: Record<string, string>): AppError => {
  const firstError = Object.values(errors)[0]
  return createError(
    firstError || 'Ошибка валидации формы',
    'VALIDATION_ERROR',
    { validationErrors: errors }
  )
}

// Обработка ошибок localStorage
export const handleStorageError = (error: unknown, operation: string): AppError => {
  let message = `Ошибка при ${operation} данных`
  let code = 'STORAGE_ERROR'

  if (error instanceof Error) {
    if (error.message.includes('QuotaExceededError')) {
      message = 'Недостаточно места в локальном хранилище'
      code = 'STORAGE_QUOTA_EXCEEDED'
    } else if (error.message.includes('SecurityError')) {
      message = 'Ошибка безопасности при доступе к хранилищу'
      code = 'STORAGE_SECURITY_ERROR'
    } else {
      message = error.message
    }
  }

  return createError(message, code, { operation, originalError: error })
}

// Универсальный обработчик ошибок
export const errorHandler: ErrorHandler = {
  handleError: (error: unknown, context?: string) => {
    const appError = handleUnknownError(error, context)
    logError(appError)
    return appError
  },

  logError: (error: AppError) => {
    logError(error)
  },

  showError: (error: AppError) => {
    showError(error)
  }
}

// Хук для обработки ошибок в компонентах
export const useErrorHandler = () => {
  const handleError = (error: unknown, context?: string) => {
    const appError = errorHandler.handleError(error, context)
    errorHandler.showError(appError)
    return appError
  }

  return { handleError }
}
