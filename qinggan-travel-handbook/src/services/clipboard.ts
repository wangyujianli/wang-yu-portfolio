export interface ClipboardWriter {
  writeText(value: string): Promise<void>
}

function getBrowserClipboard(): ClipboardWriter | null {
  if (typeof navigator === 'undefined') return null
  return navigator.clipboard ?? null
}

export async function copyText(
  text: string,
  clipboard: ClipboardWriter | null = getBrowserClipboard(),
): Promise<boolean> {
  if (!clipboard) return false

  try {
    await clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
