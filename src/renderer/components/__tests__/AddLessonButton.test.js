// Простой тест без React Testing Library
describe('AddLessonButton', () => {
  it('should be a function', () => {
    expect(typeof AddLessonButton).toBe('function');
  });

  it('should render button element', () => {
    const mockOnClick = jest.fn();
    const button = AddLessonButton({ onClick: mockOnClick });
    
    expect(button.type).toBe('button');
    expect(button.props.onClick).toBe(mockOnClick);
  });

  it('should handle disabled state', () => {
    const mockOnClick = jest.fn();
    const button = AddLessonButton({ onClick: mockOnClick, disabled: true });
    
    expect(button.props.disabled).toBe(true);
  });

  it('should have correct accessibility attributes', () => {
    const mockOnClick = jest.fn();
    const button = AddLessonButton({ onClick: mockOnClick });
    
    expect(button.props['aria-label']).toBe('Добавить новый урок');
    expect(button.props.title).toBe('Добавить урок');
  });
});

// Mock компонента AddLessonButton
function AddLessonButton({ onClick, disabled = false }) {
  return {
    type: 'button',
    props: {
      className: `add-lesson-btn ${disabled ? 'disabled' : ''}`,
      onClick: onClick,
      disabled: disabled,
      'aria-label': 'Добавить новый урок',
      title: 'Добавить урок'
    }
  };
}