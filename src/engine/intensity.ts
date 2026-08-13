import { intensityProfiles } from '../data/intensity'
import { materialLibrary } from '../data/materials'
import type { PromptSelections } from '../types'

export function intensityDirection(selections: PromptSelections) {
  const profile = intensityProfiles[selections.intensity]
  return [`Creative character: ${profile.shortDescription.toLowerCase()}`, profile.composition, profile.typography, profile.fashion, profile.pose, profile.supportingElements, profile.layering, profile.palette, profile.density, profile.negativeSpace, profile.surface].join('. ')
}

export function materialDirection(selections: PromptSelections, describe: (name: string, zone: string) => string) {
  const profile = intensityProfiles[selections.intensity]
  const hero = describe(selections.heroMaterial, selections.heroZone)
  const support = describe(selections.supportMaterial, selections.supportZone)
  const accent = `ACCENT — ${selections.accentMaterial} restricted to the ${selections.accentZone}`
  if (selections.intensity === 'Restrained') return `${profile.materials}. HERO: ${hero}. No additional material zones.`
  if (selections.intensity === 'Polished') return `${profile.materials}. HERO: ${hero}. SUPPORT: ${support}. Omit a separate accent unless needed for print separation.`
  return `${profile.materials}. HERO: ${hero}. SUPPORT: ${support}. ${accent}.`
}

export function audaciousMaterialCandidates() {
  const preferred = new Set(['quilted fabric', 'faux leather', 'patent faux leather', 'chrome', 'velvet', 'flock', 'chenille', 'jelly resin', 'layered paper', 'crystals'])
  return materialLibrary.filter((material) => preferred.has(material.name)).map((material) => material.name)
}
