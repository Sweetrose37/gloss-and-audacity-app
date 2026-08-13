import { useCallback, useState } from 'react'
import { defaultSelections } from '../data/promptOptions'
import type { BuiltPrompt, PromptSelections } from '../types'

const selectionKey = 'ga-prompt-selections-v2'
const savedKey = 'ga-saved-prompts-v2'

function read<T>(key: string, fallback: T): T {
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback }
  catch { return fallback }
}

export function usePromptStudio(initialProduction: PromptSelections['production']) {
  const [selections, setSelectionsState] = useState<PromptSelections>(() => ({ ...defaultSelections, ...read(selectionKey, {}), production: initialProduction }))
  const [result, setResult] = useState<BuiltPrompt | null>(null)
  const [savedPrompts, setSavedPrompts] = useState<BuiltPrompt[]>(() => read(savedKey, []))

  const setSelections = useCallback((next: PromptSelections | ((current: PromptSelections) => PromptSelections)) => {
    setSelectionsState((current) => {
      const value = typeof next === 'function' ? next(current) : next
      localStorage.setItem(selectionKey, JSON.stringify(value))
      return value
    })
  }, [])

  const updateSelection = useCallback(<K extends keyof PromptSelections>(field: K, value: PromptSelections[K]) => {
    setSelections((current) => ({ ...current, [field]: value }))
  }, [setSelections])

  const savePrompt = useCallback((prompt: BuiltPrompt) => {
    setSavedPrompts((current) => {
      const next = [prompt, ...current.filter((item) => item.id !== prompt.id)]
      localStorage.setItem(savedKey, JSON.stringify(next))
      return next
    })
  }, [])

  return { selections, setSelections, updateSelection, result, setResult, savedPrompts, savePrompt }
}
