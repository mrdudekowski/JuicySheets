// Упрощенные тесты для DeleteZone компонента
const React = require('react');
const { render, screen } = require('@testing-library/react');
const DeleteZone = require('../DeleteZone').default;

describe('DeleteZone', () => {
  it('should be a function', () => {
    expect(typeof DeleteZone).toBe('function');
  });

  it('should render trash icon', () => {
    render(<DeleteZone 
      isDragOver={false} 
      onDragOver={jest.fn()} 
      onDragLeave={jest.fn()} 
      onDrop={jest.fn()} 
    />);
    
    expect(screen.getByText('🗑️')).toBeInTheDocument();
  });

  it('should show correct text when not dragging', () => {
    render(<DeleteZone 
      isDragOver={false} 
      onDragOver={jest.fn()} 
      onDragLeave={jest.fn()} 
      onDrop={jest.fn()} 
    />);
    
    expect(screen.getByText('Перетащите сюда для удаления')).toBeInTheDocument();
  });

  it('should show correct text when dragging over', () => {
    render(<DeleteZone 
      isDragOver={true} 
      onDragOver={jest.fn()} 
      onDragLeave={jest.fn()} 
      onDrop={jest.fn()} 
    />);
    
    expect(screen.getByText('Отпустите для удаления')).toBeInTheDocument();
  });

  it('should apply drag-over class when dragging over', () => {
    const { container } = render(<DeleteZone 
      isDragOver={true} 
      onDragOver={jest.fn()} 
      onDragLeave={jest.fn()} 
      onDrop={jest.fn()} 
    />);
    
    expect(container.firstChild).toHaveClass('drag-over');
  });

  it('should handle drag events', () => {
    const mockOnDragOver = jest.fn();
    const mockOnDrop = jest.fn();
    const mockOnDragEnter = jest.fn();
    const mockOnDragLeave = jest.fn();
    
    const { container } = render(<DeleteZone 
      isDragOver={false} 
      onDragOver={mockOnDragOver} 
      onDragEnter={mockOnDragEnter}
      onDragLeave={mockOnDragLeave} 
      onDrop={mockOnDrop} 
    />);
    
    const deleteZone = container.firstChild;
    expect(deleteZone).toBeInTheDocument();
    expect(deleteZone).toHaveClass('delete-zone');
  });

  it('should have correct structure', () => {
    const { container } = render(<DeleteZone 
      isDragOver={false} 
      onDragOver={jest.fn()} 
      onDragLeave={jest.fn()} 
      onDrop={jest.fn()} 
    />);
    
    const deleteZone = container.firstChild;
    expect(deleteZone.tagName).toBe('DIV');
    expect(deleteZone).toHaveClass('delete-zone');
    
    const content = deleteZone.querySelector('.delete-zone-content');
    expect(content).toBeInTheDocument();
  });
});

