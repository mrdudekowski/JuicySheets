// useDragDrop.test.js
const { renderHook, act } = require('@testing-library/react-hooks');
const { useDragDrop } = require('../useDragDrop');

describe('useDragDrop', () => {
  const mockStudent = { id: 's1', name: 'Студент', level: 'beginner', materials: '', notes: '' };

  it('should return drag drop state and functions', () => {
    const { result } = renderHook(() => useDragDrop());
    
    expect(result.current).toHaveProperty('draggedStudent');
    expect(result.current).toHaveProperty('isDragOver');
    expect(result.current).toHaveProperty('isDeleteZoneDragOver');
    expect(result.current).toHaveProperty('handleDragStart');
    expect(result.current).toHaveProperty('handleDragEnd');
    expect(result.current).toHaveProperty('handleDragOver');
    expect(result.current).toHaveProperty('handleDragLeave');
    expect(result.current).toHaveProperty('handleDrop');
    expect(result.current).toHaveProperty('handleDeleteZoneDrop');
    expect(result.current).toHaveProperty('setDragOver');
    expect(result.current).toHaveProperty('setDeleteZoneDragOver');
    expect(result.current).toHaveProperty('clearDraggedStudent');
  });

  it('should have initial state', () => {
    const { result } = renderHook(() => useDragDrop());
    
    expect(result.current.draggedStudent).toBeNull();
    expect(result.current.isDragOver).toBe(false);
    expect(result.current.isDeleteZoneDragOver).toBe(false);
  });

  it('should handle drag start', () => {
    const { result } = renderHook(() => useDragDrop());
    
    const mockEvent = {
      dataTransfer: {
        setData: jest.fn(),
        effectAllowed: '',
      },
    };
    
    act(() => {
      result.current.handleDragStart(mockEvent, mockStudent);
    });
    
    expect(result.current.draggedStudent).toEqual(mockStudent);
    expect(mockEvent.dataTransfer.setData).toHaveBeenCalledWith('text/plain', mockStudent.id);
    expect(mockEvent.dataTransfer.effectAllowed).toBe('move');
  });

  it('should handle drag end', () => {
    const { result } = renderHook(() => useDragDrop());
    
    // Set initial state
    act(() => {
      result.current.handleDragStart({ dataTransfer: { setData: jest.fn(), effectAllowed: '' } }, mockStudent);
    });
    
    expect(result.current.draggedStudent).toEqual(mockStudent);
    
    // Drag end
    act(() => {
      result.current.handleDragEnd({});
    });
    
    expect(result.current.draggedStudent).toBeNull();
  });

  it('should handle drag over', () => {
    const { result } = renderHook(() => useDragDrop());
    
    const mockEvent = {
      preventDefault: jest.fn(),
      dataTransfer: { dropEffect: '' },
    };
    
    act(() => {
      result.current.handleDragOver(mockEvent);
    });
    
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockEvent.dataTransfer.dropEffect).toBe('move');
    expect(result.current.isDragOver).toBe(true);
  });

  it('should handle drag leave', () => {
    const { result } = renderHook(() => useDragDrop());
    
    // Set drag over state
    act(() => {
      result.current.handleDragOver({ preventDefault: jest.fn(), dataTransfer: { dropEffect: '' } });
    });
    
    expect(result.current.isDragOver).toBe(true);
    
    // Drag leave
    act(() => {
      result.current.handleDragLeave({});
    });
    
    expect(result.current.isDragOver).toBe(false);
  });

  it('should handle drop', () => {
    const { result } = renderHook(() => useDragDrop());
    const mockOnStudentDrop = jest.fn();
    
    const mockEvent = {
      preventDefault: jest.fn(),
      dataTransfer: { getData: jest.fn(() => mockStudent.id) },
    };
    
    act(() => {
      result.current.handleDrop(mockEvent, mockOnStudentDrop);
    });
    
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockEvent.dataTransfer.getData).toHaveBeenCalledWith('text/plain');
    expect(mockOnStudentDrop).toHaveBeenCalledWith(mockStudent);
    expect(result.current.isDragOver).toBe(false);
  });

  it('should handle delete zone drop', () => {
    const { result } = renderHook(() => useDragDrop());
    const mockOnStudentDelete = jest.fn();
    
    const mockEvent = {
      preventDefault: jest.fn(),
      dataTransfer: { getData: jest.fn(() => mockStudent.id) },
    };
    
    act(() => {
      result.current.handleDeleteZoneDrop(mockEvent, mockOnStudentDelete);
    });
    
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockEvent.dataTransfer.getData).toHaveBeenCalledWith('text/plain');
    expect(mockOnStudentDelete).toHaveBeenCalledWith(mockStudent.id);
    expect(result.current.isDeleteZoneDragOver).toBe(false);
  });

  it('should set drag over state', () => {
    const { result } = renderHook(() => useDragDrop());
    
    const mockEvent = {
      preventDefault: jest.fn(),
      dataTransfer: { dropEffect: '' },
    };
    
    act(() => {
      result.current.handleDragOver(mockEvent);
    });
    
    expect(result.current.isDragOver).toBe(true);
  });

  it('should set delete zone drag over state', () => {
    const { result } = renderHook(() => useDragDrop());
    
    act(() => {
      result.current.setDeleteZoneDragOver(true);
    });
    
    expect(result.current.isDeleteZoneDragOver).toBe(true);
  });

  it('should clear dragged student', () => {
    const { result } = renderHook(() => useDragDrop());
    
    // Set initial state
    act(() => {
      result.current.handleDragStart({ dataTransfer: { setData: jest.fn(), effectAllowed: '' } }, mockStudent);
    });
    
    expect(result.current.draggedStudent).toEqual(mockStudent);
    
    // Clear
    act(() => {
      result.current.handleDragEnd({});
    });
    
    expect(result.current.draggedStudent).toBeNull();
  });
});