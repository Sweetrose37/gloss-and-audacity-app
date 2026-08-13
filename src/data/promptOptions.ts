import type { PromptField, PromptSelections } from '../types'
import { characterTraits } from './characters'
import { hairLibrary, describeHair } from './hair'
import { fashionLibrary, describeFashion } from './fashion'
import { compositionLibrary, describeComposition } from './compositions'
import { typographyLibrary, describeTypography } from './typography'
import { paletteLibrary, describePalette } from './palettes'
import { materialLibrary } from './materials'
import { applicationZones, restrainedAccents } from './effects'
import { wildcardPools } from './wildcards'

export interface OptionGroup {
  field: PromptField
  label: string
  helper: string
  options: string[]
  allowCustom?: boolean
}

export const defaultSelections: PromptSelections = {
  concept: 'Unapologetic confidence and protected peace',
  age: characterTraits.ages[1],
  complexion: characterTraits.complexions[1],
  undertone: characterTraits.undertones[2],
  face: characterTraits.faces[0],
  eyes: characterTraits.eyes[0],
  nose: characterTraits.noses[0],
  lips: characterTraits.lips[0],
  cheeks: characterTraits.cheeks[0],
  hair: describeHair(hairLibrary[8]),
  body: characterTraits.bodies[3],
  height: characterTraits.heights[2],
  expression: characterTraits.expressions[0],
  energy: characterTraits.energies[0],
  pose: 'Three-quarter turn looking over her shoulder',
  fashion: describeFashion(fashionLibrary[1]),
  artStyle: 'Polished fashion-editorial digital illustration',
  phrase: 'BUILT DIFFERENT',
  typography: describeTypography(typographyLibrary[0]),
  composition: describeComposition(compositionLibrary[0]),
  palette: describePalette(paletteLibrary[0]),
  effects: 'Metallic gold foil, controlled paint splatter, and subtle halftone grain',
  heroMaterial: 'puff ink',
  supportMaterial: 'distressed ink',
  accentMaterial: 'fine metallic keyline',
  heroZone: 'headline only',
  supportZone: 'selected collage layer',
  accentZone: 'outline',
  visualTwist: wildcardPools.visualTwist[0],
  mood: wildcardPools.mood[1],
  fashionEra: wildcardPools.fashionEra[4],
  surfaceTreatment: wildcardPools.surfaceTreatment[0],
  supportingObject: wildcardPools.supportingObject[0],
  production: 'DTF',
}

