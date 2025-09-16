// useStudents.test.js
const { renderHook, act } = require('@testing-library/react-hooks');
const { useStudents } = require('../useStudents');

// Mock сервиса
jest.mock('../../services/StudentService', () => ({
  studentService: {
    loadStudents: jest.fn(),
    saveStudents: jest.fn(),
    addStudent: jest.fn(),
    removeStudent: jest.fn(),
    deleteStudent: jest.fn(),
    getStudentById: jest.fn(),
  }
}));

const { studentService } = require('../../services/StudentService');

describe('useStudents', () => {
  const mockInitialStudents = [
    { id: 's1', name: 'Student A', level: 'Beginner', materials: '', notes: '' },
    { id: 's2', name: 'Student B', level: 'Intermediate', materials: '', notes: '' },
  ];

  beforeEach(() => {
    studentService.loadStudents.mockResolvedValue(mockInitialStudents);
    studentService.saveStudents.mockResolvedValue(undefined);
    studentService.addStudent.mockImplementation((currentStudents, formData) => {
      const newStudent = { id: 's3', ...formData };
      return [...currentStudents, newStudent];
    });
    studentService.deleteStudent.mockImplementation((currentStudents, studentId) =>
      currentStudents.filter(s => s.id !== studentId)
    );
    studentService.getStudentById.mockImplementation((students, studentId) =>
      students.find(s => s.id === studentId)
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should load students data on mount', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useStudents());

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.students).toEqual(mockInitialStudents);
    expect(studentService.loadStudents).toHaveBeenCalledTimes(1);
  });

  it('should handle error during students data loading', async () => {
    studentService.loadStudents.mockRejectedValueOnce(new Error('Failed to load'));
    const { result, waitForNextUpdate } = renderHook(() => useStudents());

    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Failed to load');
  });

  it('should add a student', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useStudents());
    await waitForNextUpdate(); // Initial load

    const newStudentData = { name: 'Student C', level: 'Advanced', materials: 'Book', notes: 'Fast learner' };
    
    await act(async () => {
      await result.current.addStudent(newStudentData);
    });

    expect(result.current.students.length).toBe(3);
    expect(result.current.students[2]).toEqual(expect.objectContaining({
      id: 's3',
      name: 'Student C',
      level: 'Advanced',
      materials: 'Book',
      notes: 'Fast learner'
    }));
    expect(studentService.addStudent).toHaveBeenCalledTimes(1);
    expect(studentService.saveStudents).toHaveBeenCalledTimes(1);
  });

  it('should delete a student', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useStudents());
    await waitForNextUpdate(); // Initial load

    await act(async () => {
      await result.current.deleteStudent('s1');
    });

    expect(result.current.students.length).toBe(1);
    expect(result.current.students[0].id).toBe('s2');
    expect(studentService.deleteStudent).toHaveBeenCalledTimes(1);
    expect(studentService.saveStudents).toHaveBeenCalledTimes(1);
  });

  it('should get student by id', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useStudents());
    await waitForNextUpdate(); // Initial load

    const student = result.current.getStudentById('s2');
    expect(student).toEqual(mockInitialStudents[1]);
    expect(studentService.getStudentById).toHaveBeenCalledWith(mockInitialStudents, 's2');
  });

  it('should return undefined for non-existent student id', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useStudents());
    await waitForNextUpdate(); // Initial load

    const student = result.current.getStudentById('non-existent');
    expect(student).toBeUndefined();
  });

  it('should refresh students', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useStudents());
    await waitForNextUpdate(); // Initial load

    const newStudents = [{ id: 's3', name: 'Student C', level: 'Advanced', materials: '', notes: '' }];
    studentService.loadStudents.mockResolvedValueOnce(newStudents);

    await act(async () => {
      await result.current.refreshStudents();
    });

    expect(result.current.students).toEqual(newStudents);
    expect(studentService.loadStudents).toHaveBeenCalledTimes(2); // Initial + refresh
  });

  it('should set error if addStudent fails', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useStudents());
    await waitForNextUpdate();

    studentService.addStudent.mockImplementation(() => {
      throw new Error('Add failed');
    });

    const newStudentData = { name: 'Student C', level: 'Advanced', materials: '', notes: '' };
    
    await act(async () => {
      await result.current.addStudent(newStudentData);
    });

    expect(result.current.error).toBe('Add failed');
  });

  it('should set error if deleteStudent fails', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useStudents());
    await waitForNextUpdate();

    studentService.deleteStudent.mockImplementation(() => {
      throw new Error('Delete failed');
    });

    await act(async () => {
      await result.current.deleteStudent('s1');
    });

    expect(result.current.error).toBe('Delete failed');
  });
});