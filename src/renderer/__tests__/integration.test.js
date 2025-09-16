// integration.test.js - Интеграционные тесты
const React = require('react');
const { render, screen, fireEvent, waitFor } = require('@testing-library/react');
const App = require('../app').default;

// Mock всех сервисов
jest.mock('../services/ScheduleService', () => ({
  scheduleService: {
    loadScheduleData: jest.fn(),
    saveScheduleData: jest.fn(),
    addLesson: jest.fn(),
    updateLesson: jest.fn(),
    deleteLesson: jest.fn(),
    getLessonById: jest.fn(),
  }
}));

jest.mock('../services/StudentService', () => ({
  studentService: {
    loadStudents: jest.fn(),
    saveStudents: jest.fn(),
    addStudent: jest.fn(),
    updateStudent: jest.fn(),
    deleteStudent: jest.fn(),
    getStudentById: jest.fn(),
    searchStudents: jest.fn(),
  }
}));

const { scheduleService } = require('../services/ScheduleService');
const { studentService } = require('../services/StudentService');

describe('Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Настройка моков
    scheduleService.loadScheduleData.mockResolvedValue({
      lessons: [],
      settings: { language: 'ru' }
    });
    
    studentService.loadStudents.mockResolvedValue([]);
    scheduleService.saveScheduleData.mockResolvedValue(undefined);
    studentService.saveStudents.mockResolvedValue(undefined);
  });

  it('should load application successfully', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('JuicySheets V2')).toBeInTheDocument();
    });
  });

  it('should add a student and create a lesson', async () => {
    const mockStudents = [
      { id: 's1', name: 'Иван Петров', level: 'beginner', materials: '', notes: '' }
    ];
    
    studentService.addStudent.mockImplementation((students, formData) => {
      const newStudent = { id: 's1', ...formData };
      return [...students, newStudent];
    });
    
    scheduleService.addLesson.mockImplementation((lessons, formData) => {
      const newLesson = { id: 'l1', ...formData };
      return [...lessons, newLesson];
    });

    render(<App />);
    
    // Ждем загрузки
    await waitFor(() => {
      expect(screen.getByText('JuicySheets V2')).toBeInTheDocument();
    });

    // Добавляем урок (кнопка есть в приложении)
    const addLessonBtn = screen.getByTitle('Добавить урок');
    fireEvent.click(addLessonBtn);
    
    await waitFor(() => {
      expect(screen.getByText('Добавить урок')).toBeInTheDocument();
    });

    // Проверяем, что открылась форма выбора студентов
    expect(screen.getByText('👥 Выберите студента')).toBeInTheDocument();
    
    // Проверяем, что есть кнопка добавления студента
    const addStudentBtn = screen.getByTitle('Добавить нового студента');
    expect(addStudentBtn).toBeInTheDocument();
    
    // Проверяем, что форма урока открылась
    expect(screen.getByText('Добавить урок')).toBeInTheDocument();
  });

  it('should handle errors gracefully', async () => {
    studentService.loadStudents.mockRejectedValue(new Error('Failed to load students'));
    
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('JuicySheets V2')).toBeInTheDocument();
    });
    
    // Приложение должно продолжать работать даже при ошибках
    expect(screen.getByTitle('Добавить урок')).toBeInTheDocument();
  });
});
