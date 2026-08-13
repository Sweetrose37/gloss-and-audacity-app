import { defaultSelections } from '../data/promptOptions'
import type { PromptField, PromptSelections } from '../types'
import { intelligentShake } from '../engine/shakeLogic'
import { buildCollectionVariants } from '../engine/collectionLogic'

export function randomizeSelections(current = defaultSelections, locked = new Set<PromptField>(), intensityLocked = true): PromptSelections {
  return intelligentShake(current, locked, intensityLocked)
}

export function collectionVariants(base: PromptSelections, count: number, varyAdjacent = false) {
  return buildCollectionVariants(base, count, varyAdjacent)
}
