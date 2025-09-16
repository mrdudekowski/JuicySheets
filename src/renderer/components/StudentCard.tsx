import React from 'react'
import { Student } from '../types/form'
import './StudentCard.css'

interface StudentCardProps {
  student: Student
  isDragging?: boolean
  isDragOver?: boolean
  onClick?: (student: Student) => void
  onDragStart?: (student: Student) => void
  onDragEnd?: () => void
  onDrag?: (student: Student) => void
  className?: string
}

const StudentCard: React.FC<StudentCardProps> = ({
  student,
  isDragging = false,
  isDragOver = false,
  onClick,
  onDragStart,
  onDragEnd,
  onDrag,
  className = ''
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    console.log('🎯 StudentCard: dragStart', { studentId: student.id, studentName: student.name })
    e.dataTransfer.setData('text/plain', student.id)
    e.dataTransfer.effectAllowed = 'move'
    onDragStart?.(student)
  }

  const handleDragEnd = () => {
    onDragEnd?.()
  }

  const handleDrag = () => {
    onDrag?.(student)
  }

  const handleClick = () => {
    onClick?.(student)
  }

  return (
    <div
      className={`student-card ${isDragging ? 'dragging' : ''} ${isDragOver ? 'drag-over' : ''} ${className}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
      onClick={handleClick}
      title={`Выберите или перетащите ${student.name}`}
    >
      {/* Аватар студента */}
      <div className="student-avatar">
        {student.avatar ? (
          <img src={student.avatar} alt={student.name} />
        ) : (
          <div className="avatar-placeholder">
            {student.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Информация о студенте */}
      <div className="student-info">
        <h4 className="student-name">{student.name}</h4>
      </div>
    </div>
  )
}

export default StudentCard
