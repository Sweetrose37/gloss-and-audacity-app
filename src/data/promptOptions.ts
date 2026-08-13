import type { PromptField, PromptSelections } from '../types'

export interface OptionGroup {
  field: PromptField
  label: string
  helper: string
  options: string[]
  allowCustom?: boolean
}

export const defaultSelections: PromptSelections = {
  concept: 'Unapologetic confidence and protected peace',
  age: 'Confident woman in her 30s',
  complexion: 'Rich deep-brown complexion',
  undertone: 'Warm golden undertone',
  face: 'Sculpted oval face with expressive eyes',
  hair: 'Sculptural braided high bun',
  body: 'Full-figured, statuesque silhouette',
  expression: 'Knowing side-eye with a composed half-smile',
  pose: 'Three-quarter turn looking over her shoulder',
  fashion: 'Luxury black leather street couture with gold jewelry',
  artStyle: 'Polished fashion-editorial digital illustration',
  phrase: 'BUILT DIFFERENT',
  typography: 'Oversized stacked dimensional lettering behind and across the subject',
  composition: 'Centered garment graphic with a strong triangular silhouette',
  palette: 'Black, deep plum, hot pink, champagne gold, and warm ivory',
  effects: 'Metallic gold foil, controlled paint splatter, and subtle halftone grain',
  production: 'DTF',
}

