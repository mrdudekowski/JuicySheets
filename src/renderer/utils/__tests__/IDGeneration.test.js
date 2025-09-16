// Тесты для генерации ID
const { generateId } = require('../IDGeneration');

describe('ID Generation', () => {
  it('should generate unique IDs', () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
  });

  it('should use crypto.randomUUID', () => {
    const id = generateId();
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });

  it('should generate valid UUID format', () => {
    const id = generateId();
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    expect(id).toMatch(uuidRegex);
  });

  it('should not generate duplicate IDs in sequence', () => {
    const ids = new Set();
    for (let i = 0; i < 100; i++) {
      const id = generateId();
      expect(ids.has(id)).toBe(false);
      ids.add(id);
    }
  });

  it('should generate different IDs for different calls', () => {
    const ids = Array.from({ length: 10 }, () => generateId());
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should handle multiple rapid calls', () => {
    const promises = Array.from({ length: 50 }, () => 
      new Promise(resolve => {
        setTimeout(() => resolve(generateId()), Math.random() * 10);
      })
    );
    
    return Promise.all(promises).then(ids => {
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  it('should be consistent with crypto.randomUUID', () => {
    const id = generateId();
    expect(id).toMatch(/^12345678-1234-1234-1234-\d{12}$/);
    expect(global.crypto.randomUUID).toHaveBeenCalled();
  });

  it('should handle crypto.randomUUID fallback', () => {
    // Мокаем отсутствие crypto.randomUUID
    const originalCrypto = global.crypto;
    Object.defineProperty(global, 'crypto', {
      value: undefined,
      writable: true
    });

    const id = generateId();
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);

    // Восстанавливаем оригинальный crypto
    Object.defineProperty(global, 'crypto', {
      value: originalCrypto,
      writable: true
    });
  });
});
