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
  hair('teeny weeny afro', 'short natural', 'soft tightly coiled texture', 'natural close growth with a delicate authentic hairline', 'clean rounded micro silhouette'),
  hair('finger-coiled tapered cut', 'short natural', 'defined glossy finger coils', 'individually formed coils over tapered sides', 'textured sculpted top'),
  hair('coily faux hawk', 'editorial natural', 'springy type-4 coils', 'pinned sides feeding into a continuous central ridge', 'bold vertical crest'),
  hair('stretched blown-out afro', 'editorial natural', 'soft cloudlike stretched coils', 'rooted natural density with airy separated ends', 'expansive triangular halo'),
  hair('bantu knot constellation', 'protective style', 'smooth coiled sections', 'clean geometric parts wrapped into secure knots', 'rhythmic sculptural crown plane'),
  hair('side-swept passion twists', 'twists', 'soft bohemian rope twists', 'individually rooted twists with believable weight', 'romantic diagonal cascade'),
  hair('shoulder-length Senegalese twists', 'twists', 'smooth compact rope texture', 'precise rooted sections with even tension', 'polished blunt shoulder line'),
  hair('chunky Havana twists', 'twists', 'full softly textured ropes', 'large rooted sections with natural variation', 'voluminous cascading silhouette'),
  hair('micro twists in a high bun', 'twists', 'fine defined rope texture', 'many small rooted twists gathered into a stable bun', 'tall elegant oval'),
  hair('braided bob with curved ends', 'braids', 'smooth medium box braids', 'clean rooted parts and gently shaped tips', 'graphic jaw-length curve'),
  hair('waist-length bohemian braids', 'braids', 'braided lengths with loose curly strands', 'knotless roots and intentionally spaced curls', 'long romantic movement'),
  hair('Fulani-inspired braided arrangement', 'braids', 'precise cornrows and slender braids', 'symmetrical scalp paths with restrained original bead placement', 'face-framing vertical rhythm'),
  hair('stitch-braid high ponytail', 'braids', 'clean defined braid rows', 'scalp-connected sections flowing into one secured ponytail', 'sleek lifted cascade'),
  hair('braided lob with asymmetric part', 'braids', 'fine polished braids', 'believable square sections and side parting', 'angled collarbone silhouette'),
  hair('loc bob with shell-free gold cuffs', 'locs', 'mature compact locs', 'individually rooted locs with a few restrained metal cuffs', 'rounded chin-length shape'),
  hair('freeform loc halo', 'locs', 'organic varied loc texture', 'naturally joined and separated rooted locs', 'expressive radial silhouette'),
  hair('half-up loc fountain', 'locs', 'long cylindrical locs', 'upper locs secured high while lower locs fall naturally', 'layered high-low cascade'),
  hair('wavy microlocs', 'locs', 'fine rippled loc texture', 'dense individually rooted microlocs with soft set waves', 'fluid shoulder-length curtain'),
  hair('deep-wave sew-in with natural leave-out', 'protective weave', 'lush defined deep waves', 'believable scalp part and seamlessly blended roots', 'full waist-length waves'),
  hair('voluminous kinky-straight blowout', 'heat-styled natural', 'soft textured stretched strands', 'natural root lift and realistic density', 'large flowing salon silhouette'),
  hair('roller-set curls', 'set style', 'smooth springy barrel curls', 'rooted set pattern brushed into cohesive movement', 'vintage rounded volume'),
  hair('asymmetric finger waves', 'short set style', 'glossy sculpted S-waves', 'waves follow the head with authentic edge detail', 'sleek graphic contour'),
  hair('soft shag with coily fringe', 'layered natural', 'airy defined coils', 'short-to-long rooted layers with a light forehead fringe', 'playful tapered movement'),
  hair('curly mullet with sculpted sides', 'editorial natural', 'tight lively curls', 'controlled short sides and longer rooted back layers', 'fashion-forward elongated crest'),
  hair('bubble ponytail with textured sections', 'ponytail', 'soft coily expanded bubbles', 'secure rooted base and evenly banded full sections', 'dramatic segmented cascade'),
  hair('low coily chignon', 'updo', 'polished natural coils', 'side-parted coils gathered into a believable nape construction', 'quiet rounded profile'),
  hair('French roll with natural texture', 'updo', 'softly stretched textured strands', 'secure vertical roll with controlled wisps', 'timeless tall contour'),
  hair('double braided space buns', 'braided updo', 'clean medium braids', 'center-parted rooted braids wrapped into two stable buns', 'playful balanced silhouette'),
]

export function describeHair(style: HairStyle) {
  return `${style.name}, with ${style.texture}, ${style.construction}, realistic density and gravity, forming a ${style.silhouette}`
}
