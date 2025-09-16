// FormValidationService.test.js
const { formValidationService } = require('../FormValidationService');

describe('FormValidationService', () => {
  describe('validateLessonForm', () => {
    it('should return empty errors for valid form data', () => {
      const validData = {
        title: 'Math Lesson',
        time: '10:00',
        day: 'Monday',
        room: 'Room 101',
        isOnline: false,
        studentName: 'John Doe'
      };
      
      const errors = formValidationService.validateLessonForm(validData);
      
      expect(errors).toEqual({});
    });

    it('should return errors for empty required fields', () => {
      const invalidData = {
        title: '',
        time: '',
        day: '',
        room: '',
        isOnline: false,
        studentName: ''
      };
      
      const errors = formValidationService.validateLessonForm(invalidData);
      
      expect(errors.title).toBe('Название урока обязательно');
      expect(errors.time).toBe('Время урока обязательно');
      expect(errors.day).toBe('День недели обязателен');
      expect(errors.room).toBe('Место проведения обязательно');
      expect(errors.studentName).toBe('Имя студента обязательно');
    });

    it('should return error for invalid time format', () => {
      const invalidData = {
        title: 'Math Lesson',
        time: '25:00', // Invalid time
        day: 'Monday',
        room: 'Room 101',
        isOnline: false,
        studentName: 'John Doe'
      };
      
      const errors = formValidationService.validateLessonForm(invalidData);
      
      expect(errors.time).toBe('Время должно быть в формате ЧЧ:ММ');
    });

    it('should accept valid time formats', () => {
      const validTimes = ['09:00', '10:30', '14:15', '23:59'];
      
      validTimes.forEach(time => {
        const data = {
          title: 'Math Lesson',
          time: time,
          day: 'Monday',
          room: 'Room 101',
          isOnline: false,
          studentName: 'John Doe'
        };
        
        const errors = formValidationService.validateLessonForm(data);
        expect(errors.time).toBeUndefined();
      });
    });
  });

  describe('validateStudentForm', () => {
    it('should return empty errors for valid form data', () => {
      const validData = {
        name: 'John Doe',
        level: 'intermediate',
        materials: 'Advanced Materials',
        notes: 'Good student'
      };
      
      const errors = formValidationService.validateStudentForm(validData);
      
      expect(errors).toEqual({});
    });

    it('should return errors for empty required fields', () => {
      const invalidData = {
        name: '',
        level: '',
        materials: '',
        notes: ''
      };
      
      const errors = formValidationService.validateStudentForm(invalidData);
      
      expect(errors.name).toBe('Имя студента обязательно');
      expect(errors.level).toBe('Уровень студента обязателен');
    });

    it('should return error for name too short', () => {
      const invalidData = {
        name: 'A', // Too short
        level: 'beginner',
        materials: '',
        notes: ''
      };
      
      const errors = formValidationService.validateStudentForm(invalidData);
      
      expect(errors.name).toBe('Имя должно содержать минимум 2 символа');
    });

    it('should return error for invalid level', () => {
      const invalidData = {
        name: 'John Doe',
        level: 'invalid-level',
        materials: '',
        notes: ''
      };
      
      const errors = formValidationService.validateStudentForm(invalidData);
      
      expect(errors.level).toBe('Выберите корректный уровень');
    });

    it('should accept valid levels', () => {
      const validLevels = ['beginner', 'intermediate', 'advanced'];
      
      validLevels.forEach(level => {
        const data = {
          name: 'John Doe',
          level: level,
          materials: '',
          notes: ''
        };
        
        const errors = formValidationService.validateStudentForm(data);
        expect(errors.level).toBeUndefined();
      });
    });
  });

  describe('isFormValid', () => {
    it('should return true for empty errors object', () => {
      const errors = {};
      
      const isValid = formValidationService.isFormValid(errors);
      
      expect(isValid).toBe(true);
    });

    it('should return false for errors object with errors', () => {
      const errors = {
        title: 'Title is required',
        time: 'Time is required'
      };
      
      const isValid = formValidationService.isFormValid(errors);
      
      expect(isValid).toBe(false);
    });
  });

  describe('getFirstError', () => {
    it('should return null for empty errors object', () => {
      const errors = {};
      
      const firstError = formValidationService.getFirstError(errors);
      
      expect(firstError).toBeNull();
    });

    it('should return first error message', () => {
      const errors = {
        title: 'Title is required',
        time: 'Time is required',
        day: 'Day is required'
      };
      
      const firstError = formValidationService.getFirstError(errors);
      
      expect(firstError).toBe('Title is required');
    });
  });
});
