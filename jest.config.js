module.exports = {
  // Тестовая среда
  testEnvironment: 'jsdom',
  
  // Настройка файлов
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  
  // Алиасы модулей
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/renderer/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },

  // Паттерны тестов
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.(ts|tsx|js|jsx)',
    '<rootDir>/src/**/*.(test|spec).(ts|tsx|js|jsx)',
  ],

  // Покрытие кода
  collectCoverageFrom: [
    'src/**/*.(ts|tsx)',
    '!src/**/*.d.ts',
    '!src/main/**',
    '!src/preload/**',
    '!src/**/__tests__/**',
    '!src/**/*.test.*',
    '!src/**/*.spec.*',
  ],

  // Трансформация файлов - используем babel-jest для всех файлов
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },

  // Расширения файлов
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  // Игнорирование трансформации
  transformIgnorePatterns: [
    'node_modules/(?!(.*\\.mjs$|@testing-library))',
  ],


  // Очистка моков
  clearMocks: true,
  restoreMocks: true,

  // Таймауты
  testTimeout: 10000,

  // Настройки для модулей
  moduleDirectories: ['node_modules', 'src'],
  
  // Настройки для тестов
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
};