import React from 'react'
import { logger } from '../utils/logger'
import './DeleteZone.css'

interface DeleteZoneProps {
  isDragOver: boolean
  onDragOver: (e: React.DragEvent) => void
  onDragEnter: (e: React.DragEvent) => void
  onDragLeave: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
  className?: string
}

const DeleteZone: React.FC<DeleteZoneProps> = ({
  isDragOver,
  onDragOver,
  onDragEnter,
  onDragLeave,
  onDrop,
  className = ''
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    logger.debug('🎯 DeleteZone: onDragOver')
    onDragOver(e)
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    logger.debug('🎯 DeleteZone: onDragEnter')
    onDragEnter(e)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    logger.debug('🎯 DeleteZone: onDragLeave')
    onDragLeave(e)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    logger.debug('🎯 DeleteZone: onDrop')
    onDrop(e)
  }

  return (
    <div
      className={`delete-zone ${isDragOver ? 'drag-over' : ''} ${className}`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="delete-zone-content">
        <div className="trash-icon">🗑️</div>
        <div className="delete-text">
          {isDragOver ? 'Отпустите для удаления' : 'Перетащите сюда для удаления'}
        </div>
      </div>
    </div>
  )
}

export default DeleteZone
