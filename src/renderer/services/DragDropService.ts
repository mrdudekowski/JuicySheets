import { Student } from '../types/form'
import { logger } from '../utils/logger'

export interface DragDropService {
  handleDragStart(e: React.DragEvent, student: Student): void
  handleDragEnd(e: React.DragEvent): void
  handleDragOver(e: React.DragEvent): void
  handleDragLeave(e: React.DragEvent): void
  handleDrop(e: React.DragEvent, onStudentDrop: (student: Student) => void): void
  handleDeleteDrop(e: React.DragEvent, onStudentDelete: (studentId: string) => void): void
  setDragEffect(e: React.DragEvent, effect: 'move' | 'copy' | 'link' | 'none'): void
}

// Реализация сервиса drag & drop
class DragDropServiceImpl implements DragDropService {
  handleDragStart(e: React.DragEvent, student: Student): void {
    try {
      e.dataTransfer.setData('text/plain', student.id)
      e.dataTransfer.effectAllowed = 'move'
      logger.debug('🔄 Начато перетаскивание студента:', student.name)
    } catch (error) {
      console.error('Ошибка при начале перетаскивания:', error)
    }
  }

  handleDragEnd(e: React.DragEvent): void {
    try {
      e.dataTransfer.clearData()
      logger.debug('✅ Перетаскивание завершено')
    } catch (error) {
      console.error('Ошибка при завершении перетаскивания:', error)
    }
  }

  handleDragOver(e: React.DragEvent): void {
    try {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'move'
    } catch (error) {
      logger.error('Ошибка при обработке drag over:', error)
    }
  }

  handleDragLeave(e: React.DragEvent): void {
    try {
      e.preventDefault()
      // Можно добавить дополнительную логику при уходе с зоны
    } catch (error) {
      logger.error('Ошибка при обработке drag leave:', error)
    }
  }

  handleDrop(e: React.DragEvent, onStudentDrop: (student: Student) => void): void {
    try {
      e.preventDefault()
      const studentId = e.dataTransfer.getData('text/plain')
      
      if (studentId) {
        // Создаем объект студента с полными данными
        const student: Student = {
          id: studentId,
          name: 'Студент', // Имя будет получено из контекста
          level: 'beginner',
          materials: '',
          notes: ''
        }
        
        onStudentDrop(student)
        logger.debug('✅ Студент добавлен в урок:', studentId)
      }
    } catch (error) {
      logger.error('Ошибка при обработке drop:', error)
    }
  }

  handleDeleteDrop(e: React.DragEvent, onStudentDelete: (studentId: string) => void): void {
    try {
      e.preventDefault()
      const studentId = e.dataTransfer.getData('text/plain')
      
      logger.debug('🎯 DragDropService: handleDeleteDrop вызван с studentId:', studentId)
      
      if (studentId) {
        logger.debug('🎯 DragDropService: вызываем onStudentDelete для:', studentId)
        onStudentDelete(studentId)
        logger.debug('🗑️ DragDropService: Студент удален:', studentId)
      } else {
        logger.warn('⚠️ DragDropService: studentId не найден в dataTransfer')
      }
    } catch (error) {
      logger.error('❌ DragDropService: Ошибка при удалении студента:', error)
    }
  }

  setDragEffect(e: React.DragEvent, effect: 'move' | 'copy' | 'link' | 'none'): void {
    try {
      e.dataTransfer.dropEffect = effect
    } catch (error) {
      logger.error('Ошибка при установке drag effect:', error)
    }
  }
}

// Экспортируем экземпляр сервиса
export const dragDropService = new DragDropServiceImpl()
