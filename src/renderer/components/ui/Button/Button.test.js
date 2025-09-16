// Button.test.js - Тесты с React Testing Library
const React = require('react');
const { render, screen, fireEvent } = require('@testing-library/react');
const { Button } = require('./Button');

describe('Button (React Testing Library)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render button with text', () => {
    render(<Button>Click me</Button>);
    
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('should render with different variants', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn--primary');

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn--secondary');

    rerender(<Button variant="danger">Danger</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn--danger');

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn--ghost');
  });

  it('should render with different sizes', () => {
    const { rerender } = render(<Button size="small">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn--small');

    rerender(<Button size="medium">Medium</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn--medium');

    rerender(<Button size="large">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn--large');
  });

  it('should handle click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('btn--disabled');
  });

  it('should show loading state', () => {
    render(<Button loading>Loading</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn--loading');
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('should not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Disabled</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should not call onClick when loading', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} loading>Loading</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should render with custom className', () => {
    render(<Button className="custom-class">Custom</Button>);
    
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('should render with data-testid', () => {
    render(<Button data-testid="test-button">Test</Button>);
    
    expect(screen.getByTestId('test-button')).toBeInTheDocument();
  });

  it('should render as submit button', () => {
    render(<Button type="submit">Submit</Button>);
    
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
});

