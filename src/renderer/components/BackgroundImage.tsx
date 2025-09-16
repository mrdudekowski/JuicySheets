import React from 'react'

interface BackgroundImageProps {
  src: string
  alt?: string
  className?: string
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ 
  src, 
  alt = 'Background', 
  className = '' 
}) => {
  return (
    <div 
      className={`background-image ${className}`}
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1
      }}
      role="img"
      aria-label={alt}
    />
  )
}

export default BackgroundImage
