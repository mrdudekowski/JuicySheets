// Тесты для useLessonFormReducer хука
const { renderHook } = require('@testing-library/react-hooks');
const { useLessonFormReducer } = require('../useLessonFormReducer');

describe('useLessonFormReducer', () => {
  it('should be a function', () => {
    expect(typeof useLessonFormReducer).toBe('function');
  });

  it('should return initial state', () => {
    const { result } = renderHook(() => useLessonFormReducer());
    
    expect(result.current.state).toBeDefined();
    expect(result.current.state.formData).toBeDefined();
    expect(result.current.state.errors).toBeDefined();
    expect(result.current.state.students).toBeDefined();
  });

  it('should have setFormData function', () => {
    const { result } = renderHook(() => useLessonFormReducer());
    
    expect(typeof result.current.setFormData).toBe('function');
  });

  it('should have setDraggedStudent function', () => {
    const { result } = renderHook(() => useLessonFormReducer());
    
    expect(typeof result.current.setDraggedStudent).toBe('function');
  });

  it('should have setDragOver function', () => {
    const { result } = renderHook(() => useLessonFormReducer());
    
    expect(typeof result.current.setDragOver).toBe('function');
  });

  it('should have setFormMode function', () => {
    const { result } = renderHook(() => useLessonFormReducer());
    
    expect(typeof result.current.setFormMode).toBe('function');
  });

  it('should have resetForm function', () => {
    const { result } = renderHook(() => useLessonFormReducer());
    
    expect(typeof result.current.resetForm).toBe('function');
  });

  it('should have handleStudentDrop function', () => {
    const { result } = renderHook(() => useLessonFormReducer());
    
    expect(typeof result.current.handleStudentDrop).toBe('function');
  });

  it('should have removeStudent function', () => {
    const { result } = renderHook(() => useLessonFormReducer());
    
    expect(typeof result.current.removeStudent).toBe('function');
  });

  it('should have addStudent function', () => {
    const { result } = renderHook(() => useLessonFormReducer());
    
    expect(typeof result.current.addStudent).toBe('function');
  });

  it('should handle form data updates', () => {
    const { result } = renderHook(() => useLessonFormReducer());
    const newData = { title: 'Математика', time: '10:00' };
    
    result.current.setFormData(newData);
    
    expect(result.current.state.formData.title).toBe('Математика');
    expect(result.current.state.formData.time).toBe('10:00');
  });

  it('should handle student drag operations', () => {
    const { result } = renderHook(() => useLessonFormReducer());
    const student = { id: '1', name: 'Иван Петров' };
    
    result.current.setDraggedStudent(student);
    
    expect(result.current.state.dragDrop.draggedStudent).toBe(student);
  });

  it('should handle drag over state', () => {
    const { result } = renderHook(() => useLessonFormReducer());
    
    result.current.setDragOver(true);
    
    expect(result.current.state.dragDrop.isDragOver).toBe(true);
  });

  it('should handle form mode changes', () => {
    const { result } = renderHook(() => useLessonFormReducer());
    
    result.current.setFormMode('lesson-creation');
    
    expect(result.current.state.formMode).toBe('lesson-creation');
  });

  it('should handle form reset', () => {
    const { result } = renderHook(() => useLessonFormReducer());
    
    // Изменяем состояние
    result.current.setFormData({ title: 'Тест' });
    result.current.setFormMode('lesson-creation');
    
    // Сбрасываем
    result.current.resetForm();
    
    expect(result.current.state.formData.title).toBe('');
    expect(result.current.state.formMode).toBe('student-selection');
  });

  it('should handle student drop operations', () => {
    const { result } = renderHook(() => useLessonFormReducer());
    const student = { id: '1', name: 'Иван Петров' };
    
    result.current.handleStudentDrop(student);
    
    expect(result.current.state.formData.studentName).toBe('Иван Петров');
    expect(result.current.state.formData.studentId).toBe('1');
  });

  it('should handle student removal', () => {
    const { result } = renderHook(() => useLessonFormReducer());
    
    // Добавляем студента
    result.current.setFormData({ studentName: 'Иван Петров', studentId: '1' });
    
    // Удаляем студента с ID '1'
    result.current.removeStudent('1');
    
    expect(result.current.state.formData.studentName).toBe('');
    expect(result.current.state.formData.studentId).toBeUndefined();
  });

  it('should handle student addition', () => {
    const { result } = renderHook(() => useLessonFormReducer());
    const newStudent = { 
      id: '2', 
      name: 'Мария Сидорова',
      email: 'maria@example.com',
      level: 'beginner'
    };
    
    result.current.addStudent(newStudent);
    
    expect(result.current.state.students).toContain(newStudent);
  });
});

