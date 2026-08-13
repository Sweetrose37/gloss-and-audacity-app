export interface HairStyle {
  name: string
  category: string
  texture: string
  construction: string
  silhouette: string
}

const hair = (name: string, category: string, texture: string, construction: string, silhouette: string): HairStyle => ({ name, category, texture, construction, silhouette })

export const hairLibrary: HairStyle[] = [
  hair('rounded cloud afro', 'afro', 'dense springy coils', 'natural growth with believable roots and even density', 'full rounded halo'),
  hair('asymmetrical picked afro', 'editorial natural', 'dense type-4 coils', 'sculpted from rooted natural growth', 'graphic asymmetrical volume'),
  hair('close tapered natural cut', 'short cut', 'tight defined coils', 'clean tapered sides with intact natural hairline', 'compact architectural crown'),
  hair('coily wash-and-go', 'coils', 'hydrated separated coils', 'rooted clusters with natural shrinkage and gravity', 'soft dimensional volume'),
  hair('layered natural curls', 'curls', 'springy corkscrew curls', 'varied curl clumps connected naturally at the scalp', 'shoulder-length cascading shape'),
  hair('waist-length locs', 'locs', 'mature cylindrical loc texture', 'individually rooted locs with realistic weight', 'long fluid vertical rhythm'),
  hair('regal loc updo', 'locs', 'smooth mature locs', 'secure interwoven updo with visible scalp logic', 'tall balanced crown shape'),
  hair('knotless box braids', 'braids', 'clean braided texture', 'gradual knotless feed-in with believable parts', 'long controlled drape'),
  hair('sculptural braided bun', 'braided bun', 'polished medium braids', 'braids anchored into a stable wrapped bun', 'high circular silhouette'),
  hair('flat twists into a low bun', 'twists', 'defined rope twists', 'clean scalp sections feeding into the bun', 'low elegant profile'),
  hair('two-strand twist-out', 'twists', 'soft stretched coil definition', 'rooted sections opening into natural volume', 'wide tapered shape'),
  hair('geometric cornrow updo', 'cornrows', 'precise braided rows', 'continuous scalp-connected pattern gathered upward', 'graphic vertical silhouette'),
  hair('silk press with curved ends', 'silk press', 'smooth heat-stretched strands', 'natural density with subtle root volume', 'glossy shoulder-skimming curve'),
  hair('high textured ponytail', 'ponytail', 'coily voluminous texture', 'secure rooted base with believable tension', 'high cascading plume'),
  hair('precision pixie cut', 'short cut', 'smooth shaped texture', 'close layers following the head form', 'sleek sculpted contour'),
  hair('woven coil sculpture', 'editorial construction', 'dense natural coils', 'supported sculptural sections visibly connected to the scalp', 'avant-garde organic architecture'),
]

export function describeHair(style: HairStyle) {
  return `${style.name}, with ${style.texture}, ${style.construction}, realistic density and gravity, forming a ${style.silhouette}`
}
