import type { PromptField, PromptSelections } from '../types'
import { intelligentShake } from './shakeLogic'
import { adjacentIntensity } from '../data/intensity'
import { applyThemeDirection, zodiacThemes } from '../data/themes'
import { applyCollectionAgePlan } from '../data/characters'

const sharedFields = new Set<PromptField>(['concept', 'artStyle', 'palette', 'effects'])

export function buildCollectionVariants(base: PromptSelections, count: number, varyAdjacent = false) {
  const variants: PromptSelections[] = []
  let current = base
  for (let index = 0; index < count; index += 1) {
    current = intelligentShake(current, sharedFields)
    const intensity = varyAdjacent && index > 0
      ? adjacentIntensity(base.intensity, index % 3 === 1 ? -1 : 1)
      : base.intensity
    variants.push({ ...current, concept: base.concept, artStyle: base.artStyle, palette: base.palette, effects: base.effects, production: base.production, intensity })
  }
  return applyCollectionAgePlan(variants)
}

export function isZodiacCollectionBrief(brief: string) {
  return /\b(zodiac|astrolog(?:y|ical)|horoscope|star signs?)\b/i.test(brief)
}

export function buildIndependentCollectionVariants(base: PromptSelections, count: number, brief: string, varyAdjacent = false) {
  if (isZodiacCollectionBrief(brief)) {
    const variants = zodiacThemes.slice(0, count).map((sign, index) => {
      const randomized = intelligentShake(base, new Set())
      const directed = applyThemeDirection('zodiac', sign, randomized)
      return { ...directed, production: base.production, intensity: varyAdjacent && index > 0 ? adjacentIntensity(base.intensity, index % 3 === 1 ? -1 : 1) : base.intensity }
    })
    return applyCollectionAgePlan(variants)
  }

  const variants: PromptSelections[] = []
  let current = base
  for (let index = 0; index < count; index += 1) {
    current = intelligentShake(current, new Set())
    variants.push({
      ...current,
      production: base.production,
      intensity: varyAdjacent && index > 0 ? adjacentIntensity(base.intensity, index % 3 === 1 ? -1 : 1) : base.intensity,
    })
  }
  return applyCollectionAgePlan(variants)
}
