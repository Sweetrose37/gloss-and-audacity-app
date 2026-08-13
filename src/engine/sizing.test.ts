import { describe, expect, it } from 'vitest'
import { dtfGuidance, masterReferences, placementGuides, readabilityChecks, sublimationGuidance } from '../data/production'
import { defaultSelections } from '../data/promptOptions'
import type { BuiltPrompt } from '../types'
import { appendProductionGuidance, aspectRatio, calculateDimensions, promptProductionConsiderations, proportionalResize, requiredPixels, sizingSummary, validateDimensions } from './sizing'

const prompt: BuiltPrompt = {
  id: 'original-prompt',
  title: 'Production Test',
  concept: 'A bold editorial portrait',
  prompt: 'Create an isolated apparel graphic.',
  production: 'DTF',
  selections: {
    ...defaultSelections,
    production: 'DTF',
    intensity: 'Audacious',
    typography: 'Dimensional foreground typography',
    composition: 'layered overlap collage',
    heroMaterial: 'chrome',
    supportMaterial: 'velvet',
    effects: 'gold glitter',
  },
  createdAt: '2026-08-13T12:00:00.000Z',
}

describe('Phase 5 sizing engine', () => {
  it('recognizes 1024 x 1536 as 2:3 portrait at its nominal physical size', () => {
    const result = calculateDimensions(1024, 1536, 300)
    expect(result).not.toBeNull()
    expect(result?.ratio).toBe('2:3')
    expect(result?.orientation).toBe('Portrait')
    expect(result?.printWidth).toBeCloseTo(3.41, 2)
    expect(result?.printHeight).toBeCloseTo(5.12, 2)
  })

  it.each([
    [3000, 4500, 10, 15],
    [3600, 4800, 12, 16],
    [4500, 5400, 15, 18],
    [3600, 3600, 12, 12],
  ])('calculates %i x %i master reference at 300 PPI', (width, height, printWidth, printHeight) => {
    const result = calculateDimensions(width, height, 300)
    expect(result?.printWidth).toBe(printWidth)
    expect(result?.printHeight).toBe(printHeight)
    expect(masterReferences.some((item) => item.width === width && item.height === height)).toBe(true)
  })

  it('updates physical size when PPI changes without altering pixels', () => {
    expect(calculateDimensions(3000, 4500, 150)?.printWidth).toBe(20)
    expect(calculateDimensions(3000, 4500, 300)?.printWidth).toBe(10)
  })

  it('preserves unusual ratios instead of forcing a preset', () => {
    expect(aspectRatio(1100, 1370)).toBe('110:137')
  })

  it('converts inches to required pixels and proportionally resizes either axis', () => {
    expect(requiredPixels(12, 16, 300)).toEqual({ width: 3600, height: 4800 })
    expect(proportionalResize(3000, 4500, 3600, 'width')).toEqual({ width: 3600, height: 5400 })
    expect(proportionalResize(3000, 4500, 6000, 'height')).toEqual({ width: 4000, height: 6000 })
  })

  it('rejects missing, zero, negative, non-finite, and unreasonable values', () => {
    expect(validateDimensions(0, -1, 300)).toHaveLength(2)
    expect(validateDimensions(Number.NaN, 1500, 10)).toHaveLength(2)
    expect(calculateDimensions(100001, 100, 300)).toBeNull()
    expect(requiredPixels(0, 12, 300)).toBeNull()
    expect(proportionalResize(0, 4500, 3600, 'width')).toBeNull()
  })

  it('creates a concise copyable summary', () => {
    const result = calculateDimensions(1024, 1536, 300)!
    expect(sizingSummary(result)).toContain('1024')
    expect(sizingSummary(result)).toContain('2:3 portrait')
    expect(sizingSummary(result)).toContain('3.41')
  })

  it('provides distinct DTF, sublimation, placement, and readability guidance', () => {
    expect(dtfGuidance.join(' ')).toMatch(/transparent background/i)
    expect(sublimationGuidance.join(' ')).toMatch(/edge-to-edge/i)
    expect(placementGuides.map((item) => item.name)).toContain('Adult Left Chest')
    expect(readabilityChecks).toContain('Tiny text')
  })

  it('uses only available prompt metadata for contextual considerations', () => {
    const notes = promptProductionConsiderations(prompt).join(' ')
    expect(notes).toMatch(/transparent isolation/i)
    expect(notes).toMatch(/typography/i)
    expect(notes).toMatch(/surface treatments/i)
    expect(notes).toMatch(/visual density/i)
  })

  it('appends production guidance to a new copy without mutating the original', () => {
    const before = structuredClone(prompt)
    const result = appendProductionGuidance(prompt, calculateDimensions(3000, 4500, 300)!)
    expect(prompt).toEqual(before)
    expect(result.id).not.toBe(prompt.id)
    expect(result.title).toContain('Production Copy')
    expect(result.prompt).toContain(prompt.prompt)
    expect(result.prompt).toMatch(/PRODUCTION CENTER GUIDANCE/i)
  })
})
