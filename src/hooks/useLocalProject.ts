import { useCallback, useState } from 'react'
import type { BuiltPrompt, ProjectState } from '../types'
import { normalizeProject } from '../utils/normalization'

const storageKey = 'ga-current-project'
const promptStorageKey = 'ga-current-built-prompt'
const initialProject: ProjectState = {
  name: 'No Active Design',
  mode: 'DTF',
  size: '12 × 16 in',
  dpi: 300,
  completedSections: 0,
  totalSections: 8,
  selectedMood: 'Boss Energy',
  selectedPalette: 'Plum Champagne',
  selectedEffect: 'Gold Glitter',
  selectedSkinTone: '#7c4329',
  selectedHair: 'Braids',
}

function readPrompt(): BuiltPrompt | null {
  try {
    const value = JSON.parse(localStorage.getItem(promptStorageKey) || 'null') as BuiltPrompt | null
    return value?.id && value?.title && value?.prompt && value?.selections ? value : null
  } catch { return null }
}

export function projectFromPrompt(current: ProjectState, prompt: BuiltPrompt): ProjectState {
  return {
    ...current,
    name: prompt.title || prompt.concept || 'Untitled Design',
    mode: prompt.production,
    completedSections: current.totalSections,
    selectedMood: prompt.selections.mood,
    selectedPalette: prompt.selections.palette,
    selectedEffect: prompt.selections.effects,
    selectedSkinTone: prompt.selections.complexion,
    selectedHair: prompt.selections.hair,
  }
}

export function useLocalProject() {
  const [project, setProject] = useState<ProjectState>(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      const normalized = saved ? normalizeProject(JSON.parse(saved), initialProject) : initialProject
      return normalized.name === 'Side-Eye Flyby' && !readPrompt() ? { ...normalized, name: initialProject.name, completedSections: 0 } : normalized
    } catch {
      return initialProject
    }
  })
  const [currentPrompt, setCurrentPromptState] = useState<BuiltPrompt | null>(readPrompt)
  const [savedAt, setSavedAt] = useState<string | null>(null)
  const updateProject = useCallback((changes: Partial<ProjectState>) => {
    setProject((current) => { const next = { ...current, ...changes }; try { localStorage.setItem(storageKey, JSON.stringify(next)) } catch { /* Current screen state remains usable. */ } return next })
  }, [])

  const setCurrentPrompt = useCallback((prompt: BuiltPrompt) => {
    setCurrentPromptState(prompt)
    setProject((current) => {
      const next = projectFromPrompt(current, prompt)
      try {
        localStorage.setItem(promptStorageKey, JSON.stringify(prompt))
        localStorage.setItem(storageKey, JSON.stringify(next))
      } catch { /* Current screen state remains usable. */ }
      return next
    })
  }, [])

  const saveProject = useCallback(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(project)); setSavedAt(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })); return true }
    catch { return false }
  }, [project])

  return { project, currentPrompt, setCurrentPrompt, updateProject, saveProject, savedAt }
}
