// Тесты для validateLessonForm функции
describe('validateLessonForm', () => {
  const validData = {
    title: 'Математика',
    time: '10:00',
    day: 'Понедельник',
    room: '101',
    isOnline: false,
    studentName: 'Иван Петров'
  };

  it('should be a function', () => {
    expect(typeof validateLessonForm).toBe('function');
  });

  it('should validate correct form data', () => {
    const errors = validateLessonForm(validData);
    expect(errors).toEqual({});
  });

  it('should validate required fields', () => {
    const invalidData = {
      title: '',
      time: '',
      day: '',
      room: '',
      isOnline: false,
      studentName: ''
    };

    const errors = validateLessonForm(invalidData);
    expect(errors).toEqual({
      title: 'Название урока обязательно',
      time: 'Время урока обязательно',
      day: 'День недели обязателен',
      room: 'Место проведения обязательно',
      studentName: 'Имя студента обязательно'
    });
  });

  it('should validate time format correctly', () => {
    const validTimeData = { ...validData, time: '14:30' };
    const errors = validateLessonForm(validTimeData);
    expect(errors.time).toBeUndefined();
  });

  it('should validate time format incorrectly', () => {
    const invalidTimeData = { ...validData, time: '25:00' };
    const errors = validateLessonForm(invalidTimeData);
    expect(errors.time).toBe('Время должно быть в формате ЧЧ:ММ');
  });

  it('should validate time format with single digit hours', () => {
    const validTimeData = { ...validData, time: '9:30' };
    const errors = validateLessonForm(validTimeData);
    expect(errors.time).toBeUndefined();
  });

  it('should validate time format with midnight', () => {
    const validTimeData = { ...validData, time: '00:00' };
    const errors = validateLessonForm(validTimeData);
    expect(errors.time).toBeUndefined();
  });

  it('should validate time format with 23:59', () => {
    const validTimeData = { ...validData, time: '23:59' };
    const errors = validateLessonForm(validTimeData);
    expect(errors.time).toBeUndefined();
  });

  it('should validate trimmed strings', () => {
    const invalidData = {
      ...validData,
      title: '   ', // Only spaces
      studentName: '   '
    };

    const errors = validateLessonForm(invalidData);
    expect(errors.title).toBe('Название урока обязательно');
    expect(errors.studentName).toBe('Имя студента обязательно');
  });

  it('should handle partial validation', () => {
    const partialData = {
      title: 'Математика',
      time: '', // Missing time
      day: 'Понедельник',
      room: '101',
      isOnline: false,
      studentName: 'Иван Петров'
    };

    const errors = validateLessonForm(partialData);
    expect(errors).toEqual({
      time: 'Время урока обязательно'
    });
  });

  it('should validate online lessons', () => {
    const onlineData = { ...validData, isOnline: true };
    const errors = validateLessonForm(onlineData);
    expect(errors).toEqual({});
  });

  it('should handle special characters in names', () => {
    const specialCharData = { 
      ...validData, 
      studentName: 'Анна-Мария О\'Коннор' 
    };
    const errors = validateLessonForm(specialCharData);
    expect(errors).toEqual({});
  });
});

// Mock функции validateLessonForm
function validateLessonForm(data) {
  const errors = {};

  if (!data.title.trim()) {
    errors.title = 'Название урока обязательно';
  }

  if (!data.time.trim()) {
    errors.time = 'Время урока обязательно';
  } else if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(data.time)) {
    errors.time = 'Время должно быть в формате ЧЧ:ММ';
  }

  if (!data.day.trim()) {
    errors.day = 'День недели обязателен';
  }

  if (!data.room.trim()) {
    errors.room = 'Место проведения обязательно';
  }

  if (!data.studentName.trim()) {
    errors.studentName = 'Имя студента обязательно';
  }

  return errors;
}
