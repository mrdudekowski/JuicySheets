import React from 'react'
import { Student } from '../types/form'
import './DragDropZone.css'

interface DragDropZoneProps {
  isDragOver: boolean
  draggedStudent: Student | null
  onDragOver: (e: React.DragEvent) => void
  onDragLeave: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
  className?: string
  children?: React.ReactNode
}

const DragDropZone: React.FC<DragDropZoneProps> = ({
  isDragOver,
  draggedStudent,
  onDragOver,
  onDragLeave,
  onDrop,
  className = '',
  children
}) => {
  return (
    <div
      className={`drag-drop-zone ${isDragOver ? 'drag-over' : ''} ${className}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {/* Контент зоны */}
      <div className="zone-content">
        {children}
      </div>

      {/* Overlay при перетаскивании */}
      {isDragOver && (
        <div className="drag-overlay">
          <div className="drag-overlay-content">
            <div className="drag-icon">📥</div>
            <h3>Отпустите студента здесь</h3>
            {draggedStudent && (
              <p>Добавить <strong>{draggedStudent.name}</strong> к уроку</p>
            )}
          </div>
        </div>
      )}

      {/* Индикатор пустой зоны */}
      {!children && !isDragOver && (
        <div className="empty-zone-indicator">
          <div className="empty-icon">🎯</div>
          <p>Перетащите студента сюда</p>
        </div>
      )}
    </div>
  )
}

export default DragDropZone
