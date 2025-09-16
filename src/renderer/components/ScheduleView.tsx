import React from 'react'
import { Lesson } from '../services/ScheduleService'
import './ScheduleView.css'

interface ScheduleViewProps {
  lessons: Lesson[]
  onEditLesson?: (lesson: Lesson) => void
  onDeleteLesson?: (lessonId: string) => void
  className?: string
}

const ScheduleView: React.FC<ScheduleViewProps> = ({
  lessons,
  onEditLesson,
  onDeleteLesson,
  className = ''
}) => {
  const formatTime = (time: string) => {
    return time
  }

  const getDayColor = (day: string) => {
    const colors: Record<string, string> = {
      'Понедельник': '#ff6b6b',
      'Вторник': '#4ecdc4',
      'Среда': '#45b7d1',
      'Четверг': '#96ceb4',
      'Пятница': '#feca57',
      'Суббота': '#ff9ff3',
      'Воскресенье': '#54a0ff'
    }
    return colors[day] || '#95a5a6'
  }

  const getOnlineStatus = (isOnline: boolean) => {
    return isOnline ? '🌐 Онлайн' : '🏫 Оффлайн'
  }

  if (lessons.length === 0) {
    return (
      <div className={`schedule-view empty ${className}`}>
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <h3>Нет уроков</h3>
          <p>Добавьте первый урок, чтобы начать работу с расписанием</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`schedule-view ${className}`}>
      <div className="schedule-header">
        <h2>Расписание уроков</h2>
        <span className="lessons-count">{lessons.length} уроков</span>
      </div>
      
      <div className="lessons-grid">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="lesson-card">
            <div className="lesson-header">
              <h3 className="lesson-title">{lesson.title}</h3>
              <div className="lesson-actions">
                {onEditLesson && (
                  <button
                    className="edit-btn"
                    onClick={() => onEditLesson(lesson)}
                    title="Редактировать урок"
                  >
                    ✏️
                  </button>
                )}
                {onDeleteLesson && (
                  <button
                    className="delete-btn"
                    onClick={() => onDeleteLesson(lesson.id)}
                    title="Удалить урок"
                  >
                    🗑️
                  </button>
                )}
              </div>
            </div>
            
            <div className="lesson-content">
              <div className="lesson-time">
                <span className="time-icon">🕐</span>
                <span className="time-text">{formatTime(lesson.time)}</span>
              </div>
              
              <div 
                className="lesson-day"
                style={{ backgroundColor: getDayColor(lesson.day) }}
              >
                {lesson.day}
              </div>
              
              <div className="lesson-room">
                <span className="room-icon">📍</span>
                <span className="room-text">{lesson.room}</span>
              </div>
              
              <div className="lesson-student">
                <span className="student-icon">👤</span>
                <span className="student-text">{lesson.studentName}</span>
              </div>
              
              <div className="lesson-type">
                {getOnlineStatus(lesson.isOnline)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ScheduleView
