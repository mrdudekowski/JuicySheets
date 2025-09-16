import { useState, useCallback } from 'react'
import { Student } from '../types/form'
import { dragDropService } from '../services/DragDropService'

export interface UseDragDropReturn {
  draggedStudent: Student | null
  isDragOver: boolean
  isDeleteZoneDragOver: boolean
  handleDragStart: (e: React.DragEvent, student: Student) => void
  handleDragEnd: (e: React.DragEvent) => void
  handleDragOver: (e: React.DragEvent) => void
  handleDragLeave: (e: React.DragEvent) => void
  handleDrop: (e: React.DragEvent, onStudentDrop: (student: Student) => void) => void
  handleDeleteZoneDragOver: (e: React.DragEvent) => void
  handleDeleteZoneDragLeave: (e: React.DragEvent) => void
  handleDeleteZoneDrop: (e: React.DragEvent, onStudentDelete: (studentId: string) => void) => void
  setDragOver: (isDragOver: boolean) => void
  setDeleteZoneDragOver: (isDragOver: boolean) => void
  clearDraggedStudent: () => void
}

export const useDragDrop = (): UseDragDropReturn => {
  const [draggedStudent, setDraggedStudent] = useState<Student | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isDeleteZoneDragOver, setIsDeleteZoneDragOver] = useState(false)

  const handleDragStart = useCallback((e: React.DragEvent, student: Student) => {
    dragDropService.handleDragStart(e, student)
    setDraggedStudent(student)
  }, [])

  const handleDragEnd = useCallback((e: React.DragEvent) => {
    dragDropService.handleDragEnd(e)
    setDraggedStudent(null)
    setIsDragOver(false)
    setIsDeleteZoneDragOver(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    dragDropService.handleDragOver(e)
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    dragDropService.handleDragLeave(e)
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent, onStudentDrop: (student: Student) => void) => {
    dragDropService.handleDrop(e, onStudentDrop)
    setIsDragOver(false)
  }, [])

  const handleDeleteZoneDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    dragDropService.handleDragOver(e)
    setIsDeleteZoneDragOver(true)
    console.log('🎯 DeleteZone: drag over')
  }, [])

  const handleDeleteZoneDragLeave = useCallback((e: React.DragEvent) => {
    dragDropService.handleDragLeave(e)
    setIsDeleteZoneDragOver(false)
    console.log('🎯 DeleteZone: drag leave')
  }, [])

  const handleDeleteZoneDrop = useCallback((e: React.DragEvent, onStudentDelete: (studentId: string) => void) => {
    console.log('🎯 useDragDrop: handleDeleteZoneDrop вызван')
    dragDropService.handleDeleteDrop(e, onStudentDelete)
    setIsDeleteZoneDragOver(false)
    console.log('🎯 useDragDrop: DeleteZone drop завершен')
  }, [])

  const setDragOver = useCallback((isDragOver: boolean) => {
    setIsDragOver(isDragOver)
  }, [])

  const setDeleteZoneDragOver = useCallback((isDragOver: boolean) => {
    setIsDeleteZoneDragOver(isDragOver)
  }, [])

  const clearDraggedStudent = useCallback(() => {
    setDraggedStudent(null)
  }, [])

  return {
    draggedStudent,
    isDragOver,
    isDeleteZoneDragOver,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDeleteZoneDragOver,
    handleDeleteZoneDragLeave,
    handleDeleteZoneDrop,
    setDragOver,
    setDeleteZoneDragOver,
    clearDraggedStudent
  }
}
