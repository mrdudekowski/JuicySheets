// Input.test.js - Тесты с React Testing Library
const React = require('react');
const { render, screen, fireEvent } = require('@testing-library/react');
const { Input } = require('./Input');

describe('Input (React Testing Library)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render input with placeholder', () => {
    render(<Input placeholder="Enter text" />);
    
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('should render with label', () => {
    render(<Input label="Username" placeholder="Enter username" />);
    
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
  });

  it('should render with required indicator', () => {
    render(<Input label="Email" required />);
    
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('should render with different types', () => {
    const { rerender } = render(<Input type="email" placeholder="Email" />);
    expect(screen.getByPlaceholderText('Email')).toHaveAttribute('type', 'email');

    rerender(<Input type="password" placeholder="Password" />);
    expect(screen.getByPlaceholderText('Password')).toHaveAttribute('type', 'password');
  });

  it('should render with different sizes', () => {
    const { rerender } = render(<Input size="small" placeholder="Small" />);
    expect(screen.getByPlaceholderText('Small')).toHaveClass('input--small');

    rerender(<Input size="medium" placeholder="Medium" />);
    expect(screen.getByPlaceholderText('Medium')).toHaveClass('input--medium');

    rerender(<Input size="large" placeholder="Large" />);
    expect(screen.getByPlaceholderText('Large')).toHaveClass('input--large');
  });

  it('should handle value changes', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} placeholder="Test" />);
    
    const input = screen.getByPlaceholderText('Test');
    fireEvent.change(input, { target: { value: 'Hello' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('Hello');
  });

  it('should handle focus and blur events', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    render(<Input onFocus={handleFocus} onBlur={handleBlur} placeholder="Test" />);
    
    const input = screen.getByPlaceholderText('Test');
    fireEvent.focus(input);
    fireEvent.blur(input);
    
    expect(handleFocus).toHaveBeenCalledTimes(1);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Input disabled placeholder="Disabled" />);
    
    const input = screen.getByPlaceholderText('Disabled');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('input--disabled');
  });

  it('should show error state', () => {
    render(<Input error="This field is required" placeholder="Test" />);
    
    const input = screen.getByPlaceholderText('Test');
    expect(input).toHaveClass('input--error');
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('should show helper text', () => {
    render(<Input helperText="This is helpful information" placeholder="Test" />);
    
    expect(screen.getByText('This is helpful information')).toBeInTheDocument();
  });

  it('should not show helper text when error is present', () => {
    render(
      <Input 
        error="This field is required" 
        helperText="This is helpful information" 
        placeholder="Test" 
      />
    );
    
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.queryByText('This is helpful information')).not.toBeInTheDocument();
  });

  it('should render with custom className', () => {
    render(<Input className="custom-class" placeholder="Test" />);
    
    expect(screen.getByPlaceholderText('Test')).toHaveClass('custom-class');
  });

  it('should render with data-testid', () => {
    render(<Input data-testid="test-input" placeholder="Test" />);
    
    expect(screen.getByTestId('test-input')).toBeInTheDocument();
  });

  it('should be required when required prop is true', () => {
    render(<Input required placeholder="Test" />);
    
    expect(screen.getByPlaceholderText('Test')).toBeRequired();
  });
});

