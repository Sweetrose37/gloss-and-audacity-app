import { describe, expect, it } from 'vitest'
import { defaultSelections } from '../data/promptOptions'
import type { ProjectState } from '../types'
import { normalizeProject, normalizeSelections } from './normalization'
import { projectFromPrompt } from '../hooks/useLocalProject'

const project: ProjectState = { name: 'Side-Eye Flyby', mode: 'DTF', size: '12 × 16 in', dpi: 300, completedSections: 7, totalSections: 8, selectedMood: 'Boss Energy', selectedPalette: 'Plum Champagne', selectedEffect: 'Gold Glitter', selectedSkinTone: '#7c4329', selectedHair: 'Braids' }

describe('local data normalization', () => {
  it('repairs malformed prompt fields while preserving valid older values', () => {
    const result = normalizeSelections({ phrase: 'KEEP THIS', hair: 42, intensity: 'Impossible', production: 'Unknown' })
    expect(result.phrase).toBe('KEEP THIS')
    expect(result.hair).toBe(defaultSelections.hair)
    expect(result.intensity).toBe('Polished')
    expect(result.production).toBe('DTF')
  })

  it('honors the active production mode while normalizing stored choices', () => {
    expect(normalizeSelections({ production: 'DTF' }, 'Sublimation').production).toBe('Sublimation')
  })

  it('repairs malformed project data without erasing valid preferences', () => {
    const result = normalizeProject({ name: 'My Project', mode: 'invalid', dpi: -1, selectedHair: 'Locs' }, project)
    expect(result.name).toBe('My Project')
    expect(result.mode).toBe('DTF')
    expect(result.dpi).toBe(300)
    expect(result.selectedHair).toBe('Locs')
    expect(normalizeProject([], project)).toEqual(project)
  })

  it('makes a real built prompt the current dashboard project', () => {
    const current = projectFromPrompt(project, {
      id: 'prompt-1', title: 'MY REAL DESIGN', concept: 'A current concept', prompt: 'FULL CURRENT PROMPT', production: 'Sublimation', createdAt: new Date().toISOString(),
      selections: { ...defaultSelections, production: 'Sublimation', mood: 'joyfully maximalist', palette: 'custom coral and teal', effects: 'raised gel details', hair: 'custom loc sculpture', complexion: 'deep neutral ebony complexion' },
    })
    expect(current.name).toBe('MY REAL DESIGN')
    expect(current.mode).toBe('Sublimation')
    expect(current.completedSections).toBe(current.totalSections)
    expect(current.selectedMood).toBe('joyfully maximalist')
    expect(current.selectedHair).toBe('custom loc sculpture')
  })
})
