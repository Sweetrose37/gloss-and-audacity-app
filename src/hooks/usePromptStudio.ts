import { useCallback, useState } from 'react'
import type { BuiltPrompt, PromptSelections } from '../types'
import { normalizeSelections } from '../utils/normalization'

const selectionKey = 'ga-prompt-selections-v2'

function read<T>(key: string, fallback: T): T {
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback }
  catch { return fallback }
}

export function usePromptStudio(initialProduction: PromptSelections['production'], onStorageError?: (message: string) => void) {
  const [selections, setSelectionsState] = useState<PromptSelections>(() => normalizeSelections(read(selectionKey, {}), initialProduction))
  const [result, setResult] = useState<BuiltPrompt | null>(null)

  const setSelections = useCallback((next: PromptSelections | ((current: PromptSelections) => PromptSelections)) => {
    setSelectionsState((current) => {
      const value = typeof next === 'function' ? next(current) : next
      try { localStorage.setItem(selectionKey, JSON.stringify(value)) }
      catch { onStorageError?.('Your choices remain on screen, but the browser could not remember them for a future visit.') }
      return value
    })
  }, [onStorageError])

  const updateSelection = useCallback(<K extends keyof PromptSelections>(field: K, value: PromptSelections[K]) => {
    setSelections((current) => ({ ...current, [field]: value }))
  }, [setSelections])

  return { selections, setSelections, updateSelection, result, setResult }
}
