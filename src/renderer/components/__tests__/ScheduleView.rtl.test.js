// ScheduleView.rtl.test.js - Тесты с React Testing Library
const React = require('react');
const { render, screen, fireEvent } = require('@testing-library/react');
const ScheduleView = require('../ScheduleView').default;

describe('ScheduleView (React Testing Library)', () => {
  const mockLessons = [
    { id: 'l1', title: 'Математика', time: '10:00', day: 'Понедельник', room: '101', isOnline: false, studentName: 'Иван Петров' },
    { id: 'l2', title: 'Физика', time: '14:00', day: 'Вторник', room: '102', isOnline: true, studentName: 'Мария Сидорова' }
  ];

  const mockOnLessonClick = jest.fn();
  const mockOnLessonDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render schedule title', () => {
    render(
      <ScheduleView 
        lessons={mockLessons}
        onLessonClick={mockOnLessonClick}
        onLessonDelete={mockOnLessonDelete}
      />
    );
    
    expect(screen.getByText('Расписание уроков')).toBeInTheDocument();
  });

  it('should render lessons list', () => {
    render(
      <ScheduleView 
        lessons={mockLessons}
        onLessonClick={mockOnLessonClick}
        onLessonDelete={mockOnLessonDelete}
      />
    );
    
    expect(screen.getByText('Математика')).toBeInTheDocument();
    expect(screen.getByText('Физика')).toBeInTheDocument();
    expect(screen.getByText('Иван Петров')).toBeInTheDocument();
    expect(screen.getByText('Мария Сидорова')).toBeInTheDocument();
  });

  it('should render empty state when no lessons', () => {
    render(
      <ScheduleView 
        lessons={[]}
        onLessonClick={mockOnLessonClick}
        onLessonDelete={mockOnLessonDelete}
      />
    );
    
    expect(screen.getByText('Нет уроков')).toBeInTheDocument();
  });

  it('should handle lesson edit button click', () => {
    render(
      <ScheduleView 
        lessons={mockLessons}
        onEditLesson={mockOnLessonClick}
        onDeleteLesson={mockOnLessonDelete}
      />
    );
    
    const editButtons = screen.getAllByTitle('Редактировать урок');
    fireEvent.click(editButtons[0]);
    
    expect(mockOnLessonClick).toHaveBeenCalledWith(mockLessons[0]);
  });

  it('should show online indicator for online lessons', () => {
    render(
      <ScheduleView 
        lessons={mockLessons}
        onEditLesson={mockOnLessonClick}
        onDeleteLesson={mockOnLessonDelete}
      />
    );
    
    // Физика - онлайн урок
    expect(screen.getByText('🌐 Онлайн')).toBeInTheDocument();
  });
});
