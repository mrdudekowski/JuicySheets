// Тесты для констант приложения
describe('Constants', () => {
  describe('DAYS_OF_WEEK', () => {
    it('should be an array', () => {
      expect(Array.isArray(DAYS_OF_WEEK)).toBe(true);
    });

    it('should have 7 days', () => {
      expect(DAYS_OF_WEEK).toHaveLength(7);
    });

    it('should have correct days in order', () => {
      expect(DAYS_OF_WEEK).toEqual([
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
        'Воскресенье'
      ]);
    });

    it('should contain all weekdays', () => {
      expect(DAYS_OF_WEEK).toContain('Понедельник');
      expect(DAYS_OF_WEEK).toContain('Вторник');
      expect(DAYS_OF_WEEK).toContain('Среда');
      expect(DAYS_OF_WEEK).toContain('Четверг');
      expect(DAYS_OF_WEEK).toContain('Пятница');
      expect(DAYS_OF_WEEK).toContain('Суббота');
      expect(DAYS_OF_WEEK).toContain('Воскресенье');
    });

    it('should have unique days', () => {
      const uniqueDays = [...new Set(DAYS_OF_WEEK)];
      expect(uniqueDays).toHaveLength(DAYS_OF_WEEK.length);
    });
  });

  describe('TIME_SLOTS', () => {
    it('should be an array', () => {
      expect(Array.isArray(TIME_SLOTS)).toBe(true);
    });

    it('should have correct length', () => {
      expect(TIME_SLOTS).toHaveLength(27);
    });

    it('should start with 08:00', () => {
      expect(TIME_SLOTS[0]).toBe('08:00');
    });

    it('should end with 21:00', () => {
      expect(TIME_SLOTS[TIME_SLOTS.length - 1]).toBe('21:00');
    });

    it('should have 30-minute intervals', () => {
      const expectedSlots = [
        '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
        '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
        '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
        '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
        '20:00', '20:30', '21:00'
      ];
      expect(TIME_SLOTS).toEqual(expectedSlots);
    });

    it('should contain common time slots', () => {
      expect(TIME_SLOTS).toContain('09:00');
      expect(TIME_SLOTS).toContain('12:00');
      expect(TIME_SLOTS).toContain('15:00');
      expect(TIME_SLOTS).toContain('18:00');
    });

    it('should have valid time format', () => {
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
      TIME_SLOTS.forEach(time => {
        expect(time).toMatch(timeRegex);
      });
    });

    it('should be sorted chronologically', () => {
      const sortedSlots = [...TIME_SLOTS].sort();
      expect(TIME_SLOTS).toEqual(sortedSlots);
    });

    it('should have unique time slots', () => {
      const uniqueSlots = [...new Set(TIME_SLOTS)];
      expect(uniqueSlots).toHaveLength(TIME_SLOTS.length);
    });
  });

  describe('MOCK_STUDENTS', () => {
    it('should be an array', () => {
      expect(Array.isArray(MOCK_STUDENTS)).toBe(true);
    });

    it('should have students', () => {
      expect(MOCK_STUDENTS.length).toBeGreaterThan(0);
    });

    it('should have students with required fields', () => {
      MOCK_STUDENTS.forEach(student => {
        expect(student).toHaveProperty('id');
        expect(student).toHaveProperty('name');
        expect(typeof student.id).toBe('string');
        expect(typeof student.name).toBe('string');
      });
    });

    it('should have unique student IDs', () => {
      const ids = MOCK_STUDENTS.map(student => student.id);
      const uniqueIds = [...new Set(ids)];
      expect(uniqueIds).toHaveLength(ids.length);
    });

    it('should have students with different levels', () => {
      const levels = MOCK_STUDENTS.map(student => student.level).filter(Boolean);
      const uniqueLevels = [...new Set(levels)];
      expect(uniqueLevels.length).toBeGreaterThan(1);
    });
  });
});

// Mock констант
const DAYS_OF_WEEK = [
  'Понедельник',
  'Вторник', 
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье'
];

const TIME_SLOTS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00'
];

const MOCK_STUDENTS = [
  {
    id: '1',
    name: 'Иван Петров',
    email: 'ivan@example.com',
    phone: '+7 (999) 123-45-67',
    level: 'intermediate',
    materials: 'Учебник "English Grammar in Use"',
    notes: 'Хорошо усваивает грамматику'
  },
  {
    id: '2',
    name: 'Мария Сидорова',
    email: 'maria@example.com',
    phone: '+7 (999) 234-56-78',
    level: 'beginner',
    materials: 'Учебник "Headway Beginner"',
    notes: 'Начинающий уровень'
  }
];
