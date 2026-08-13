import type { PromptField, PromptSelections } from '../types'
import { intelligentShake } from './shakeLogic'

const sharedFields = new Set<PromptField>(['concept', 'artStyle', 'palette', 'effects'])

export function buildCollectionVariants(base: PromptSelections, count: number) {
  const variants: PromptSelections[] = []
  let current = base
  for (let index = 0; index < count; index += 1) {
    current = intelligentShake(current, sharedFields)
    variants.push({ ...current, concept: base.concept, artStyle: base.artStyle, palette: base.palette, effects: base.effects, production: base.production })
  }
  return variants
}
