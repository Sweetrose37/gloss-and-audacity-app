import { defaultSelections } from '../data/promptOptions'
import type { PromptField, PromptSelections } from '../types'
import { intelligentShake } from '../engine/shakeLogic'
import { buildCollectionVariants } from '../engine/collectionLogic'

export function randomizeSelections(current = defaultSelections, locked = new Set<PromptField>()): PromptSelections {
  return intelligentShake(current, locked)
}

export function collectionVariants(base: PromptSelections, count: number) {
  return buildCollectionVariants(base, count)
}
