// ScheduleService.test.js
const { scheduleService } = require('../ScheduleService');

describe('ScheduleService', () => {
  beforeEach(() => {
    // Очищаем localStorage перед каждым тестом
    localStorage.clear();
  });

  describe('loadScheduleData', () => {
    it('should load default schedule data when no stored data', async () => {
      const data = await scheduleService.loadScheduleData();
      
      expect(data).toBeDefined();
      expect(data.lessons).toBeInstanceOf(Array);
      expect(data.settings).toBeDefined();
      expect(data.settings.language).toBe('ru');
      expect(data.lessons.length).toBeGreaterThan(0);
    });

    it('should load stored data when available', async () => {
      const testData = {
        lessons: [{ id: '1', title: 'Test Lesson', time: '10:00', day: 'Monday', room: '101', isOnline: false, studentName: 'Test Student' }],
        settings: { language: 'en' }
      };
      
      localStorage.setItem('juicy-sheets-schedule', JSON.stringify(testData));
      
      const data = await scheduleService.loadScheduleData();
      
      expect(data).toEqual(testData);
    });
  });

  describe('saveScheduleData', () => {
    it('should save schedule data to localStorage', async () => {
      const testData = {
        lessons: [{ id: '1', title: 'Test Lesson', time: '10:00', day: 'Monday', room: '101', isOnline: false, studentName: 'Test Student' }],
        settings: { language: 'ru' }
      };
      
      await scheduleService.saveScheduleData(testData);
      
      const stored = localStorage.getItem('juicy-sheets-schedule');
      expect(JSON.parse(stored)).toEqual(testData);
    });
  });

  describe('addLesson', () => {
    it('should add new lesson to lessons array', () => {
      const lessons = [];
      const formData = {
        title: 'Math',
        time: '10:00',
        day: 'Monday',
        room: '101',
        isOnline: false,
        studentName: 'John'
      };
      
      const result = scheduleService.addLesson(lessons, formData);
      
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        title: 'Math',
        time: '10:00',
        day: 'Monday',
        room: '101',
        isOnline: false,
        studentName: 'John'
      });
      expect(result[0].id).toBeDefined();
    });
  });

  describe('updateLesson', () => {
    it('should update existing lesson', () => {
      const lessons = [
        { id: '1', title: 'Old Title', time: '10:00', day: 'Monday', room: '101', isOnline: false, studentName: 'John' }
      ];
      const formData = {
        title: 'New Title',
        time: '11:00',
        day: 'Tuesday',
        room: '102',
        isOnline: true,
        studentName: 'Jane'
      };
      
      const result = scheduleService.updateLesson(lessons, '1', formData);
      
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        id: '1',
        title: 'New Title',
        time: '11:00',
        day: 'Tuesday',
        room: '102',
        isOnline: true,
        studentName: 'Jane'
      });
    });
  });

  describe('deleteLesson', () => {
    it('should remove lesson from lessons array', () => {
      const lessons = [
        { id: '1', title: 'Lesson 1', time: '10:00', day: 'Monday', room: '101', isOnline: false, studentName: 'John' },
        { id: '2', title: 'Lesson 2', time: '11:00', day: 'Tuesday', room: '102', isOnline: false, studentName: 'Jane' }
      ];
      
      const result = scheduleService.deleteLesson(lessons, '1');
      
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('2');
    });
  });

  describe('getLessonById', () => {
    it('should return lesson by id', () => {
      const lessons = [
        { id: '1', title: 'Lesson 1', time: '10:00', day: 'Monday', room: '101', isOnline: false, studentName: 'John' },
        { id: '2', title: 'Lesson 2', time: '11:00', day: 'Tuesday', room: '102', isOnline: false, studentName: 'Jane' }
      ];
      
      const result = scheduleService.getLessonById(lessons, '2');
      
      expect(result).toEqual(lessons[1]);
    });

    it('should return undefined for non-existent id', () => {
      const lessons = [];
      
      const result = scheduleService.getLessonById(lessons, '999');
      
      expect(result).toBeUndefined();
    });
  });
});
