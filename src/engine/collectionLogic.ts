import type { PromptField, PromptSelections } from '../types'
import { intelligentShake } from './shakeLogic'
import { adjacentIntensity } from '../data/intensity'

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
  return variants
}
