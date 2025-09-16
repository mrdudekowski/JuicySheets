// StudentService.test.js
const { studentService } = require('../StudentService');

describe('StudentService', () => {
  beforeEach(() => {
    // Очищаем localStorage перед каждым тестом
    localStorage.clear();
  });

  describe('loadStudents', () => {
    it('should load default students when no stored data', async () => {
      const students = await studentService.loadStudents();
      
      expect(students).toBeInstanceOf(Array);
      expect(students.length).toBeGreaterThan(0);
      expect(students[0]).toHaveProperty('id');
      expect(students[0]).toHaveProperty('name');
    });

    it('should load stored students when available', async () => {
      const testStudents = [
        { id: '1', name: 'Test Student', level: 'beginner', materials: 'Test Materials', notes: 'Test Notes' }
      ];
      
      localStorage.setItem('juicy-sheets-students', JSON.stringify(testStudents));
      
      const students = await studentService.loadStudents();
      
      expect(students).toEqual(testStudents);
    });
  });

  describe('saveStudents', () => {
    it('should save students to localStorage', async () => {
      const testStudents = [
        { id: '1', name: 'Test Student', level: 'beginner', materials: 'Test Materials', notes: 'Test Notes' }
      ];
      
      await studentService.saveStudents(testStudents);
      
      const stored = localStorage.getItem('juicy-sheets-students');
      expect(JSON.parse(stored)).toEqual(testStudents);
    });
  });

  describe('addStudent', () => {
    it('should add new student to students array', () => {
      const students = [];
      const formData = {
        name: 'John Doe',
        level: 'intermediate',
        materials: 'Advanced Materials',
        notes: 'Good student'
      };
      
      const result = studentService.addStudent(students, formData);
      
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        name: 'John Doe',
        level: 'intermediate',
        materials: 'Advanced Materials',
        notes: 'Good student'
      });
      expect(result[0].id).toBeDefined();
    });
  });

  describe('updateStudent', () => {
    it('should update existing student', () => {
      const students = [
        { id: '1', name: 'Old Name', level: 'beginner', materials: 'Old Materials', notes: 'Old Notes' }
      ];
      const formData = {
        name: 'New Name',
        level: 'advanced',
        materials: 'New Materials',
        notes: 'New Notes'
      };
      
      const result = studentService.updateStudent(students, '1', formData);
      
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        id: '1',
        name: 'New Name',
        level: 'advanced',
        materials: 'New Materials',
        notes: 'New Notes'
      });
    });
  });

  describe('deleteStudent', () => {
    it('should remove student from students array', () => {
      const students = [
        { id: '1', name: 'Student 1', level: 'beginner', materials: 'Materials 1', notes: 'Notes 1' },
        { id: '2', name: 'Student 2', level: 'intermediate', materials: 'Materials 2', notes: 'Notes 2' }
      ];
      
      const result = studentService.deleteStudent(students, '1');
      
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('2');
    });
  });

  describe('getStudentById', () => {
    it('should return student by id', () => {
      const students = [
        { id: '1', name: 'Student 1', level: 'beginner', materials: 'Materials 1', notes: 'Notes 1' },
        { id: '2', name: 'Student 2', level: 'intermediate', materials: 'Materials 2', notes: 'Notes 2' }
      ];
      
      const result = studentService.getStudentById(students, '2');
      
      expect(result).toEqual(students[1]);
    });

    it('should return undefined for non-existent id', () => {
      const students = [];
      
      const result = studentService.getStudentById(students, '999');
      
      expect(result).toBeUndefined();
    });
  });

  describe('searchStudents', () => {
    it('should return all students when query is empty', () => {
      const students = [
        { id: '1', name: 'John Doe', level: 'beginner', materials: 'Materials 1', notes: 'Notes 1' },
        { id: '2', name: 'Jane Smith', level: 'intermediate', materials: 'Materials 2', notes: 'Notes 2' }
      ];
      
      const result = studentService.searchStudents(students, '');
      
      expect(result).toEqual(students);
    });

    it('should filter students by name', () => {
      const students = [
        { id: '1', name: 'John Doe', level: 'beginner', materials: 'Materials 1', notes: 'Notes 1' },
        { id: '2', name: 'Jane Smith', level: 'intermediate', materials: 'Materials 2', notes: 'Notes 2' }
      ];
      
      const result = studentService.searchStudents(students, 'John');
      
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('John Doe');
    });

    it('should filter students by level', () => {
      const students = [
        { id: '1', name: 'John Doe', level: 'beginner', materials: 'Materials 1', notes: 'Notes 1' },
        { id: '2', name: 'Jane Smith', level: 'intermediate', materials: 'Materials 2', notes: 'Notes 2' }
      ];
      
      const result = studentService.searchStudents(students, 'intermediate');
      
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Jane Smith');
    });
  });
});
