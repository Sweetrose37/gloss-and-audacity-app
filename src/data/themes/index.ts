import type { PromptField, PromptSelections } from '../../types'

export type ThemeCategory = 'holidays' | 'zodiac'

export const holidayThemes = [
  "New Year's Day", 'Martin Luther King Jr. Day', 'Lunar New Year', 'Black History Month',
  "Valentine's Day", 'Mardi Gras / Carnival', "International Women's Day", "St. Patrick's Day",
  'Ramadan', 'Eid al-Fitr', 'Easter', 'Earth Day', "Mother's Day", 'Memorial Day',
  'Pride Month', "Father's Day", 'Juneteenth', 'Independence Day', 'Labor Day',
  "Grandparents' Day", 'Hispanic Heritage Month', "Indigenous Peoples' Day", 'Breast Cancer Awareness Month',
  'Halloween', 'Diwali', "Veterans Day", 'Thanksgiving', 'Hanukkah', 'Christmas', 'Kwanzaa',
  "New Year's Eve",
] as const

export const zodiacThemes = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
] as const

export type ZodiacSign = typeof zodiacThemes[number]

export const themeOptions: Record<ThemeCategory, readonly string[]> = {
  holidays: holidayThemes,
  zodiac: zodiacThemes,
}

interface ZodiacLook {
  fashion: string
  typography: string
  artStyle: string
  palette: string
  mood: string
  visualTwist: string
}

export interface ZodiacProfile {
  concept: string
  phrases: readonly string[]
  looks: readonly ZodiacLook[]
}

interface ZodiacEssence {
  element: string
  colors: string
  embodiment: readonly string[]
}

