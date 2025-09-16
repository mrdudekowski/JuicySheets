type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface Logger {
  debug: (...args: unknown[]) => void
  info: (...args: unknown[]) => void
  warn: (...args: unknown[]) => void
  error: (...args: unknown[]) => void
}

const isDebugEnabled = () => {
  try {
    // Enable debug logs when running tests or when env flag is set
    return process.env.NODE_ENV === 'test' || process.env.JUICY_DEBUG === '1'
  } catch {
    return false
  }
}

const log = (level: LogLevel, ...args: unknown[]) => {
  // Reduce noise in production unless explicitly enabled
  if (level === 'debug' && !isDebugEnabled()) return
  // eslint-disable-next-line no-console
  console[level](...args)
}

export const logger: Logger = {
  debug: (...args: unknown[]) => log('debug', ...args),
  info: (...args: unknown[]) => log('info', ...args),
  warn: (...args: unknown[]) => log('warn', ...args),
  error: (...args: unknown[]) => log('error', ...args)
}

export default logger