export const optionGroups: OptionGroup[] = [
  { field: 'concept', label: 'Concept / Theme', helper: 'What truth or attitude should the design carry?', allowCustom: true, options: ['Unapologetic confidence and protected peace', 'Soft life with immovable standards', 'Ambition dressed in glamour', 'Joy as a radical declaration', 'Minding my business in luxury', 'Legacy, brilliance, and becoming'] },
  { field: 'age', label: 'Woman / Age Direction', helper: 'Choose the life stage that serves the story.', options: ['Radiant woman in her 20s', 'Confident woman in her 30s', 'Self-possessed woman in her 40s', 'Elegant mature woman in her 50s', 'Regal silver-haired woman in her 60s'] },
  { field: 'complexion', label: 'Complexion', helper: 'Celebrate the full range of Black beauty.', options: ['Deep ebony complexion', 'Rich deep-brown complexion', 'Warm mahogany complexion', 'Golden-brown complexion', 'Caramel complexion', 'Light brown complexion with freckles'] },
  { field: 'undertone', label: 'Undertone', helper: 'Refine how light and color meet the skin.', options: ['Cool blue-red undertone', 'Neutral undertone', 'Warm golden undertone', 'Rich red undertone', 'Warm olive undertone'] },
  { field: 'face', label: 'Facial Direction', helper: 'Give the character a distinct visual identity.', options: ['Sculpted oval face with expressive eyes', 'Soft round face with full cheeks', 'Angular heart-shaped face with high cheekbones', 'Long elegant face with a strong jaw', 'Broad cheekbones with a softly squared jaw'] },
  { field: 'hair', label: 'Hairstyle', helper: 'Make texture and silhouette intentional.', options: ['Sculptural braided high bun', 'Voluminous natural afro', 'Waist-length knotless braids', 'Defined coily wash-and-go', 'Regal loc updo with gold cuffs', 'Close tapered natural cut', 'Glossy finger waves', 'Full twist-out with dramatic shape'] },
  { field: 'body', label: 'Body Direction', helper: 'Vary form without making one body the default.', options: ['Petite, delicately framed silhouette', 'Athletic, powerful silhouette', 'Soft mid-size hourglass silhouette', 'Full-figured, statuesque silhouette', 'Tall, lean editorial silhouette', 'Broad-shouldered, strong silhouette'] },
  { field: 'expression', label: 'Expression', helper: 'Set the emotional temperature.', options: ['Knowing side-eye with a composed half-smile', 'Warm, radiant open smile', 'Serene closed-eye confidence', 'Direct, commanding gaze', 'Playful raised brow', 'Joyful uninhibited laugh'] },
  { field: 'pose', label: 'Pose / Movement', helper: 'Build energy into the silhouette.', options: ['Three-quarter turn looking over her shoulder', 'Power stance with hands at the waist', 'Elegant seated profile with crossed legs', 'Mid-stride with coat sweeping behind her', 'Head tilted upward in quiet triumph', 'Dancing turn with fabric in motion'] },
  { field: 'fashion', label: 'Fashion Direction', helper: 'Dress the concept with a point of view.', options: ['Luxury black leather street couture with gold jewelry', 'Romantic blush tailoring with pearl details', 'Sculptural monochrome eveningwear', 'Elevated streetwear with graphic layering', 'Afrofuturist metallic couture', 'Bohemian maximalism with artisan jewelry'] },
  { field: 'artStyle', label: 'Illustration Style', helper: 'Choose the image-making language.', options: ['Polished fashion-editorial digital illustration', 'Expressive hand-painted gouache portrait', 'Crisp retro screen-print illustration', 'Layered mixed-media collage', 'High-contrast ink and halftone portrait', 'Luxe Art Deco poster illustration'] },
  { field: 'phrase', label: 'Exact Phrase', helper: 'Your wording is preserved character-for-character.', allowCustom: true, options: ['BUILT DIFFERENT', 'MINDING MY BUSINESS', 'SOFT LIFE. STRONG MIND.', 'UNBOTHERED BY OPINIONS', 'LEVEL UP LOADING', 'JOY LOOKS GOOD ON ME'] },
  { field: 'typography', label: 'Typography Behavior', helper: 'Decide how type participates in the art.', options: ['Oversized stacked dimensional lettering behind and across the subject', 'Curved type wrapping around the silhouette', 'Integrated Human Typography formed through pose and negative space', 'Tall vertical type architecture beside the character', 'Editorial subhead layered beneath oversized background type', 'Letterforms weaving between hair, jewelry, and clothing', 'Foreground phrase overlapping the lower portrait', 'Decorative type framing the entire composition'] },
  { field: 'composition', label: 'Composition', helper: 'Control hierarchy and garment readability.', options: ['Centered garment graphic with a strong triangular silhouette', 'Asymmetrical editorial crop with active negative space', 'Circular badge composition with layered depth', 'Tall vertical poster composition', 'Dynamic diagonal composition with directional movement', 'Portrait framed by ornamental supporting elements'] },
  { field: 'palette', label: 'Color Palette', helper: 'Keep the color story focused and printable.', options: ['Black, deep plum, hot pink, champagne gold, and warm ivory', 'Espresso, terracotta, burnished gold, and cream', 'Onyx, emerald, antique gold, and bone', 'Chocolate, blush pink, oxblood, and pearl', 'Midnight navy, cobalt, copper, and warm white', 'Monochrome black and ivory with one hot-pink accent'] },
  { field: 'effects', label: 'Faux Effects', helper: 'Add finish without sacrificing the artwork.', options: ['Metallic gold foil, controlled paint splatter, and subtle halftone grain', 'Embossed leather texture with restrained gold leaf', 'Pearlescent highlights and soft airbrushed glow', 'Distressed screen-print texture with ink brayer marks', 'Gem-like accents with dimensional gloss', 'Paper collage edges with hand-drawn marks'] },
]

export const collectionSizes = [4, 6, 8, 12]

export const remixOptions = [
  ['strongerConcept', 'Stronger concept'], ['differentCharacter', 'Different character'],
  ['differentArtStyle', 'Different art style'], ['strongerTypography', 'Stronger typography'],
  ['differentComposition', 'Different composition'], ['differentPalette', 'Different palette'],
  ['differentEffects', 'Different effects'], ['dtfOptimization', 'DTF optimization'],
  ['sublimationOptimization', 'Sublimation optimization'], ['moreOriginal', 'Make it more original'],
] as const
