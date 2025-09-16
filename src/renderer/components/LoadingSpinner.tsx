import React from 'react'
import './LoadingSpinner.css'

interface LoadingSpinnerProps {
  message?: string
  size?: 'small' | 'medium' | 'large'
  className?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Загрузка...',
  size = 'medium',
  className = ''
}) => {
  return (
    <div className={`loading-spinner-container ${className}`}>
      <div className={`loading-spinner ${size}`}>
        <div className="spinner"></div>
      </div>
      {message && (
        <p className="loading-message">{message}</p>
      )}
    </div>
  )
}

export default LoadingSpinner
