import { useCallback, useState } from 'react'
import type { ProjectState } from '../types'
import { normalizeProject } from '../utils/normalization'

const storageKey = 'ga-current-project'
const initialProject: ProjectState = {
  name: 'Side-Eye Flyby',
  mode: 'DTF',
  size: '12 × 16 in',
  dpi: 300,
  completedSections: 7,
  totalSections: 8,
  selectedMood: 'Boss Energy',
  selectedPalette: 'Plum Champagne',
  selectedEffect: 'Gold Glitter',
  selectedSkinTone: '#7c4329',
  selectedHair: 'Braids',
}

export function useLocalProject() {
  const [project, setProject] = useState<ProjectState>(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      return saved ? normalizeProject(JSON.parse(saved), initialProject) : initialProject
    } catch {
      return initialProject
    }
  })
  const [savedAt, setSavedAt] = useState<string | null>(null)
  const updateProject = useCallback((changes: Partial<ProjectState>) => {
    setProject((current) => { const next = { ...current, ...changes }; try { localStorage.setItem(storageKey, JSON.stringify(next)) } catch { /* Current screen state remains usable. */ } return next })
  }, [])

  const saveProject = useCallback(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(project)); setSavedAt(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })); return true }
    catch { return false }
  }, [project])

  return { project, updateProject, saveProject, savedAt }
}
