import { beforeEach, describe, expect, it } from 'vitest'
import { characterTraits } from '../data/characters'
import { defaultSelections } from '../data/promptOptions'
import { materialLibrary, describeMaterial } from '../data/materials'
import { composeCollection, composeIdeaPrompt, composePrompt, remixPrompt } from '../services/promptEngine'
import { buildCollectionVariants } from './collectionLogic'
import { allowedSupportingObjects, ensureCompatible } from './compatibility'
import { resetOriginalityHistory, trackedFields } from './originality'
import { intelligentShake } from './shakeLogic'

describe('Phase 6 launch regression', () => {
  beforeEach(resetOriginalityHistory)

  it.each([
    "I'M HERE, & I'M READY.",
    'Soft. Seen. Still Unbothered!',
    'LINE ONE\nLINE TWO',
    'NO.',
    'My Peace Has Boundaries, Period.',
  ])('preserves exact phrase wording once: %s', (phrase) => {
    const result = composePrompt({ ...defaultSelections, phrase })
    expect(result.prompt).toContain(`“${phrase}”`)
    expect(result.prompt.split(`“${phrase}”`)).toHaveLength(2)
    expect(result.prompt).toContain('no decorative pseudo-text or secondary wording')
  })

  it('keeps all creation-mode engines structurally valid and concept-aware', () => {
    const built = composePrompt(defaultSelections)
    const idea = composeIdeaPrompt('A librarian protecting joyful quiet.', defaultSelections)
    const remix = remixPrompt(built.prompt, ['differentComposition', 'moreOriginal'], defaultSelections)
    const collection = composeCollection(defaultSelections, 6, buildCollectionVariants(defaultSelections, 6))
    const shaken = composePrompt(intelligentShake(defaultSelections))
    for (const result of [built, idea, remix, shaken, ...collection]) {
      expect(result.prompt).toMatch(/QUALITY SAFEGUARDS|anatomically credible/)
      expect(result.prompt).toContain('exact phrase')
      expect(result.prompt).toContain('original')
    }
    expect(idea.prompt).toContain('librarian protecting joyful quiet')
    expect(remix.prompt).toContain('ORIGINAL PROMPT')
    expect(new Set(collection.map((item) => item.prompt)).size).toBe(6)
  })

  it('maintains broad Black-women representation libraries without ranking identities', () => {
    expect(characterTraits.ages).toHaveLength(6)
    expect(characterTraits.complexions).toHaveLength(6)
    expect(characterTraits.undertones.length).toBeGreaterThanOrEqual(5)
    expect(characterTraits.faces).toHaveLength(6)
    expect(characterTraits.noses).toHaveLength(6)
    expect(characterTraits.bodies.length).toBeGreaterThanOrEqual(7)
    expect(characterTraits.expressions.length).toBeGreaterThanOrEqual(7)
    const language = Object.values(characterTraits).flat().join(' ').toLowerCase()
    expect(language).not.toMatch(/more authentic|less authentic|ideal black|real black/)
  })

  it('requires supporting objects to be allowed and concept-driven', () => {
    const ordinary = allowedSupportingObjects({ ...defaultSelections, concept: 'quiet confidence', phrase: 'MY OWN PACE' })
    for (const shortcut of ['crown', 'butterfly', 'rose', 'handbag', 'sunglasses']) expect(ordinary.join(' ').toLowerCase()).not.toContain(shortcut)
    const requested = ensureCompatible({ ...defaultSelections, concept: 'A butterfly as a transformation metaphor', supportingObject: 'one abstract butterfly silhouette' })
    expect(requested.supportingObject).toContain('butterfly')
  })

  it('describes materials through surface, edge, depth, light, color, and zone', () => {
    const names = ['velvet', 'flock', 'chenille', 'rhinestones', 'sequins', 'chrome', 'cut paper', 'satin', 'taffeta', 'jelly resin', 'puff ink', 'distressed ink']
    for (const name of names) {
      const material = materialLibrary.find((item) => item.name === name)
      expect(material, `missing material ${name}`).toBeDefined()
      const direction = describeMaterial(material!, 'plum and gold', 'headline only')
      for (const dimension of ['SURFACE', 'EDGE', 'DEPTH', 'LIGHT', 'COLOR', 'APPLICATION ZONE']) expect(direction).toContain(`${dimension} —`)
    }
  })

  it('produces repeated compatible Shake results without near-duplicate collapse', () => {
    const results = Array.from({ length: 12 }).reduce<typeof defaultSelections[]>((items) => {
      items.push(intelligentShake(items.at(-1) ?? defaultSelections))
      return items
    }, [])
    for (const field of ['age', 'complexion', 'hair', 'fashion', 'pose', 'composition', 'palette', 'typography', 'heroMaterial', 'supportMaterial', 'supportingObject'] as const) {
      expect(new Set(results.map((item) => item[field])).size, field).toBeGreaterThan(1)
    }
    results.forEach((result, index) => {
      if (index === 0) return
      const previous = results[index - 1]
      const same = trackedFields.filter((field) => previous[field] === result[field]).length
      expect(same).toBeLessThan(trackedFields.length - 3)
      expect(result.heroMaterial).not.toBe(result.supportMaterial)
    })
  })

  it.each([4, 6, 8, 12])('builds a coherent but varied %i-prompt collection', (count) => {
    const variants = buildCollectionVariants(defaultSelections, count)
    const collection = composeCollection(defaultSelections, count, variants)
    expect(collection).toHaveLength(count)
    expect(new Set(collection.map((item) => item.selections.palette))).toEqual(new Set([defaultSelections.palette]))
    expect(new Set(collection.map((item) => item.selections.pose)).size).toBeGreaterThan(1)
    expect(new Set(collection.map((item) => item.selections.composition)).size).toBeGreaterThan(1)
    expect(new Set(collection.map((item) => item.selections.hair)).size).toBeGreaterThan(1)
  })
})
