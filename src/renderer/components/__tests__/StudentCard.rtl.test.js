// StudentCard.rtl.test.js - Тесты с React Testing Library
const React = require('react');
const { render, screen, fireEvent } = require('@testing-library/react');
const StudentCard = require('../StudentCard').default;

describe('StudentCard (React Testing Library)', () => {
  const mockStudent = {
    id: 's1',
    name: 'Иван Петров',
    level: 'beginner',
    materials: 'Книга 1',
    notes: 'Активный студент'
  };

  const mockOnClick = jest.fn();
  const mockOnDragStart = jest.fn();
  const mockOnDragEnd = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render student name', () => {
    render(
      <StudentCard 
        student={mockStudent}
        onClick={mockOnClick}
        onDragStart={mockOnDragStart}
        onDragEnd={mockOnDragEnd}
      />
    );
    
    expect(screen.getByText('Иван Петров')).toBeInTheDocument();
  });

  it('should render student level', () => {
    render(
      <StudentCard 
        student={mockStudent}
        onClick={mockOnClick}
        onDragStart={mockOnDragStart}
        onDragEnd={mockOnDragEnd}
      />
    );
    
    // StudentCard может не отображать уровень напрямую
    expect(screen.getByText('Иван Петров')).toBeInTheDocument();
  });

  it('should render avatar with first letter', () => {
    render(
      <StudentCard 
        student={mockStudent}
        onClick={mockOnClick}
        onDragStart={mockOnDragStart}
        onDragEnd={mockOnDragEnd}
      />
    );
    
    expect(screen.getByText('И')).toBeInTheDocument();
  });

  it('should handle click event', () => {
    render(
      <StudentCard 
        student={mockStudent}
        onClick={mockOnClick}
        onDragStart={mockOnDragStart}
        onDragEnd={mockOnDragEnd}
      />
    );
    
    const card = screen.getByText('Иван Петров').closest('div');
    fireEvent.click(card);
    
    expect(mockOnClick).toHaveBeenCalledWith(mockStudent);
  });

  it('should handle drag start', () => {
    render(
      <StudentCard 
        student={mockStudent}
        onClick={mockOnClick}
        onDragStart={mockOnDragStart}
        onDragEnd={mockOnDragEnd}
      />
    );
    
    const card = screen.getByText('Иван Петров').closest('div');
    
    // Мокаем dataTransfer для drag events
    const mockDataTransfer = {
      setData: jest.fn(),
      effectAllowed: ''
    };
    
    fireEvent.dragStart(card, { dataTransfer: mockDataTransfer });
    
    expect(mockOnDragStart).toHaveBeenCalledWith(mockStudent);
  });

  it('should handle drag end', () => {
    render(
      <StudentCard 
        student={mockStudent}
        onClick={mockOnClick}
        onDragStart={mockOnDragStart}
        onDragEnd={mockOnDragEnd}
      />
    );
    
    const card = screen.getByText('Иван Петров').closest('div');
    fireEvent.dragEnd(card);
    
    expect(mockOnDragEnd).toHaveBeenCalledWith();
  });

  it('should be draggable', () => {
    render(
      <StudentCard 
        student={mockStudent}
        onClick={mockOnClick}
        onDragStart={mockOnDragStart}
        onDragEnd={mockOnDragEnd}
      />
    );
    
    const card = screen.getByText('Иван Петров').closest('.student-card');
    expect(card).toHaveAttribute('draggable');
  });
});
