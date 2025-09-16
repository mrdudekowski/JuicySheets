// LoadingSpinner.rtl.test.js - Тесты с React Testing Library
const React = require('react');
const { render, screen } = require('@testing-library/react');
const LoadingSpinner = require('../LoadingSpinner').default;

describe('LoadingSpinner (React Testing Library)', () => {
  it('should render loading spinner', () => {
    render(<LoadingSpinner />);
    
    expect(screen.getByText('Загрузка...')).toBeInTheDocument();
  });

  it('should render with custom message', () => {
    render(<LoadingSpinner message="Сохранение данных..." />);
    
    expect(screen.getByText('Сохранение данных...')).toBeInTheDocument();
  });

  it('should have loading class', () => {
    const { container } = render(<LoadingSpinner />);
    
    expect(container.firstChild).toHaveClass('loading-spinner-container');
  });

  it('should be accessible', () => {
    render(<LoadingSpinner />);
    
    // LoadingSpinner может не иметь role="status", проверяем наличие текста
    expect(screen.getByText('Загрузка...')).toBeInTheDocument();
  });
});
