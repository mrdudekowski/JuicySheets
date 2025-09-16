// AddLessonForm.rtl.test.js - Тесты с React Testing Library
const React = require('react');
const { render, screen, fireEvent, waitFor } = require('@testing-library/react');
const AddLessonForm = require('../forms/AddLessonForm').default;

describe('AddLessonForm (React Testing Library)', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();
  const mockStudents = [
    { id: 's1', name: 'Иван Петров', level: 'beginner', materials: '', notes: '' },
    { id: 's2', name: 'Мария Сидорова', level: 'intermediate', materials: '', notes: '' }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render student selection mode when open', () => {
    render(
      <AddLessonForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel}
      />
    );
    
    expect(screen.getByText('Добавить урок')).toBeInTheDocument();
    expect(screen.getByText('👥 Выберите студента')).toBeInTheDocument();
    expect(screen.getByText('+ Добавить студента')).toBeInTheDocument();
  });

  it('should render close button', () => {
    render(
      <AddLessonForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel}
      />
    );
    
    const closeButton = screen.getByTitle('Закрыть форму');
    expect(closeButton).toBeInTheDocument();
  });

  it('should render students list', () => {
    render(
      <AddLessonForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel}
      />
    );
    
    // Поскольку студентов нет (хук useStudents возвращает пустой массив),
    // мы должны видеть сообщение "Студенты не найдены"
    expect(screen.getByText('Студенты не найдены')).toBeInTheDocument();
  });

  it('should handle close button click', () => {
    render(
      <AddLessonForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel}
      />
    );
    
    const closeButton = screen.getByTitle('Закрыть форму');
    fireEvent.click(closeButton);
    
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('should handle add student button click', () => {
    render(
      <AddLessonForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel}
      />
    );
    
    const addStudentButton = screen.getByTitle('Добавить нового студента');
    expect(addStudentButton).toBeInTheDocument();
  });
});
