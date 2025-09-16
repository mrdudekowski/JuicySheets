import React from 'react'
import './AddLessonButton.css'

interface AddLessonButtonProps {
  onClick: () => void
  disabled?: boolean
}

const AddLessonButton: React.FC<AddLessonButtonProps> = ({ onClick, disabled = false }) => {
  return (
    <button
      className={`add-lesson-btn ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label="Добавить новый урок"
      title="Добавить урок"
    >
      <span className="btn-icon">+</span>
    </button>
  )
}

export default AddLessonButton
