import { beforeEach, describe, expect, it } from 'vitest'
import { characterProfiles } from '../data/characters'
import { hairLibrary } from '../data/hair'
import { fashionLibrary } from '../data/fashion'
import { compositionLibrary } from '../data/compositions'
import { typographyLibrary } from '../data/typography'
import { paletteLibrary } from '../data/palettes'
import { materialLibrary } from '../data/materials'
import { conceptLibrary } from '../data/concepts'
import { defaultSelections } from '../data/promptOptions'
import { composePrompt } from '../services/promptEngine'
import { buildCollectionVariants } from './collectionLogic'
import { ensureCompatible } from './compatibility'
import { resetOriginalityHistory, trackedFields } from './originality'
import { intelligentShake } from './shakeLogic'

describe('Phase 3 creative intelligence', () => {
  beforeEach(resetOriginalityHistory)

  it('contains broad reusable intelligence libraries', () => {
    expect(characterProfiles.length).toBeGreaterThanOrEqual(6)
    expect(new Set(characterProfiles.map((item) => item.age)).size).toBeGreaterThanOrEqual(6)
    expect(hairLibrary.length).toBeGreaterThanOrEqual(15)
    expect(fashionLibrary.length).toBeGreaterThanOrEqual(18)
    expect(compositionLibrary.length).toBeGreaterThanOrEqual(18)
    expect(typographyLibrary.length).toBeGreaterThanOrEqual(19)
    expect(paletteLibrary.length).toBeGreaterThanOrEqual(12)
    expect(materialLibrary.length).toBeGreaterThanOrEqual(35)
    expect(conceptLibrary.some((item) => item.name === 'protected peace')).toBe(true)
  })

  it('rotates character, hair, palette, typography, and fashion across shakes', () => {
    const results = Array.from({ length: 5 }).reduce<typeof defaultSelections[]>((items) => {
      items.push(intelligentShake(items.at(-1) ?? defaultSelections))
      return items
    }, [])
    expect(new Set(results.map((item) => `${item.age}|${item.complexion}|${item.face}|${item.body}`)).size).toBe(5)
    expect(new Set(results.map((item) => item.hair)).size).toBe(5)
    expect(new Set(results.map((item) => item.palette)).size).toBe(5)
    expect(new Set(results.map((item) => item.typography)).size).toBe(5)
    expect(new Set(results.map((item) => item.fashion)).size).toBe(5)
  })

  it('produces compatible hero/support material zoning', () => {
    const incompatible = { ...defaultSelections, heroMaterial: 'velvet', supportMaterial: 'velvet', heroZone: 'headline only', supportZone: 'headline only' }
    const fixed = ensureCompatible(incompatible)
    expect(fixed.supportMaterial).not.toBe(fixed.heroMaterial)
    expect(fixed.supportZone).not.toBe(fixed.heroZone)
  })

  it('makes materials alter art-direction language meaningfully', () => {
    const chrome = composePrompt({ ...defaultSelections, heroMaterial: 'chrome' }).prompt
    const velvet = composePrompt({ ...defaultSelections, heroMaterial: 'velvet' }).prompt
    expect(chrome).toContain('mirror-polished surface')
    expect(velvet).toContain('short directional pile')
    expect(chrome).not.toEqual(velvet)
  })

  it('does not inject common unrequested props or decorative text', () => {
    const prompt = composePrompt({ ...defaultSelections, concept: 'Quiet confidence at work', phrase: 'I KNOW MY VALUE' }).prompt.toLowerCase()
    for (const forbidden of ['crown', 'rose', 'sunglasses', 'handbag', 'random cup', 'tattoo', 'butterfly', 'logo', 'pseudo-text']) {
      if (forbidden === 'pseudo-text') expect(prompt).toContain('no secondary wording')
      else expect(prompt).not.toContain(forbidden)
    }
    expect(prompt.match(/“i know my value”/g)).toHaveLength(1)
  })

  it('keeps repeated shakes away from near-duplicates', () => {
    const first = intelligentShake(defaultSelections)
    const second = intelligentShake(first)
    const same = trackedFields.filter((field) => first[field] === second[field]).length
    expect(same).toBeLessThan(trackedFields.length - 3)
  })

  it('varies major collection dimensions while preserving shared DNA', () => {
    const collection = buildCollectionVariants(defaultSelections, 12)
    expect(collection).toHaveLength(12)
    for (const field of ['hair', 'pose', 'composition', 'fashion', 'typography', 'heroMaterial', 'supportingObject'] as const) {
      expect(new Set(collection.map((item) => item[field])).size).toBeGreaterThan(1)
    }
    collection.forEach((item) => {
      expect(item.concept).toBe(defaultSelections.concept)
      expect(item.palette).toBe(defaultSelections.palette)
      expect(item.artStyle).toBe(defaultSelections.artStyle)
    })
  })

  it('keeps DTF output print-minded', () => {
    const prompt = composePrompt({ ...defaultSelections, production: 'DTF' }).prompt
    for (const cue of ['transparent background', 'cohesive outer silhouette', 'clean printable edges', 'garment-scale readability']) expect(prompt).toContain(cue)
  })
})
