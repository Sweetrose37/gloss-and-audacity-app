import { useCallback, useEffect, useState } from 'react'
import type { ProjectState } from '../types'

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
}

export function useLocalProject() {
  const [project, setProject] = useState<ProjectState>(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      return saved ? { ...initialProject, ...JSON.parse(saved) } : initialProject
    } catch {
      return initialProject
    }
  })
  const [savedAt, setSavedAt] = useState<string | null>(null)

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(project))
  }, [project])

  const updateProject = useCallback((changes: Partial<ProjectState>) => {
    setProject((current) => ({ ...current, ...changes }))
  }, [])

  const saveProject = useCallback(() => {
    localStorage.setItem(storageKey, JSON.stringify(project))
    setSavedAt(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }))
  }, [project])

  return { project, updateProject, saveProject, savedAt }
}