export const optionGroups: OptionGroup[] = [
  { field: 'concept', label: 'Concept / Theme', helper: 'What truth or attitude should the design carry?', allowCustom: true, options: ['Unapologetic confidence and protected peace', 'Soft life with immovable standards', 'Ambition dressed in glamour', 'Joy as a radical declaration', 'Minding my business in luxury', 'Legacy, brilliance, and becoming'] },
  { field: 'age', label: 'Woman / Age Direction', helper: 'Choose the life stage that serves the story.', options: characterTraits.ages },
  { field: 'complexion', label: 'Complexion', helper: 'Celebrate the full range of Black beauty.', options: characterTraits.complexions },
  { field: 'undertone', label: 'Undertone', helper: 'Refine how light and color meet the skin.', options: characterTraits.undertones },
  { field: 'face', label: 'Facial Direction', helper: 'Give the character a distinct visual identity.', options: characterTraits.faces },
  { field: 'eyes', label: 'Eye Shape', helper: 'Build a specific, non-default face.', options: characterTraits.eyes },
  { field: 'nose', label: 'Nose Shape', helper: 'Keep facial structure varied and intentional.', options: characterTraits.noses },
  { field: 'lips', label: 'Lip Shape', helper: 'Describe form without stereotyping.', options: characterTraits.lips },
  { field: 'cheeks', label: 'Cheek Structure', helper: 'Complete the facial architecture.', options: characterTraits.cheeks },
  { field: 'hair', label: 'Hairstyle', helper: 'Make texture, roots, gravity, and silhouette intentional.', options: hairLibrary.map(describeHair) },
  { field: 'body', label: 'Body Direction', helper: 'Vary form without making one body the default.', options: characterTraits.bodies },
  { field: 'height', label: 'Height / Silhouette', helper: 'Shape the overall figure proportion.', options: characterTraits.heights },
  { field: 'expression', label: 'Expression', helper: 'Set the emotional temperature.', options: characterTraits.expressions },
  { field: 'energy', label: 'Personality Energy', helper: 'Give the character an inner point of view.', options: characterTraits.energies },
  { field: 'pose', label: 'Pose / Movement', helper: 'Build energy into the silhouette.', options: ['Three-quarter turn looking over her shoulder', 'Power stance with hands at the waist', 'Elegant seated profile with crossed legs', 'Mid-stride with coat sweeping behind her', 'Head tilted upward in quiet triumph', 'Dancing turn with fabric in motion'] },
  { field: 'fashion', label: 'Fashion Direction', helper: 'Dress the concept with a point of view and restrained accessories.', options: fashionLibrary.map(describeFashion) },
  { field: 'artStyle', label: 'Illustration Style', helper: 'Choose the image-making language.', options: ['Polished fashion-editorial digital illustration', 'Expressive hand-painted gouache portrait', 'Crisp retro screen-print illustration', 'Layered mixed-media collage', 'High-contrast ink and halftone portrait', 'Luxe Art Deco poster illustration'] },
  { field: 'phrase', label: 'Exact Phrase', helper: 'Your wording is preserved character-for-character.', allowCustom: true, options: ['BUILT DIFFERENT', 'MINDING MY BUSINESS', 'SOFT LIFE. STRONG MIND.', 'UNBOTHERED BY OPINIONS', 'LEVEL UP LOADING', 'JOY LOOKS GOOD ON ME'] },
  { field: 'typography', label: 'Typography Behavior', helper: 'Decide how exact wording participates in the art.', options: typographyLibrary.map(describeTypography) },
  { field: 'composition', label: 'Composition', helper: 'Control hierarchy, overlap, negative space, and garment readability.', options: compositionLibrary.map(describeComposition) },
  { field: 'palette', label: 'Color Palette', helper: 'Use a curated dominant, support, accent, neutral, and optional metallic.', options: paletteLibrary.map(describePalette) },
  { field: 'effects', label: 'Faux Effects', helper: 'Add finish without sacrificing the artwork.', options: ['Metallic gold foil, controlled paint splatter, and subtle halftone grain', 'Embossed leather texture with restrained gold leaf', 'Pearlescent highlights and soft airbrushed glow', 'Distressed screen-print texture with ink brayer marks', 'Gem-like accents with dimensional gloss', 'Paper collage edges with hand-drawn marks'] },
  { field: 'heroMaterial', label: 'Hero Material', helper: 'One dominant tactile idea.', options: materialLibrary.map((item) => item.name) },
  { field: 'heroZone', label: 'Hero Material Zone', helper: 'Assign the material instead of stacking it everywhere.', options: [...applicationZones] },
  { field: 'supportMaterial', label: 'Supporting Material', helper: 'A quieter material that reinforces the hero.', options: materialLibrary.map((item) => item.name) },
  { field: 'supportZone', label: 'Supporting Zone', helper: 'Keep the support material localized.', options: [...applicationZones] },
  { field: 'accentMaterial', label: 'Restrained Accent', helper: 'One finishing note only.', options: restrainedAccents },
  { field: 'accentZone', label: 'Accent Zone', helper: 'Place the accent with intent.', options: [...applicationZones] },
  { field: 'visualTwist', label: 'Visual Twist', helper: 'Add originality without adding random props.', options: wildcardPools.visualTwist },
  { field: 'mood', label: 'Mood', helper: 'Set the emotional atmosphere.', options: wildcardPools.mood },
  { field: 'fashionEra', label: 'Fashion Era', helper: 'Guide the styling reference without copying culture or brands.', options: wildcardPools.fashionEra },
  { field: 'surfaceTreatment', label: 'Surface Treatment', helper: 'Unify the material finish.', options: wildcardPools.surfaceTreatment },
  { field: 'supportingObject', label: 'Supporting Object', helper: 'Use none or one intentional generic object.', options: wildcardPools.supportingObject },
]

export const collectionSizes = [4, 6, 8, 12]

export const remixOptions = [
  ['strongerConcept', 'Stronger concept'], ['differentCharacter', 'Different character'],
  ['differentArtStyle', 'Different art style'], ['strongerTypography', 'Stronger typography'],
  ['differentComposition', 'Different composition'], ['differentPalette', 'Different palette'],
  ['differentEffects', 'Different effects'], ['dtfOptimization', 'DTF optimization'],
  ['sublimationOptimization', 'Sublimation optimization'], ['moreOriginal', 'Make it more original'],
] as const
