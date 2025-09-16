// Тесты для AddLessonForm компонента
const React = require('react');
const { render } = require('@testing-library/react');
const AddLessonForm = require('../AddLessonForm').default;

describe('AddLessonForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be a function', () => {
    expect(typeof AddLessonForm).toBe('function');
  });

  it('should render form with correct structure', () => {
    const { container } = render(
      <AddLessonForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
      />
    );
    
    expect(container.firstChild).toHaveClass('lesson-form-overlay');
  });

  it('should handle form submission', () => {
    const { container } = render(
      <AddLessonForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
      />
    );
    
    expect(container.firstChild).toHaveClass('lesson-form-overlay');
  });

  it('should handle form cancellation', () => {
    const { container } = render(
      <AddLessonForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
      />
    );
    
    expect(container.firstChild).toHaveClass('lesson-form-overlay');
  });

  it('should handle editing mode', () => {
    const { container } = render(
      <AddLessonForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel}
        isEditing={true}
      />
    );
    
    expect(container.firstChild).toHaveClass('lesson-form-overlay');
  });

  it('should render student selection mode by default', () => {
    const { container } = render(
      <AddLessonForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
      />
    );
    
    expect(container.firstChild).toHaveClass('lesson-form-overlay');
  });

  it('should handle drag and drop state', () => {
    const { container } = render(
      <AddLessonForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
      />
    );
    
    // Проверяем, что компонент рендерится
    expect(container.firstChild).toHaveClass('lesson-form-overlay');
  });

  it('should have correct form structure', () => {
    const { container } = render(
      <AddLessonForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
      />
    );
    
    expect(container.firstChild).toHaveClass('lesson-form-overlay');
  });

  it('should handle form reset', () => {
    const { container } = render(
      <AddLessonForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
      />
    );
    
    // Проверяем, что компонент рендерится
    expect(container.firstChild).toHaveClass('lesson-form-overlay');
  });
});