export const zodiacEssences: Record<ZodiacSign, ZodiacEssence> = {
  Aries: { element: 'cardinal fire', colors: 'vermilion red dominant, hot coral support, black grounding, and molten gold accents', embodiment: ['shape her braided hair and shoulder silhouette into abstract ram-horn arcs while fire ribbons launch from her stride', 'make her emerge as living ignition, with ember skin-light, a charging silhouette, and a ram form readable in negative space', 'transform her moto seams and cast shadow into a fearless ram profile surrounded by directional sparks'] },
  Taurus: { element: 'fixed earth', colors: 'emerald green dominant, rich cocoa support, rose quartz accent, and antique copper highlights', embodiment: ['make her grounded stance become a lush sculptural landscape while curved hair and shoulders suggest bull strength', 'merge velvet texture, botanical growth, and an abstract bull silhouette into one serene living monument', 'let her become an earth guardian whose shadow forms powerful horns and whose garment roots into ornamental terrain'] },
  Gemini: { element: 'mutable air', colors: 'luminous yellow dominant, electric cyan support, coral accent, and graphic black', embodiment: ['show two expressive aspects of the same woman in one anatomy-safe split portrait, connected by ribbons of conversation', 'make one heroine transform between mirrored fashion identities while airborne typography completes the twin illusion', 'use a double-exposure profile and reversible silhouette so she visibly embodies duality rather than standing beside twin symbols'] },
  Cancer: { element: 'cardinal water', colors: 'pearl white dominant, moon-silver support, midnight indigo depth, and shell-pink accents', embodiment: ['turn her cocoon silhouette into luminous protective shell architecture while a tidal halo moves around her', 'make her the guardian of a moonlit inner world, with water and pearl armor growing from the figure', 'let her cape and shadow form an abstract crab-like sanctuary without placing a separate crab illustration'] },
  Leo: { element: 'fixed fire', colors: 'solar gold dominant, saturated orange support, royal magenta accent, and deep burgundy shadow', embodiment: ['make her natural hair expand as a magnificent solar mane with a face-centered burst of warm rays', 'transform her cape, hair, and shadow into one regal lion-energy silhouette while she remains unmistakably human', 'portray her as a living sun whose sculptural gown radiates theatrical lionlike power through shape and light'] },
  Virgo: { element: 'mutable earth', colors: 'sage green dominant, olive support, warm cream field, and terracotta-gold detail', embodiment: ['build her from elegant botanical diagrams, tailoring measurements, and harvest geometry that resolve into a precise heroine', 'make her body anchor an ordered living garden where garment seams become meticulous leaf and grain systems', 'portray her as intelligent earth made visible, surrounded by precise organic patterns rather than a maiden icon'] },
  Libra: { element: 'cardinal air', colors: 'dusty blush dominant, airy lavender support, powder blue accent, and rose-gold balance points', embodiment: ['balance two unequal halves of her draped silhouette so her entire pose functions as living scales', 'make fabric, arms, and negative space create a poised equilibrium symbol around the heroine', 'portray her as embodied harmony, with mirrored atmosphere and asymmetrical fashion achieving perfect visual balance'] },
  Scorpio: { element: 'fixed water', colors: 'oxblood dominant, ink black support, ultraviolet plum depth, and electric crimson accents', embodiment: ['transform her liquid-leather train and shadow into a sweeping scorpion-tail curve while her gaze remains the focal point', 'show her emerging through a jewel-dark molt, embodying secrecy, survival, and rebirth rather than wearing a sign costume', 'make her silhouette shift from armored darkness into luminous wings and a subtle scorpion form at the outer contour'] },
  Sagittarius: { element: 'mutable fire', colors: 'cobalt blue dominant, royal purple support, saffron-gold accent, and bright turquoise flashes', embodiment: ['make her full-body motion become a living arrow, with coat, gaze, and typography all aimed beyond the frame', 'portray her as a celestial archer through pose and sweeping light trails without placing a separate bow prop', 'turn her travel silhouette into a horizon-crossing centaur-inspired rhythm using fabric and shadow, never hybrid anatomy'] },
  Capricorn: { element: 'cardinal earth', colors: 'charcoal dominant, espresso support, forest green depth, and antique gold highlights', embodiment: ['make her architectural silhouette rise like a mountain summit while an abstract sea-goat curve lives in the coat hem', 'portray her as the builder and the mountain, with tailored planes ascending into monumental terrain', 'let her grounded stance, cape, and reflection create a disciplined climb from deep water to a gilded peak'] },
  Aquarius: { element: 'fixed air', colors: 'electric cyan dominant, ultramarine support, ultraviolet accent, and liquid silver highlights', embodiment: ['make streams of ideas and color pour from her hands and modular garment as futuristic airborne ribbons', 'portray her as a human transmitter of the future, with wave patterns, floating fashion modules, and community light', 'turn her silhouette into an inventive water-bearer metaphor where luminous knowledge—not literal water—flows into the world'] },
  Pisces: { element: 'mutable water', colors: 'sea-glass aqua dominant, deep teal support, dreamy lilac accent, and opalescent coral highlights', embodiment: ['make her organza body silhouette flow into two circling currents that suggest fish through negative space', 'portray her as a lucid ocean dream, with hair, gown, and reflection becoming one fluid imaginative ecosystem', 'let two contrasting dream versions of her orbit through waterlike fabric while preserving one clear primary figure'] },
}

