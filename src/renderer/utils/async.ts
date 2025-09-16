/**
 * Executes async operation with unified error handling.
 * Returns operation result or undefined on error.
 */
export async function handleAsyncOp<T>(
  op: () => Promise<T>,
  onError?: (message: string) => void,
  context?: string
): Promise<T | undefined> {
  try {
    return await op()
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Неизвестная ошибка'
    if (onError) onError(message)
    // eslint-disable-next-line no-console
    console.error(`Ошибка${context ? ` (${context})` : ''}:`, err)
    return undefined
  }
}


