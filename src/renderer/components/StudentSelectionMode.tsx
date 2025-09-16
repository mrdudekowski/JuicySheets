import React from 'react'
import { Student } from '../types/form'
import StudentsList from './StudentsList'
import './StudentSelectionMode.css'

interface StudentSelectionModeProps {
  students: Student[]
  selectedStudentId?: string
  onStudentSelect: (student: Student) => void
  onStudentDragStart: (student: Student) => void
  onStudentDragEnd: () => void
  onStudentDrag?: (student: Student) => void
  onAddStudent: () => void
}

const StudentSelectionMode: React.FC<StudentSelectionModeProps> = ({
  students,
  selectedStudentId,
  onStudentSelect,
  onStudentDragStart,
  onStudentDragEnd,
  onStudentDrag,
  onAddStudent
}) => {
  return (
    <div className="student-selection-mode">
      {/* Выбранный студент */}
      {selectedStudentId && (
        <div className="selected-student-section">
          <h3>👤 Выбранный студент</h3>
          <div className="selected-student">
            <div className="selected-student-info">
              <span className="student-icon">👤</span>
              <span className="student-name">
                {students.find(s => s.id === selectedStudentId)?.name || 'Выбранный студент'}
              </span>
            </div>
            <button
              type="button"
              className="remove-student-btn"
              onClick={() => onStudentSelect({} as Student)}
              title="Убрать студента"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Список студентов */}
      <div className="students-section">
        <div className="students-header">
          <h3>👥 Выберите студента</h3>
          <button 
            className="add-student-btn"
            onClick={onAddStudent}
            title="Добавить нового студента"
          >
            + Добавить студента
          </button>
        </div>
        <StudentsList
          students={students}
          selectedStudentId={selectedStudentId}
          onStudentSelect={onStudentSelect}
          onStudentDragStart={onStudentDragStart}
          onStudentDragEnd={onStudentDragEnd}
          onStudentDrag={onStudentDrag}
          showSearch={false}
          title=""
        />
      </div>
    </div>
  )
}

export default StudentSelectionMode
