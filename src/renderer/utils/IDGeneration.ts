/**
 * Генерация уникальных ID для приложения
 */

/**
 * Генерирует уникальный ID используя crypto.randomUUID или fallback
 * @returns {string} Уникальный ID
 */
export function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  
  // Fallback для случаев, когда crypto.randomUUID недоступен
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Генерирует короткий ID для временных элементов
 * @returns {string} Короткий уникальный ID
 */
export function generateShortId(): string {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Генерирует ID для студентов
 * @returns {string} ID студента
 */
export function generateStudentId(): string {
  return `student_${generateId()}`;
}

/**
 * Генерирует ID для уроков
 * @returns {string} ID урока
 */
export function generateLessonId(): string {
  return `lesson_${generateId()}`;
}
