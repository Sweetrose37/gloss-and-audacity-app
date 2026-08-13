import { describe, expect, it } from 'vitest'
import { intensityLevels } from '../data/intensity'
import { defaultSelections } from '../data/promptOptions'
import { composePrompt } from '../services/promptEngine'
import { buildCollectionVariants } from './collectionLogic'
import { intelligentShake } from './shakeLogic'

const phrase = 'MY PEACE HAS A DRESS CODE'
const base = { ...defaultSelections, concept: 'Quiet confidence protected through intentional boundaries', phrase, production: 'DTF' as const }

describe('Creative Intensity engine', () => {
  const prompts = intensityLevels.map((intensity) => composePrompt({ ...base, intensity }))

  it('produces five meaningfully different directions from one concept', () => {
    expect(new Set(prompts.map((result) => result.prompt)).size).toBe(5)
    prompts.forEach((result) => {
      expect(result.concept).toBe(base.concept)
      expect(result.prompt.match(new RegExp(`“${phrase}”`, 'g'))).toHaveLength(1)
      expect(result.prompt).toContain('anatomically credible')
      expect(result.prompt).toContain('transparent background')
      expect(result.prompt).toContain('garment-scale readability')
    })
  })

  it('keeps Restrained premium and limited to one material zone', () => {
    const prompt = prompts[0].prompt
    expect(prompt).toContain('generous negative space')
    expect(prompt).toContain('quietly expensive')
    expect(prompt).toContain('one primary material or effect maximum')
    expect(prompt).toContain('No additional material zones')
    expect(prompt).not.toContain('SUPPORT:')
  })

  it('uses the Polished one-hero plus one-support default', () => {
    const prompt = prompts[1].prompt
    expect(defaultSelections.intensity).toBe('Polished')
    expect(prompt).toContain('one hero material plus one restrained supporting treatment')
    expect(prompt).toContain('HERO:')
    expect(prompt).toContain('SUPPORT:')
  })

  it('increases composition, typography, and material behavior at Bold and Extra', () => {
    expect(prompts[2].prompt).toContain('stronger overlap')
    expect(prompts[2].prompt).toContain('Enlarge the exact phrase')
    expect(prompts[2].prompt).toContain('optional restrained accent')
    expect(prompts[3].prompt).toContain('controlled maximalism')
    expect(prompts[3].prompt).toContain('two to three significant material or effect zones')
    expect(prompts[3].prompt).toContain('three to four controlled depth planes')
  })

  it('makes Audacious extravagant but readable and intentional', () => {
    const prompt = prompts[4].prompt
    expect(prompt).toContain('premium maximalist wearable art')
    expect(prompt).toContain('enormous and structurally integrated')
    expect(prompt).toContain('three strongly identified, contrastive material zones')
    expect(prompt).toContain('one dominant concept')
    expect(prompt).toContain('garment-scale readability')
    expect(prompt).toContain('controlled curated palette')
  })

  it('never injects prohibited random props at any level', () => {
    prompts.forEach(({ prompt }) => {
      const lower = prompt.toLowerCase()
      for (const prop of ['crown', 'rose', 'butterfly', 'sunglasses', 'handbag', 'tattoo', 'lipstick', 'random jewelry', 'random slogan']) expect(lower).not.toContain(prop)
    })
  })

  it('keeps collections at one intensity or adjacent levels only', () => {
    const fixed = buildCollectionVariants({ ...base, intensity: 'Bold' }, 8)
    expect(new Set(fixed.map((item) => item.intensity))).toEqual(new Set(['Bold']))
    const varied = buildCollectionVariants({ ...base, intensity: 'Bold' }, 8, true)
    expect(new Set(varied.map((item) => item.intensity))).toEqual(new Set(['Bold', 'Polished', 'Extra']))
    expect(varied.some((item) => item.intensity === 'Restrained' || item.intensity === 'Audacious')).toBe(false)
  })

  it('lets Shake vary unlocked intensity and preserves locked intensity', () => {
    const unlocked = intelligentShake(base, new Set(), false)
    expect(unlocked.intensity).not.toBe(base.intensity)
    const locked = intelligentShake(base, new Set(), true)
    expect(locked.intensity).toBe(base.intensity)
  })

  it('keeps sublimation requirements intact at every intensity', () => {
    intensityLevels.forEach((intensity) => {
      const prompt = composePrompt({ ...base, intensity, production: 'Sublimation' }).prompt
      expect(prompt).toContain('edge-to-edge composition')
      expect(prompt).toContain('atmospheric environment')
    })
  })
})