export const zodiacProfiles: Record<ZodiacSign, ZodiacProfile> = {
  Aries: {
    concept: 'Aries as kinetic fire and fearless first-move energy, expressed through a commanding Black fashion heroine and abstract sparks rather than literal zodiac clip art',
    phrases: ['FIRST. FIERY. FEARLESS.', 'I DO NOT WAIT FOR GREEN LIGHTS', 'BORN TO BEGIN', 'COURAGE LOOKS GOOD ON ME', 'LEAD FROM THE FRONT', 'ALL GAS. ALL GLOSS.'],
    looks: [
      { fashion: 'scarlet cropped moto jacket, liquid-leather trousers, pointed gold boots, and sculptural flame earrings', typography: 'forward-slanted condensed capitals with sliced speed lines and a molten-gold edge', artStyle: 'kinetic fashion-editorial collage with painted sparks', palette: 'oxblood, hot coral, black, and molten gold', mood: 'fearless ignition', visualTwist: 'the jacket seams burst into abstract brush-fire ribbons' },
      { fashion: 'asymmetric power blazer over a crystal mesh top with armored mini skirt and tall boots', typography: 'oversized knockout block letters staggered like a starting countdown', artStyle: 'high-gloss campaign photography crossed with graphic poster art', palette: 'black cherry, fuchsia, ember orange, and champagne', mood: 'unapologetic momentum', visualTwist: 'a ram-horn rhythm appears only in the blazer silhouette' },
      { fashion: 'red utility jumpsuit cinched by a gold hardware belt with fierce platform sneakers', typography: 'hand-painted athletic lettering with energetic underline swashes', artStyle: 'street-couture illustration with screen-print texture', palette: 'tomato red, plum, warm ivory, and antique gold', mood: 'playful competition', visualTwist: 'paint strokes race around the figure like a victory lap' },
    ],
  },
  Taurus: {
    concept: 'Taurus as sensual earth, patient power, and exquisite texture, styled on a grounded Black fashion muse with botanical geometry instead of a literal bull symbol',
    phrases: ['SOFT LIFE. SOLID STANDARDS.', 'LUXURY IS MY LOVE LANGUAGE', 'ROOTED AND RADIANT', 'SLOW GLOW. STRONG SOUL.', 'WORTH THE WAIT', 'PEACE LOOKS EXPENSIVE'],
    looks: [
      { fashion: 'moss velvet corset suit with wide-leg trousers, silk gloves, and heirloom gold jewelry', typography: 'plush high-contrast serif lettering with velvet-shadow depth', artStyle: 'tactile luxury editorial with botanical embossing', palette: 'moss green, cocoa, blush quartz, and antique gold', mood: 'grounded opulence', visualTwist: 'embroidered vines quietly form the letter shapes' },
      { fashion: 'caramel suede trench over a ribbed knit column dress with sculptural loafers', typography: 'broad rounded display type pressed like a premium leather stamp', artStyle: 'warm analog fashion photography with paper-grain collage', palette: 'caramel, espresso, olive, and cream', mood: 'slow-burn confidence', visualTwist: 'the coat hem becomes rolling topographic lines' },
      { fashion: 'rose satin wrap dress beneath an oversized faux-fur stole with jeweled sandals', typography: 'romantic editorial serif paired with a small handwritten luxury signature', artStyle: 'soft-focus beauty campaign with painterly florals', palette: 'dusty rose, merlot, warm ivory, and brushed brass', mood: 'sensual serenity', visualTwist: 'petals transform into tiny faceted gems at the edges' },
    ],
  },
  Gemini: {
    concept: 'Gemini as witty duality, conversation, and quick-change style, portrayed through one multidimensional Black woman in clever split-scene fashion rather than twin clip art',
    phrases: ['TWO SIDES. ONE ICON.', 'CATCH UP WITH MY MIND', 'VERSATILITY IS THE VIBE', 'DOUBLE THE VISION', 'I CONTAIN MULTITUDES', 'MOOD: SUBJECT TO SLAY'],
    looks: [
      { fashion: 'reversible half-tailored half-streetwear jacket with split trousers and mismatched statement heels', typography: 'mirrored sans-serif words that flip weight and direction across the layout', artStyle: 'surreal split-editorial collage with crisp cut-paper layers', palette: 'cobalt, lemon, black, and silver', mood: 'clever duality', visualTwist: 'one shadow wears the alternate side of the outfit' },
      { fashion: 'layered mesh turtleneck, graphic mini dress, detachable sleeves, and playful platform boots', typography: 'bouncy modular letters arranged like overlapping conversation bubbles', artStyle: 'pop-fashion illustration with halftone wit', palette: 'electric blue, orchid, citrus, and ink black', mood: 'social sparkle', visualTwist: 'speech ribbons turn into garment straps' },
      { fashion: 'two-tone cropped suit with one pinstripe side, one satin side, and sculptural ear cuffs', typography: 'editorial headline duplicated in contrasting serif and grotesk voices', artStyle: 'fashion magazine cover with controlled visual glitches', palette: 'teal, tangerine, ivory, and charcoal', mood: 'quick-change charisma', visualTwist: 'the page fold reveals a second color story' },
    ],
  },
  Cancer: {
    concept: 'Cancer as lunar intuition, deep care, and protective softness, centered on a luminous Black woman wrapped in tidal forms without generic moon-sign imagery',
    phrases: ['SOFT HEART. HARD SHELL.', 'PROTECT YOUR PEACE', 'FEELING IS A SUPERPOWER', 'HOME IS THE ENERGY', 'TENDER AND TENACIOUS', 'MOONLIT. NOT MUTED.'],
    looks: [
      { fashion: 'pearl satin cocoon coat over a moonlit slip dress with curved metallic cuffs', typography: 'gentle crescent-shaped serif lettering tucked protectively around the figure', artStyle: 'dreamy lunar fashion painting with pearlized texture', palette: 'pearl, midnight navy, mauve, and soft silver', mood: 'protective tenderness', visualTwist: 'the coat lining becomes a quiet midnight tide' },
      { fashion: 'quilted cloud jacket, fluid wide-leg trousers, and translucent shell-inspired heels', typography: 'soft inflated display letters with rippling waterline baselines', artStyle: 'whimsical editorial airbrush with glossy water reflections', palette: 'powder blue, cream, deep plum, and opal', mood: 'cozy intuition', visualTwist: 'quilt channels carry tiny illustrated memories' },
      { fashion: 'structured silver bustier under a draped indigo cape skirt with luminous pearls', typography: 'elegant small-caps serif framed by protective circular rules', artStyle: 'cinematic dark-romance portrait with hand-painted tides', palette: 'indigo, silver, shell pink, and black', mood: 'quiet emotional power', visualTwist: 'reflections show emotions as shifting abstract colors' },
    ],
  },
  Leo: {
    concept: 'Leo as solar charisma, creative leadership, and joyful spectacle, starring a radiant Black woman commanding the frame without relying on a generic lion graphic',
    phrases: ['MAIN CHARACTER BY NATURE', 'THE LIGHT KNOWS MY NAME', 'APPLAUSE IS OPTIONAL', 'BORN TO BE SEEN', 'ROYALTY WITH RANGE', 'SHINE LOUDER'],
    looks: [
      { fashion: 'sunburst gold sculptural gown with dramatic shoulders, jeweled cuffs, and a sweeping train', typography: 'towering marquee serif letters with dimensional gold rays', artStyle: 'maximalist red-carpet illustration with cinematic spotlighting', palette: 'sun gold, magenta, black, and amber', mood: 'radiant command', visualTwist: 'the gown pleats become a graphic solar crown' },
      { fashion: 'hot-pink feathered tuxedo with satin shorts, crystal tights, and sharp pumps', typography: 'bold theatrical capitals filled with tiny stage-light dots', artStyle: 'playful fashion-campaign collage with flash photography', palette: 'hot pink, tangerine, black, and champagne', mood: 'joyful spectacle', visualTwist: 'feathers sweep into celebratory exclamation marks' },
      { fashion: 'bronze corseted catsuit beneath a regal oversized cape with statement platforms', typography: 'luxury magazine serif layered behind the figure like a personal monument', artStyle: 'Afrofuturist glamour portrait with gilded ink texture', palette: 'bronze, burgundy, warm ivory, and ruby', mood: 'creative royalty', visualTwist: 'the cape shadow resembles an abstract mane of brush strokes' },
    ],
  },
  Virgo: {
    concept: 'Virgo as brilliant precision, useful beauty, and quietly exacting taste, rendered as a meticulous Black creative director within artful systems rather than a maiden icon',
    phrases: ['DETAILS ARE MY LOVE LANGUAGE', 'EDITED TO EXCELLENCE', 'PRECISION WITH PERSONALITY', 'THE STANDARD IS THE STANDARD', 'ORDER, BUT MAKE IT FASHION', 'QUIETLY IMPECCABLE'],
    looks: [
      { fashion: 'deconstructed ivory pinstripe suit with measured cutouts, fine gold chains, and architectural heels', typography: 'precise editorial grid type with tiny proofreader marks and elegant spacing', artStyle: 'Swiss-grid fashion editorial softened by ink drawing', palette: 'ivory, olive, charcoal, and fine gold', mood: 'quiet mastery', visualTwist: 'tailoring measurements become decorative constellations of dots' },
      { fashion: 'sage utility midi dress with couture pleating, slim belt, and polished knee boots', typography: 'clean condensed capitals aligned to a meticulous modular grid', artStyle: 'refined technical fashion illustration with paper texture', palette: 'sage, cream, espresso, and brass', mood: 'purposeful polish', visualTwist: 'pocket diagrams unfold into delicate botanical sketches' },
      { fashion: 'chocolate knit set with asymmetric wrap top, pencil skirt, and minimalist gold jewelry', typography: 'small elegant serif headline with an oversized perfectly placed initial', artStyle: 'quiet-luxury campaign with tactile pencil shading', palette: 'chocolate, oat, forest, and muted rose', mood: 'considered elegance', visualTwist: 'knit stitches resolve into tiny affirmations at close range' },
    ],
  },
  Libra: {
    concept: 'Libra as beauty with backbone, social grace, and dynamic balance, presented through an artful Black style icon using asymmetry and harmony instead of literal scales',
    phrases: ['GRACE WITH A BACKBONE', 'BALANCE, BUT NEVER BORING', 'BEAUTY IS A POWER MOVE', 'CHARM WITH STANDARDS', 'ELEGANCE ON MY TERMS', 'SOFTNESS. SYMMETRY. STRENGTH.'],
    looks: [
      { fashion: 'asymmetric blush-and-wine draped gown balanced by a single sculptural shoulder and paired cuffs', typography: 'refined high-contrast serif balanced across opposing corners', artStyle: 'romantic gallery-poster painting with modern negative space', palette: 'blush, wine, warm ivory, and rose gold', mood: 'magnetic harmony', visualTwist: 'two unequal fabric arcs create perfect visual balance' },
      { fashion: 'cropped cream tuxedo, flowing pleated trousers, satin bralette, and mirrored heels', typography: 'symmetrical fashion-magazine wordmark interrupted by one playful italic word', artStyle: 'crisp studio editorial with mirrored collage planes', palette: 'cream, black, orchid, and chrome', mood: 'polished flirtation', visualTwist: 'the reflection poses differently while preserving balance' },
      { fashion: 'lavender sculptural mini dress with floating chiffon panels and pearl ear climbers', typography: 'airy curved display letters suspended like a mobile', artStyle: 'contemporary art-fashion illustration with translucent layers', palette: 'lavender, plum, pale peach, and champagne', mood: 'artful diplomacy', visualTwist: 'floating panels form an abstract harmony symbol in motion' },
    ],
  },
  Scorpio: {
    concept: 'Scorpio as magnetic mystery, private power, and transformation, embodied by a formidable Black woman emerging through shadow and metamorphic textures without a scorpion emblem',
    phrases: ['MYSTERY IS THE DRESS CODE', 'DEPTH OVER DISPLAY', 'TRANSFORM IN PRIVATE', 'SILENCE HAS POWER', 'READ THE ENERGY', 'DARK, DIVINE, UNDENIABLE'],
    looks: [
      { fashion: 'liquid-black leather gown with a high neck, sheer plum panels, and obsidian jewelry', typography: 'razor-thin gothic serif letters emerging from deep shadow', artStyle: 'noir fashion painting with wet lacquer highlights', palette: 'black, deep plum, blood red, and gunmetal', mood: 'magnetic secrecy', visualTwist: 'the glossy dress surface reveals a hidden second silhouette' },
      { fashion: 'burgundy velvet catsuit beneath a sharp floor-length trench with lace gloves', typography: 'narrow stacked capitals cut by one intense crimson line', artStyle: 'cinematic thriller editorial with smoky ink blooms', palette: 'burgundy, ink black, smoky violet, and pewter', mood: 'controlled intensity', visualTwist: 'smoke transforms into dark flower petals near the headline' },
      { fashion: 'iridescent scale-texture corset, sculpted trousers, and a translucent cocoon cape', typography: 'metamorphic letters shifting from serif to sharp geometric forms', artStyle: 'surreal transformation collage with jewel-toned chiaroscuro', palette: 'petrol blue, blackberry, emerald, and black', mood: 'rebirth after midnight', visualTwist: 'the cape cracks open into luminous abstract wings' },
    ],
  },
  Sagittarius: {
    concept: 'Sagittarius as boundless curiosity, candid joy, and stylish motion, following a worldly Black adventurer through expressive paths without a literal bow-and-arrow badge',
    phrases: ['BORN TO GO BEYOND', 'FREEDOM FITS ME', 'NEXT STOP: EVERYWHERE', 'AIM HIGHER. LAUGH LOUDER.', 'TRUTH WITH GOOD SHOES', 'WANDER WITH PURPOSE'],
    looks: [
      { fashion: 'cobalt sweeping travel trench over a saffron knit set with tall expedition boots', typography: 'long italic capitals traveling diagonally beyond the frame', artStyle: 'vibrant destination-poster collage with painterly maps', palette: 'cobalt, saffron, rust, and cream', mood: 'boundless optimism', visualTwist: 'the trench belt becomes an abstract route across the artwork' },
      { fashion: 'sport-luxe jumpsuit with contrast piping, oversized belt bag, and sculptural sneakers', typography: 'fast athletic display type with a playful upward trajectory', artStyle: 'energetic street-fashion illustration with travel-stamp textures', palette: 'violet, lime, black, and silver', mood: 'adventurous play', visualTwist: 'motion trails contain tiny imagined destinations' },
      { fashion: 'printed silk maxi dress under a cropped suede vest with stacks of global artisan jewelry', typography: 'freehand brush lettering paired with a clean editorial compass line', artStyle: 'bohemian high-fashion painting with layered ephemera', palette: 'turquoise, paprika, plum, and aged gold', mood: 'worldly freedom', visualTwist: 'fabric prints expand into a dreamlike landscape' },
    ],
  },
  Capricorn: {
    concept: 'Capricorn as earned authority, architectural ambition, and timeless mastery, framing a powerful Black woman as the builder of her own summit without a literal goat motif',
    phrases: ['BUILT FOR THE LONG GAME', 'AMBITION, BEAUTIFULLY TAILORED', 'THE CLIMB IS THE CROWN', 'LEGACY IN PROGRESS', 'DISCIPLINE LOOKS LUXURIOUS', 'CEO OF THE NEXT LEVEL'],
    looks: [
      { fashion: 'charcoal architectural power suit with a cape shoulder, gold watch, and razor-sharp boots', typography: 'monumental stone-cut serif stacked like a modern skyscraper', artStyle: 'architectural fashion editorial with blueprint accents', palette: 'charcoal, camel, black, and gold', mood: 'earned authority', visualTwist: 'lapel lines continue upward into an imagined skyline' },
      { fashion: 'camel cashmere column coat over a black turtleneck dress with sculptural handbag', typography: 'timeless luxury wordmark with disciplined wide tracking', artStyle: 'quiet-power campaign photography with embossed paper detail', palette: 'camel, espresso, cream, and brass', mood: 'strategic elegance', visualTwist: 'the coat shadow forms ascending geometric steps' },
      { fashion: 'midnight pinstripe corset vest, wide trousers, long gloves, and polished platform oxfords', typography: 'bold condensed capitals anchored to a firm architectural baseline', artStyle: 'dramatic boardroom portrait crossed with constructivist poster design', palette: 'midnight, oxblood, warm white, and steel', mood: 'legacy focus', visualTwist: 'pinstripes bend into a graphic mountain horizon' },
    ],
  },
  Aquarius: {
    concept: 'Aquarius as visionary rebellion, community-minded originality, and bright future thinking, imagined through an inventive Black fashion futurist without a water-bearer cliché',
    phrases: ['ORIGINAL IS THE ONLY OPTION', 'FUTURE, MEET YOUR MUSE', 'WEIRD IS A COMPLIMENT', 'CHANGE THE FREQUENCY', 'BUILT DIFFERENT ON PURPOSE', 'AHEAD LOOKS GOOD FROM HERE'],
    looks: [
      { fashion: 'modular silver-and-cyan jacket with detachable volumes, mesh trousers, and translucent boots', typography: 'experimental geometric letters connected like a futuristic circuit', artStyle: 'Afrofuturist editorial collage with holographic risograph grain', palette: 'electric cyan, silver, ultraviolet, and black', mood: 'visionary rebellion', visualTwist: 'garment modules float into a new configuration around her' },
      { fashion: 'cobalt bubble-hem dress over metallic leggings with unexpected sculptural sneakers', typography: 'playful inflated lowercase type interrupted by crisp coded symbols', artStyle: 'retro-future pop illustration with chrome airbrush', palette: 'cobalt, acid green, lilac, and chrome', mood: 'eccentric optimism', visualTwist: 'the dress silhouette broadcasts colorful idea waves' },
      { fashion: 'deconstructed denim cape suit with iridescent patchwork and asymmetric visor earrings', typography: 'cut-and-rebuilt editorial capitals with surprising open spaces', artStyle: 'experimental street-couture zine with digital textures', palette: 'indigo, aqua, hot pink, and aluminum', mood: 'collective innovation', visualTwist: 'patches connect into a map of imagined communities' },
    ],
  },
  Pisces: {
    concept: 'Pisces as fluid imagination, emotional artistry, and dream logic, surrounding a soulful Black muse with poetic underwater movement without generic fish icons',
    phrases: ['DREAMS WITH A DRESS CODE', 'IMAGINATION IS MY ELEMENT', 'SOFT DOES NOT MEAN SMALL', 'FLOAT ABOVE THE ORDINARY', 'ART LIVES IN MY FEELINGS', 'DEEP WATER. BRIGHT SOUL.'],
    looks: [
      { fashion: 'sea-glass organza gown with flowing translucent layers, pearl harness, and crystal sandals', typography: 'hand-painted script drifting into delicate rippling serif words', artStyle: 'ethereal underwater fashion painting with luminous ink blooms', palette: 'sea glass, lilac, pearl, and deep teal', mood: 'lucid dreaming', visualTwist: 'the dress train turns into a painted ocean suspended in air' },
      { fashion: 'iridescent oversized suit over a liquid satin bralette with wave-shaped heels', typography: 'fluid rounded capitals that reflect and dissolve at the baseline', artStyle: 'surreal beauty editorial with prism refractions', palette: 'aqua, orchid, midnight blue, and opal', mood: 'creative intuition', visualTwist: 'the reflection becomes an entirely different dream outfit' },
      { fashion: 'soft watercolor-print caftan cinched with a sculptural silver belt and sheer gloves', typography: 'poetic freeform lettering weaving gently through the fabric folds', artStyle: 'romantic mixed-media collage with watercolor clouds', palette: 'coral mist, periwinkle, plum, and silver', mood: 'soulful escape', visualTwist: 'painted clouds contain tiny windows into imagined worlds' },
    ],
  },
}

