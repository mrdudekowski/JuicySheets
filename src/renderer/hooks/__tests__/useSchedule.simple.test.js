// useSchedule.simple.test.js - Упрощенные тесты без сложных асинхронных операций
const { renderHook } = require('@testing-library/react-hooks');

// Mock сервиса перед импортом хука
jest.mock('../../services/ScheduleService', () => ({
  scheduleService: {
    loadScheduleData: jest.fn(),
    saveScheduleData: jest.fn(),
    addLesson: jest.fn(),
    updateLesson: jest.fn(),
    deleteLesson: jest.fn(),
    getLessonById: jest.fn(),
  }
}));

const { useSchedule } = require('../useSchedule');
const { scheduleService } = require('../../services/ScheduleService');

describe('useSchedule (Simple)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    scheduleService.loadScheduleData.mockResolvedValue({
      lessons: [],
      settings: { language: 'ru' }
    });
  });

  it('should return initial state', () => {
    const { result } = renderHook(() => useSchedule());
    
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.scheduleData).toEqual({
      lessons: [],
      settings: { language: 'ru' }
    });
  });

  it('should have all required functions', () => {
    const { result } = renderHook(() => useSchedule());
    
    expect(typeof result.current.addLesson).toBe('function');
    expect(typeof result.current.updateLesson).toBe('function');
    expect(typeof result.current.deleteLesson).toBe('function');
    expect(typeof result.current.getLessonById).toBe('function');
    expect(typeof result.current.refreshSchedule).toBe('function');
  });

  it('should handle addLesson function', () => {
    const { result } = renderHook(() => useSchedule());
    
    const mockFormData = {
      title: 'Test Lesson',
      time: '10:00',
      day: 'Monday',
      room: '101',
      isOnline: false,
      studentName: 'Test Student'
    };
    
    expect(() => {
      result.current.addLesson(mockFormData);
    }).not.toThrow();
  });

  it('should handle updateLesson function', () => {
    const { result } = renderHook(() => useSchedule());
    
    expect(() => {
      result.current.updateLesson('lesson1', { title: 'Updated' });
    }).not.toThrow();
  });

  it('should handle deleteLesson function', () => {
    const { result } = renderHook(() => useSchedule());
    
    expect(() => {
      result.current.deleteLesson('lesson1');
    }).not.toThrow();
  });

  it('should handle getLessonById function', () => {
    const { result } = renderHook(() => useSchedule());
    
    const lesson = result.current.getLessonById('lesson1');
    expect(lesson).toBeUndefined();
  });

  it('should handle refreshSchedule function', () => {
    const { result } = renderHook(() => useSchedule());
    
    expect(() => {
      result.current.refreshSchedule();
    }).not.toThrow();
  });
});
