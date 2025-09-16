// useFormMode.test.js
const { renderHook, act } = require('@testing-library/react-hooks');
const { useFormMode } = require('../useFormMode');

describe('useFormMode', () => {
  it('should return form mode state and functions', () => {
    const { result } = renderHook(() => useFormMode());
    
    expect(result.current).toHaveProperty('formMode');
    expect(result.current).toHaveProperty('setFormMode');
    expect(result.current).toHaveProperty('isStudentSelection');
    expect(result.current).toHaveProperty('isLessonCreation');
    expect(result.current).toHaveProperty('isAddStudent');
    expect(result.current).toHaveProperty('goToStudentSelection');
    expect(result.current).toHaveProperty('goToLessonCreation');
    expect(result.current).toHaveProperty('goToAddStudent');
    expect(result.current).toHaveProperty('resetFormMode');
  });

  it('should have default initial mode', () => {
    const { result } = renderHook(() => useFormMode());
    
    expect(result.current.formMode).toBe('student-selection');
    expect(result.current.isStudentSelection).toBe(true);
    expect(result.current.isLessonCreation).toBe(false);
    expect(result.current.isAddStudent).toBe(false);
  });

  it('should accept custom initial mode', () => {
    const { result } = renderHook(() => useFormMode('lesson-creation'));
    
    expect(result.current.formMode).toBe('lesson-creation');
    expect(result.current.isStudentSelection).toBe(false);
    expect(result.current.isLessonCreation).toBe(true);
    expect(result.current.isAddStudent).toBe(false);
  });

  it('should set form mode', () => {
    const { result } = renderHook(() => useFormMode());
    
    act(() => {
      result.current.setFormMode('lesson-creation');
    });
    
    expect(result.current.formMode).toBe('lesson-creation');
    expect(result.current.isLessonCreation).toBe(true);
    expect(result.current.isStudentSelection).toBe(false);
  });

  it('should go to student selection', () => {
    const { result } = renderHook(() => useFormMode('lesson-creation'));
    
    act(() => {
      result.current.goToStudentSelection();
    });
    
    expect(result.current.formMode).toBe('student-selection');
    expect(result.current.isStudentSelection).toBe(true);
    expect(result.current.isLessonCreation).toBe(false);
  });

  it('should go to lesson creation', () => {
    const { result } = renderHook(() => useFormMode());
    
    act(() => {
      result.current.goToLessonCreation();
    });
    
    expect(result.current.formMode).toBe('lesson-creation');
    expect(result.current.isLessonCreation).toBe(true);
    expect(result.current.isStudentSelection).toBe(false);
  });

  it('should go to add student', () => {
    const { result } = renderHook(() => useFormMode());
    
    act(() => {
      result.current.goToAddStudent();
    });
    
    expect(result.current.formMode).toBe('add-student');
    expect(result.current.isAddStudent).toBe(true);
    expect(result.current.isStudentSelection).toBe(false);
  });

  it('should reset form mode to student selection', () => {
    const { result } = renderHook(() => useFormMode('lesson-creation'));
    
    act(() => {
      result.current.resetFormMode();
    });
    
    expect(result.current.formMode).toBe('student-selection');
    expect(result.current.isStudentSelection).toBe(true);
    expect(result.current.isLessonCreation).toBe(false);
  });

  it('should handle all mode transitions', () => {
    const { result } = renderHook(() => useFormMode());
    
    // student-selection -> lesson-creation
    act(() => {
      result.current.goToLessonCreation();
    });
    expect(result.current.formMode).toBe('lesson-creation');
    
    // lesson-creation -> add-student
    act(() => {
      result.current.goToAddStudent();
    });
    expect(result.current.formMode).toBe('add-student');
    
    // add-student -> student-selection
    act(() => {
      result.current.goToStudentSelection();
    });
    expect(result.current.formMode).toBe('student-selection');
    
    // Reset
    act(() => {
      result.current.resetFormMode();
    });
    expect(result.current.formMode).toBe('student-selection');
  });
});