export function themeConcept(category: ThemeCategory, theme: string) {
  if (category === 'zodiac' && theme in zodiacProfiles) return zodiacProfiles[theme as ZodiacSign].concept
  return `${theme} celebration interpreted through an original Black women's fashion-art concept with culturally thoughtful, occasion-relevant details`
}

function pick<T>(items: readonly T[], random: () => number): T {
  return items[Math.min(items.length - 1, Math.floor(random() * items.length))]
}

function pickDifferent<T>(items: readonly T[], current: T, random: () => number): T {
  const alternatives = items.filter((item) => item !== current)
  return pick(alternatives.length ? alternatives : items, random)
}

export function applyThemeDirection(
  category: ThemeCategory,
  theme: string,
  current: PromptSelections,
  locked: ReadonlySet<PromptField> = new Set(),
  random: () => number = Math.random,
): PromptSelections {
  const next = { ...current }
  delete next.themeCategory
  delete next.theme
  delete next.themeDirection
  const set = <K extends PromptField>(field: K, value: PromptSelections[K]) => {
    if (!locked.has(field)) next[field] = value
  }

  if (category !== 'zodiac' || !(theme in zodiacProfiles)) {
    set('concept', themeConcept(category, theme))
    next.themeCategory = category
    next.theme = theme
    return next
  }

  const profile = zodiacProfiles[theme as ZodiacSign]
  const essence = zodiacEssences[theme as ZodiacSign]
  const availableLooks = profile.looks.filter((item) => item.fashion !== current.fashion)
  const look = pick(availableLooks.length ? availableLooks : profile.looks, random)
  set('concept', profile.concept)
  set('phrase', pickDifferent(profile.phrases, current.phrase, random))
  set('fashion', look.fashion)
  set('typography', look.typography)
  set('artStyle', look.artStyle)
  // Zodiac color identity is collection DNA, not an optional outfit accent.
  // Keep the sign's actual palette field authoritative so Collection Builder,
  // the COLOR prompt section, saved-project summaries, and exports all agree.
  next.palette = `${theme} signature palette: ${essence.colors}`
  set('mood', look.mood)
  set('visualTwist', look.visualTwist)
  next.themeCategory = 'zodiac'
  next.theme = theme
  next.themeDirection = `${theme.toUpperCase()} EMBODIMENT — This Black woman is the original artistic personification of ${theme}, not merely a model wearing themed clothing. ${pick(essence.embodiment, random)}. ELEMENT — ${essence.element}. MANDATORY SIGNATURE COLOR STORY — ${essence.colors}. These colors must visibly dominate the character, atmosphere, typography, and major graphic shapes; do not replace them with a generic gold, black, or pink palette. Integrate the sign through anatomy-safe pose, hair silhouette, fashion construction, light, shadow, negative space, and environmental transformation. Avoid a separate clip-art zodiac badge, generic constellation backdrop, costume horns, or a woman simply posing beside the symbol.`
  return next
}
