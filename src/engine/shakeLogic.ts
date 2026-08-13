import { optionGroups } from '../data/promptOptions'
import type { PromptField, PromptSelections } from '../types'
import { ensureCompatible } from './compatibility'
import { isNearDuplicate, isRecent, rememberSelections } from './originality'
import { intensityLevels } from '../data/intensity'
import type { CreativeIntensity } from '../types'
import { applyCreativeDirection } from './creativeDirector'
import { chooseBalancedAge } from '../data/characters'

function choose(field: PromptField, current: string) {
  if (field === 'age') return chooseBalancedAge(current)
  const group = optionGroups.find((item) => item.field === field)
  const values = group?.randomOptions ?? group?.options ?? []
  const fresh = values.filter((value) => value !== current && !isRecent(field, value))
  const pool = fresh.length ? fresh : values.filter((value) => value !== current)
  return pool[Math.floor(Math.random() * pool.length)] || current
}

export function intelligentShake(current: PromptSelections, locked = new Set<PromptField>(), intensityLocked = true) {
  let candidate = { ...current }
  for (let attempt = 0; attempt < 30; attempt += 1) {
    candidate = { ...current }
    optionGroups.forEach(({ field }) => { if (!locked.has(field)) candidate[field] = choose(field, current[field]) })
    candidate.production = current.production
    if (!intensityLocked) {
      const choices = intensityLevels.filter((level) => level !== current.intensity)
      candidate.intensity = choices[Math.floor(Math.random() * choices.length)] as CreativeIntensity
    }
    candidate = applyCreativeDirection(candidate, locked)
    candidate = ensureCompatible(candidate)
    if (!isNearDuplicate(candidate)) break
  }
  rememberSelections(candidate)
  return candidate
}
