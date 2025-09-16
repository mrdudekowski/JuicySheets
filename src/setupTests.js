// Настройка тестовой среды
require('@testing-library/jest-dom');

// Мокаем crypto для тестов
let uuidCounter = 0;
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: jest.fn(() => {
      uuidCounter++;
      return `12345678-1234-1234-1234-${uuidCounter.toString().padStart(12, '0')}`;
    }),
  },
});

// Мокаем window.matchMedia для тестов
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Мокаем ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Мокаем IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Очистка после каждого теста
afterEach(() => {
  jest.clearAllMocks();
  uuidCounter = 0; // Сбрасываем счетчик UUID
});
