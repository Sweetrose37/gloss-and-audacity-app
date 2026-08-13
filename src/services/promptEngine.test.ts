import { describe, expect, it } from 'vitest'
import { defaultSelections } from '../data/promptOptions'
import { composeCollection, composeIdeaPrompt, composePrompt, remixPrompt } from './promptEngine'
import { collectionVariants, randomizeSelections } from './randomizer'
import { applyThemeDirection, zodiacThemes } from '../data/themes'

describe('structured prompt engine', () => {
  it('preserves an exact custom phrase and includes every professional section', () => {
    const phrase = 'Soft. Seen. Still Unbothered!'
    const result = composePrompt({ ...defaultSelections, phrase })
    expect(result.prompt).toContain(`“${phrase}”`)
    for (const section of ['CONCEPT', 'CHARACTER', 'COMPOSITION', 'TYPOGRAPHY', 'COLOR', 'EFFECTS', 'PRODUCTION', 'QUALITY SAFEGUARDS']) {
      expect(result.prompt).toContain(`${section} —`)
    }
  })

  it('changes production direction between DTF and sublimation', () => {
    const dtf = composePrompt({ ...defaultSelections, production: 'DTF' }).prompt
    const sublimation = composePrompt({ ...defaultSelections, production: 'Sublimation' }).prompt
    expect(dtf).toContain('transparent background')
    expect(dtf).toContain('clean printable edges')
    expect(sublimation).toContain('edge-to-edge composition')
    expect(sublimation).toContain('atmospheric environment')
    expect(dtf).not.toEqual(sublimation)
  })

  it('preserves a rough idea verbatim', () => {
    const idea = 'Something glamorous about minding my business.'
    expect(composeIdeaPrompt(idea, defaultSelections).prompt).toContain(`“${idea}”`)
  })

  it('preserves the original remix concept unless conceptual change is selected', () => {
    const original = 'A queen protecting her peace under a gold moon.'
    const result = remixPrompt(original, ['differentPalette'], defaultSelections)
    expect(result.prompt).toContain('Preserve the original core concept')
    expect(result.prompt).toContain(original)
  })

  it('keeps locked shake values while changing unlocked choices', () => {
    const next = randomizeSelections(defaultSelections, new Set(['concept', 'hair', 'palette']))
    expect(next.concept).toBe(defaultSelections.concept)
    expect(next.hair).toBe(defaultSelections.hair)
    expect(next.palette).toBe(defaultSelections.palette)
    expect(next.pose).not.toBe(defaultSelections.pose)
  })

  it('builds coordinated collections with distinct creative executions', () => {
    const variants = collectionVariants(defaultSelections, 12)
    const collection = composeCollection(defaultSelections, 12, variants)
    expect(collection).toHaveLength(12)
    expect(new Set(collection.map((item) => item.selections.pose)).size).toBeGreaterThan(1)
    expect(new Set(collection.map((item) => item.prompt)).size).toBe(12)
    collection.forEach((item) => expect(item.prompt).toContain(defaultSelections.palette.toLowerCase()))
  })

  it('builds a zodiac collection without forcing one shared palette', () => {
    const variants = zodiacThemes.map((sign) => applyThemeDirection('zodiac', sign, { ...defaultSelections }, new Set(), () => 0))
    const collection = composeCollection({ ...defaultSelections, concept: 'The Zodiac Embodied' }, 12, variants)
    expect(collection).toHaveLength(12)
    expect(collection[0].title).toMatch(/^Aries/)
    collection.forEach((item, index) => {
      expect(item.prompt).toContain('ZODIAC COLLECTION DNA')
      expect(item.prompt).toContain('Do not impose one shared collection palette')
      expect(item.prompt).toContain('ZODIAC EMBODIMENT')
      expect(item.prompt).toContain(zodiacThemes[index].toUpperCase())
      expect(item.prompt).toContain('MANDATORY SIGNATURE COLOR STORY')
      expect(item.prompt).toContain(item.selections.palette.toLowerCase())
    })
  })

  it('preserves a selected sign palette through a custom collection', () => {
    const scorpio = applyThemeDirection('zodiac', 'Scorpio', { ...defaultSelections }, new Set(), () => 0)
    const collection = composeCollection(scorpio, 4, collectionVariants(scorpio, 4))
    collection.forEach((item) => {
      expect(item.selections.palette).toBe(scorpio.palette)
      expect(item.prompt).toContain('scorpio signature palette')
      expect(item.prompt).toContain('oxblood dominant')
    })
  })
})
