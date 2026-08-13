import type { PromptField, PromptSelections } from '../types'

const recentByField = new Map<PromptField, string[]>()
const signatures: string[] = []
const maxRecent = 5

export const trackedFields: PromptField[] = ['age', 'complexion', 'hair', 'fashion', 'pose', 'composition', 'palette', 'typography', 'effects', 'heroMaterial', 'supportMaterial', 'visualTwist', 'phrase', 'mood', 'fashionEra', 'supportingObject']

export function isRecent(field: PromptField, value: string) {
  return recentByField.get(field)?.includes(value) ?? false
}

export function rememberSelections(selections: PromptSelections) {
  trackedFields.forEach((field) => {
    const recent = recentByField.get(field) ?? []
    recentByField.set(field, [selections[field], ...recent.filter((value) => value !== selections[field])].slice(0, maxRecent))
  })
  const signature = selectionSignature(selections)
  signatures.unshift(signature)
  signatures.splice(12)
}

export function selectionSignature(selections: PromptSelections) {
  return trackedFields.map((field) => selections[field]).join('|')
}

export function isNearDuplicate(selections: PromptSelections) {
  const values = trackedFields.map((field) => selections[field])
  return signatures.some((signature) => {
    const previous = signature.split('|')
    const same = values.filter((value, index) => value === previous[index]).length
    return same >= trackedFields.length - 3
  })
}

export function resetOriginalityHistory() {
  recentByField.clear()
  signatures.length = 0
}
