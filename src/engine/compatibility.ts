import { materialLibrary } from '../data/materials'
import { restrictedElements, wildcardPools } from '../data/wildcards'
import type { PromptSelections } from '../types'

const allowedContextWords: Record<string, string[]> = {
  crown: ['crown', 'royal', 'queen', 'regal'], roses: ['rose', 'floral', 'garden'], sunglasses: ['sunglasses', 'shades', 'eyewear'],
  handbag: ['handbag', 'purse', 'bag'], cup: ['cup', 'coffee', 'tea'], tattoo: ['tattoo', 'inked'], butterfly: ['butterfly', 'transformation'],
  jewelry: ['jewelry', 'jewelled', 'bejeweled'], logo: ['logo', 'brand mark'], slogan: ['slogan', 'secondary phrase'],
}

export function userRequested(term: string, selections: PromptSelections) {
  const source = `${selections.concept} ${selections.phrase} ${selections.supportingObject}`.toLowerCase()
  const root = term.replace(/s$/, '')
  const cues = allowedContextWords[root] ?? [root]
  return cues.some((cue) => source.includes(cue))
}

export function allowedSupportingObjects(selections: PromptSelections) {
  return wildcardPools.supportingObject.filter((object) => {
    const lower = object.toLowerCase()
    return !restrictedElements.some((term) => lower.includes(term.replace(/s$/, ''))) || userRequested(object, selections)
  })
}

export function ensureCompatible(selections: PromptSelections): PromptSelections {
  const next = { ...selections }
  const hero = materialLibrary.find((item) => item.name === next.heroMaterial)
  const support = materialLibrary.find((item) => item.name === next.supportMaterial)
  if (next.heroMaterial === next.supportMaterial || (hero && support && hero.family === support.family)) {
    const alternative = materialLibrary.find((item) => item.family !== hero?.family && item.name !== next.heroMaterial)
    if (alternative) next.supportMaterial = alternative.name
  }
  if (next.heroZone === next.supportZone) next.supportZone = next.heroZone === 'headline only' ? 'selected collage layer' : 'headline only'
  const objects = allowedSupportingObjects(next)
  const objectText = next.supportingObject.toLowerCase()
  const requestedRestrictedObject = restrictedElements.some((term) => objectText.includes(term.replace(/s$/, '')) && userRequested(term, next))
  if (!objects.includes(next.supportingObject) && !requestedRestrictedObject) next.supportingObject = 'none'
  return next
}

export function noUnrequestedElements(selections: PromptSelections) {
  const blocked = restrictedElements.filter((term) => !userRequested(term, selections))
  return blocked.length ? 'Do not introduce unrequested decorative accessories, flora, status symbols, body markings, branded items, lifestyle props, or text-bearing objects. Any supporting object must be generic, intentional, and concept-essential.' : 'Use only the specifically requested supporting elements, keeping each intentional and concept-essential.'
}
