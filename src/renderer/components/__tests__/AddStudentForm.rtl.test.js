// AddStudentForm.rtl.test.js - Тесты с React Testing Library
const React = require('react');
const { render, screen, fireEvent, waitFor } = require('@testing-library/react');
const AddStudentForm = require('../AddStudentForm').default;

describe('AddStudentForm (React Testing Library)', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render form fields', () => {
    render(
      <AddStudentForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel}
        isOpen={true}
      />
    );
    
    // Используем более надежные селекторы
    expect(screen.getByRole('heading', { name: 'Добавить студента' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Введите имя студента')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Опишите учебные материалы для студента (необязательно)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Дополнительные заметки о студенте (необязательно)')).toBeInTheDocument();
  });

  it('should render submit and cancel buttons', () => {
    render(
      <AddStudentForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel}
        isOpen={true}
      />
    );
    
    expect(screen.getByRole('button', { name: /отмена/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /добавить/i })).toBeInTheDocument();
  });

  it('should handle form submission', async () => {
    render(
      <AddStudentForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel}
        isOpen={true}
      />
    );
    
    const nameInput = screen.getByPlaceholderText('Введите имя студента');
    const levelSelect = screen.getByRole('combobox');
    const submitButton = screen.getByRole('button', { name: /добавить/i });
    
    fireEvent.change(nameInput, { target: { value: 'Иван Петров' } });
    fireEvent.change(levelSelect, { target: { value: 'beginner' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: 'Иван Петров',
        level: 'beginner',
        materials: '',
        notes: ''
      });
    });
  });

  it('should handle cancel button click', () => {
    render(
      <AddStudentForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel}
        isOpen={true}
      />
    );
    
    const cancelButton = screen.getByRole('button', { name: /отмена/i });
    fireEvent.click(cancelButton);
    
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('should not render when closed', () => {
    render(
      <AddStudentForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel}
        isOpen={false}
      />
    );
    
    expect(screen.queryByRole('form')).not.toBeInTheDocument();
  });
});
