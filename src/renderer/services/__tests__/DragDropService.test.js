// DragDropService.test.js
const { dragDropService } = require('../DragDropService');

describe('DragDropService', () => {
  let mockEvent;
  let mockStudent;

  beforeEach(() => {
    mockEvent = {
      preventDefault: jest.fn(),
      dataTransfer: {
        setData: jest.fn(),
        getData: jest.fn(),
        effectAllowed: '',
        dropEffect: '',
        clearData: jest.fn()
      }
    };

    mockStudent = {
      id: '1',
      name: 'John Doe',
      level: 'beginner'
    };
  });

  describe('handleDragStart', () => {
    it('should set data and effect on drag start', () => {
      dragDropService.handleDragStart(mockEvent, mockStudent);

      expect(mockEvent.dataTransfer.setData).toHaveBeenCalledWith('text/plain', '1');
      expect(mockEvent.dataTransfer.effectAllowed).toBe('move');
    });
  });

  describe('handleDragEnd', () => {
    it('should clear data on drag end', () => {
      dragDropService.handleDragEnd(mockEvent);

      expect(mockEvent.dataTransfer.clearData).toHaveBeenCalled();
    });
  });

  describe('handleDragOver', () => {
    it('should prevent default and set drop effect', () => {
      dragDropService.handleDragOver(mockEvent);

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockEvent.dataTransfer.dropEffect).toBe('move');
    });
  });

  describe('handleDragLeave', () => {
    it('should prevent default on drag leave', () => {
      dragDropService.handleDragLeave(mockEvent);

      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });
  });

  describe('handleDrop', () => {
    it('should call onStudentDrop with student when data is available', () => {
      const mockOnStudentDrop = jest.fn();
      mockEvent.dataTransfer.getData.mockReturnValue('1');

      dragDropService.handleDrop(mockEvent, mockOnStudentDrop);

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockOnStudentDrop).toHaveBeenCalledWith({
        id: '1',
        name: 'Студент',
        level: 'beginner',
        materials: '',
        notes: ''
      });
    });

    it('should not call onStudentDrop when no data', () => {
      const mockOnStudentDrop = jest.fn();
      mockEvent.dataTransfer.getData.mockReturnValue('');

      dragDropService.handleDrop(mockEvent, mockOnStudentDrop);

      expect(mockOnStudentDrop).not.toHaveBeenCalled();
    });
  });

  describe('handleDeleteDrop', () => {
    it('should call onStudentDelete with student id when data is available', () => {
      const mockOnStudentDelete = jest.fn();
      mockEvent.dataTransfer.getData.mockReturnValue('1');

      dragDropService.handleDeleteDrop(mockEvent, mockOnStudentDelete);

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockOnStudentDelete).toHaveBeenCalledWith('1');
    });

    it('should not call onStudentDelete when no data', () => {
      const mockOnStudentDelete = jest.fn();
      mockEvent.dataTransfer.getData.mockReturnValue('');

      dragDropService.handleDeleteDrop(mockEvent, mockOnStudentDelete);

      expect(mockOnStudentDelete).not.toHaveBeenCalled();
    });
  });

  describe('setDragEffect', () => {
    it('should set drop effect on data transfer', () => {
      dragDropService.setDragEffect(mockEvent, 'copy');

      expect(mockEvent.dataTransfer.dropEffect).toBe('copy');
    });
  });
});
