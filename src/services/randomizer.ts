import { defaultSelections, optionGroups } from '../data/promptOptions'
import type { PromptField, PromptSelections } from '../types'

const history = new Set<string>()

function randomOption(field: PromptField, current?: string) {
  const values = optionGroups.find((group) => group.field === field)?.options ?? []
  const alternatives = values.filter((value) => value !== current)
  return alternatives[Math.floor(Math.random() * alternatives.length)] || values[0] || current || ''
}

export function randomizeSelections(current = defaultSelections, locked = new Set<PromptField>()): PromptSelections {
  let next = { ...current }
  for (let attempts = 0; attempts < 20; attempts += 1) {
    const candidate = { ...current }
    for (const group of optionGroups) {
      if (!locked.has(group.field) && group.field !== 'phrase') candidate[group.field] = randomOption(group.field, current[group.field])
    }
    if (!locked.has('phrase')) candidate.phrase = randomOption('phrase', current.phrase)
    candidate.production = current.production
    const signature = Object.values(candidate).join('|')
    next = candidate
    if (!history.has(signature)) { history.add(signature); break }
  }
  return next
}

export function collectionVariants(base: PromptSelections, count: number) {
  const varying = new Set<PromptField>(['age', 'complexion', 'undertone', 'face', 'hair', 'body', 'expression', 'pose', 'fashion', 'phrase', 'typography', 'composition'])
  const locked = new Set<PromptField>(optionGroups.map((group) => group.field).filter((field) => !varying.has(field)))
  const variants: PromptSelections[] = []
  let current = base
  for (let index = 0; index < count; index += 1) {
    current = randomizeSelections(current, locked)
    variants.push({ ...current, concept: base.concept, artStyle: base.artStyle, palette: base.palette, effects: base.effects, production: base.production })
  }
  return variants
}
