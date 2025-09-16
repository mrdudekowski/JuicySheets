import React from 'react'
import { Student } from '../types/form'
import StudentCard from './StudentCard'
import './StudentsList.css'

interface StudentsListProps {
  students: Student[]
  selectedStudentId?: string
  onStudentSelect?: (student: Student) => void
  onStudentDragStart?: (student: Student) => void
  onStudentDragEnd?: () => void
  onStudentDrag?: (student: Student) => void
  className?: string
  title?: string
  showSearch?: boolean
  searchQuery?: string
  onSearchChange?: (query: string) => void
}

const StudentsList: React.FC<StudentsListProps> = ({
  students,
  selectedStudentId,
  onStudentSelect,
  onStudentDragStart,
  onStudentDragEnd,
  onStudentDrag,
  className = '',
  title = 'Студенты',
  showSearch = false,
  searchQuery = '',
  onSearchChange
}) => {
  // Фильтрация студентов по поисковому запросу
  const filteredStudents = showSearch && searchQuery
    ? students.filter(student => 
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.phone?.includes(searchQuery)
      )
    : students

  return (
    <div className={`students-list ${className}`}>
      {/* Заголовок */}
      <div className="students-header">
        <h3 className="students-title">{title}</h3>
        <span className="students-count">{filteredStudents.length} студентов</span>
      </div>

      {/* Поиск (если включен) */}
      {showSearch && (
        <div className="students-search">
          <input
            type="text"
            placeholder="Поиск студентов..."
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="search-input"
          />
        </div>
      )}

      {/* Список студентов */}
      <div className="students-grid">
        {filteredStudents.length > 0 ? (
          filteredStudents.map(student => (
            <StudentCard
              key={student.id}
              student={student}
              isDragging={false}
              onClick={onStudentSelect}
              onDragStart={onStudentDragStart}
              onDragEnd={onStudentDragEnd}
              onDrag={onStudentDrag}
              className={selectedStudentId === student.id ? 'selected' : ''}
            />
          ))
        ) : (
          <div className="no-students center">
            <div className="no-students-icon">👥</div>
            <p>Студенты не найдены</p>
            {showSearch && searchQuery && (
              <p className="no-students-hint">Попробуйте изменить поисковый запрос</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default StudentsList
