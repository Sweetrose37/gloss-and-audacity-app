import type { CreativeIntensity } from '../../types'

export interface IntensityProfile {
  level: CreativeIntensity
  shortDescription: string
  composition: string
  typography: string
  materials: string
  fashion: string
  pose: string
  supportingElements: string
  layering: string
  palette: string
  density: string
  negativeSpace: string
  surface: string
}

export const intensityLevels: CreativeIntensity[] = ['Restrained', 'Polished', 'Bold', 'Extra', 'Audacious']

export const intensityProfiles: Record<CreativeIntensity, IntensityProfile> = {
  Restrained: {
    level: 'Restrained', shortDescription: 'Sophisticated minimalism',
    composition: 'Use a clean composition with one unmistakable focal point and minimal overlap',
    typography: 'Keep type interaction subtle, precisely aligned, and elegantly scaled',
    materials: 'Use one primary material or effect maximum; omit supporting and accent materials',
    fashion: 'Keep styling restrained, sharply edited, and quietly expensive',
    pose: 'Favor composed gesture over theatrical movement',
    supportingElements: 'Use zero or one small concept-essential supporting element',
    layering: 'Limit the artwork to two clear depth planes',
    palette: 'Control the palette tightly with measured contrast and one accent',
    density: 'Maintain low visual density without feeling sparse or unfinished',
    negativeSpace: 'Make generous negative space an active luxury design element',
    surface: 'Use little or no decoration beyond the single tactile focal treatment',
  },
  Polished: {
    level: 'Polished', shortDescription: 'Refined editorial richness',
    composition: 'Use balanced editorial layering with a clear primary and secondary hierarchy',
    typography: 'Use sophisticated character/type interaction at a confident but controlled scale',
    materials: 'Use one hero material plus one restrained supporting treatment',
    fashion: 'Strengthen the styling with refined construction and a deliberate editorial finish',
    pose: 'Use confident natural movement with controlled gesture',
    supportingElements: 'Use one or two controlled, concept-relevant supporting details',
    layering: 'Use two to three orderly depth planes',
    palette: 'Balance rich color interest with disciplined contrast',
    density: 'Maintain medium-low visual density and an easy reading path',
    negativeSpace: 'Preserve purposeful breathing room around the face and exact phrase',
    surface: 'Use subtle dimension with no competing finish zones',
  },
  Bold: {
    level: 'Bold', shortDescription: 'High-impact fashion direction',
    composition: 'Increase compositional drama through decisive scale, stronger overlap, and directional movement',
    typography: 'Enlarge the exact phrase and increase its structural interaction with the character',
    materials: 'Use one hero material, one supporting material, and an optional restrained accent',
    fashion: 'Increase silhouette strength and runway-level styling impact',
    pose: 'Use a more dynamic pose with a clear line of action',
    supportingElements: 'Use one to three purposeful supporting elements that reinforce the concept',
    layering: 'Use three distinct depth planes with clean occlusion',
    palette: 'Increase value and hue contrast while retaining a controlled palette',
    density: 'Use medium visual density with strong hierarchy',
    negativeSpace: 'Use shaped negative space to intensify movement and readability',
    surface: 'Let dimensional materials create one dramatic focal contrast',
  },
  Extra: {
    level: 'Extra', shortDescription: 'Controlled maximalism',
    composition: 'Build an energetic layered composition with dramatic scale shifts and coordinated movement',
    typography: 'Use oversized integrated typography with assertive foreground and background interaction',
    materials: 'Use two to three significant material or effect zones plus one restrained accent',
    fashion: 'Push fashion into dramatic statement styling with purposeful construction detail',
    pose: 'Use expressive movement that activates the whole silhouette',
    supportingElements: 'Allow multiple coordinated supporting graphic elements, each tied directly to the concept',
    layering: 'Use three to four controlled depth planes with a dominant reading order',
    palette: 'Use heightened contrast and more active accent placement without exceeding the curated palette',
    density: 'Use medium-high visual density while protecting the face, phrase, and outer silhouette',
    negativeSpace: 'Retain deliberate pockets of negative space between visual clusters',
    surface: 'Combine unexpected but compatible tactile surfaces with disciplined zoning',
  },
  Audacious: {
    level: 'Audacious', shortDescription: 'Premium maximalist wearable art',
    composition: 'Create an unconventional but coherent fashion-art composition with complex foreground/background interaction and one dominant concept',
    typography: 'Make the exact phrase enormous and structurally integrated, allowing complex Human Typography or architectural letter interaction without losing a single word',
    materials: 'Use three strongly identified, contrastive material zones with one restrained finishing accent',
    fashion: 'Use sculptural, highly constructed fashion with bold material identity and editorial authority',
    pose: 'Use a dramatic believable pose that creates a powerful compositional framework',
    supportingElements: 'Allow a rich coordinated supporting environment inside the graphic only when every element advances the central concept',
    layering: 'Use four or more sophisticated depth planes with clean, intentional occlusion',
    palette: 'Use bold material and value contrasts inside one tightly controlled curated palette',
    density: 'Allow high visual density, but maintain immediate hierarchy, garment-scale readability, and a cohesive outer silhouette',
    negativeSpace: 'Carve strategic negative space around anatomy, exact lettering, and material boundaries',
    surface: 'Engineer dramatic dimensional contrast through padded, plush, leather-like, metallic, resin-like, paper, or crystal simulation selected from the user’s material plan',
  },
}

export function adjacentIntensity(level: CreativeIntensity, offset: -1 | 1): CreativeIntensity {
  const index = intensityLevels.indexOf(level)
  return intensityLevels[Math.max(0, Math.min(intensityLevels.length - 1, index + offset))]
}
