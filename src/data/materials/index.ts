export interface MaterialDefinition {
  name: string
  family: string
  surface: string
  edge: string
  depth: string
  light: string
  color: string
  construction: string
  typographyUse: string
  fashionUse: string
  dtf: string
}

const material = (name: string, family: string, surface: string, edge: string, depth: string, light: string, color: string, construction: string, typographyUse: string, fashionUse: string, dtf: string): MaterialDefinition => ({ name, family, surface, edge, depth, light, color, construction, typographyUse, fashionUse, dtf })

export const materialLibrary: MaterialDefinition[] = [
  material('chenille', 'textile', 'dense looped yarn', 'soft rounded pile edge', 'plush raised depth', 'broad soft highlights', 'slightly mottled fiber color', 'stitched patch construction', 'bold block headlines', 'varsity-inspired garment panels', 'simulate with simplified loop texture and a crisp outer contour'),
  material('velvet', 'textile', 'short directional pile', 'clean soft edge', 'shallow tactile depth', 'dark-to-bright directional sheen', 'rich saturated color', 'cut fabric panel', 'large serif or script zones', 'eveningwear panels', 'use controlled tonal shifts without micro-fiber noise'),
  material('flock', 'textile', 'matte micro-fiber nap', 'precise cut edge', 'thin raised layer', 'light-absorbing finish', 'dense flat color', 'heat-applied surface', 'solid display lettering', 'small garment inset', 'simulate as matte fill with minimal texture'),
  material('felt', 'textile', 'compressed fuzzy fiber', 'slightly soft cut edge', 'flat material thickness', 'diffuse light', 'warm muted color', 'appliqué layer', 'bold simple letters', 'patch details', 'keep fiber cues broad and edges printable'),
  material('faux fur', 'textile', 'directional long pile', 'irregular soft fringe', 'deep plush volume', 'broken silky highlights', 'tonal strand variation', 'trim or bounded panel', 'headline accent only', 'collar or cuff zone', 'restrict to one bounded zone with simplified strand groups'),
  material('boucle', 'textile', 'nubby looped weave', 'soft woven edge', 'medium tactile depth', 'diffuse broken highlights', 'heathered color', 'tailored textile panel', 'large restrained type', 'jacket panel', 'enlarge the weave and avoid dense micro-detail'),
  material('denim', 'textile', 'diagonal twill weave', 'frayed or stitched edge', 'flat layered thickness', 'matte with seam highlights', 'indigo tonal variation', 'seams, pockets, topstitching', 'patch lettering', 'structured garment panels', 'use broad twill cues and clear topstitch lines'),
  material('satin', 'textile', 'smooth fluid weave', 'clean flowing edge', 'fold-driven depth', 'long glossy highlights', 'luminous color', 'draped construction', 'script or elegant serif', 'fluid garments', 'translate shine into a few strong highlight shapes'),
  material('silk', 'textile', 'fine soft weave', 'delicate clean edge', 'lightweight fold depth', 'subtle pearly glow', 'nuanced color shifts', 'bias-cut drape', 'high-contrast serif', 'blouses and scarves', 'simplify folds and retain high-value separation'),
  material('taffeta', 'textile', 'crisp smooth weave', 'sharp folded edge', 'structured inflated depth', 'bright angular highlights', 'shot-color variation', 'pleats and sculpted volume', 'editorial capitals', 'dramatic sleeves', 'use bold fold geometry rather than fine texture'),
  material('lace', 'textile', 'open ornamental mesh', 'scalloped edge', 'thin layered depth', 'delicate intermittent highlights', 'single-color threadwork', 'bounded overlay', 'outline or frame only', 'sleeve or inset', 'enlarge motifs and avoid isolated fragile lines'),
  material('mesh', 'textile', 'regular open grid', 'clean bound edge', 'transparent layer', 'minimal pinpoint highlights', 'tonal transparency', 'bounded technical panel', 'shadow or inset', 'sport panel', 'use coarse printable grid and solid boundary'),
  material('quilted fabric', 'textile', 'padded stitched surface', 'bound structured edge', 'soft raised cells', 'alternating soft highlights', 'tonal stitched color', 'repeated stitched channels', 'dimensional block type', 'jacket panel', 'keep quilt cells large and seams continuous'),
  material('faux leather', 'leather', 'fine matte grain', 'clean cut or stitched edge', 'firm shallow volume', 'controlled soft highlights', 'deep solid color', 'paneled construction', 'bold condensed type', 'structured jackets', 'use broad grain sparingly and strong contour contrast'),
  material('patent faux leather', 'leather', 'mirror-smooth glossy surface', 'crisp sealed edge', 'firm sculpted volume', 'sharp reflected streaks', 'deep color with white highlights', 'molded or paneled form', 'dimensional headline', 'statement garment panel', 'use two or three decisive highlight shapes'),
  material('suede', 'leather', 'soft brushed nap', 'clean softly feathered edge', 'flat supple depth', 'low diffuse sheen', 'warm tonal variation', 'cut panel and seam', 'serif or block inset', 'jacket or boot zone', 'simulate with subtle tonal field, not noisy grain'),
  material('metallic leather', 'leather', 'fine grain under metallic finish', 'stitched crisp edge', 'structured volume', 'broad metallic reflections', 'tinted metallic color', 'tailored paneling', 'headline or border', 'statement outerwear', 'simplify reflections into printable bands'),
  material('chrome', 'metal', 'mirror-polished surface', 'razor-clean edge', 'hard dimensional extrusion', 'high-contrast environment reflections', 'silver with controlled color reflection', 'molded solid form', 'hero dimensional lettering', 'small hardware only', 'render bold highlight and shadow bands with no micro-reflections'),
  material('brushed metal', 'metal', 'fine directional brushing', 'machined clean edge', 'thin rigid depth', 'soft linear sheen', 'cool or warm metal', 'cut plate construction', 'architectural type', 'hardware detail', 'use sparse directional lines inside solid shapes'),
  material('antique brass', 'metal', 'aged patina and worn polish', 'slightly irregular cast edge', 'solid shallow relief', 'warm muted glints', 'brown-gold with dark recesses', 'cast or embossed form', 'serif headline accent', 'buttons or structural accent', 'use large patina shapes and preserve strong outline'),
  material('rhinestones', 'gem', 'faceted glass points', 'crisp individual stones', 'small raised facets', 'sharp white sparkle', 'clear or tinted reflections', 'evenly set stones', 'outline or selective letter face', 'restrained accessory accent', 'use spaced gem clusters rather than dense tiny dots'),
  material('crystals', 'gem', 'transparent cut facets', 'angular crystalline edge', 'deep refractive form', 'prismatic highlights', 'clear with selective color flashes', 'clustered setting', 'single hero word', 'brooch-like accent', 'simplify to larger faceted shapes with dark separation'),
  material('sequins', 'gem', 'overlapping reflective discs', 'scalloped field edge', 'shallow layered texture', 'scattered directional glints', 'metallic or saturated color', 'stitched repeating field', 'headline fill', 'garment panel', 'enlarge discs and limit sparkle count'),
  material('pearls', 'gem', 'smooth nacreous spheres', 'clean round silhouette', 'rounded raised depth', 'soft pinpoint glow', 'ivory with pastel reflections', 'strung or set rhythmically', 'border or punctuation only', 'restrained trim', 'use larger spaced pearls with clear contour'),
  material('holographic film', 'synthetic', 'smooth iridescent film', 'precise cut edge', 'flat laminated layer', 'spectral angular shifts', 'controlled rainbow gradient', 'applied sheet', 'hero letter face', 'single garment panel', 'limit spectrum bands and keep edge crisp'),
  material('reflective vinyl', 'synthetic', 'smooth technical surface', 'plotter-clean edge', 'flat film depth', 'bright flash response', 'cool silver or solid reflective color', 'heat-applied shape', 'athletic block type', 'sport detail', 'use high-contrast solid highlight without gradients'),
  material('jelly resin', 'synthetic', 'glossy translucent surface', 'rounded molded edge', 'thick soft volume', 'bright internal reflections', 'saturated translucent color', 'cast molded form', 'bubbly display lettering', 'small sculptural accessory', 'use bold translucent bands over a solid printable base'),
  material('acrylic', 'synthetic', 'polished transparent sheet', 'laser-clean edge', 'rigid layered depth', 'sharp edge highlights', 'clear or tinted color', 'stacked cut layers', 'dimensional display type', 'geometric accent', 'simulate opacity and edge light with simple layers'),
  material('molded rubber', 'synthetic', 'smooth matte elastomer', 'rounded molded edge', 'solid raised depth', 'soft controlled highlight', 'dense flat color', 'embossed or molded form', 'sport lettering', 'technical trim', 'use broad highlights and a thick readable silhouette'),
  material('cut paper', 'paper', 'matte fibrous sheet', 'clean hand-cut edge', 'thin stacked depth', 'soft cast shadow', 'flat curated color', 'layered cut shapes', 'collage headline', 'artistic styling panel', 'keep layers broad with attached shadow shapes'),
  material('layered paper', 'paper', 'subtle paper tooth', 'slightly varied cut edges', 'multiple visible tiers', 'soft directional shadows', 'coordinated flat colors', 'stacked collage construction', 'framed or stacked type', 'editorial collage detail', 'limit layers and maintain connected silhouettes'),
  material('marble', 'mineral', 'polished veined stone', 'clean slab edge', 'solid heavy depth', 'soft polish reflection', 'base tone with broad veins', 'cut inset slab', 'large serif face', 'conceptual garment panel', 'use few bold veins and a solid perimeter'),
  material('ceramic glaze', 'mineral', 'smooth fired glaze', 'rounded handmade edge', 'molded dimensional volume', 'wet specular highlights', 'rich glaze pooling', 'formed and fired object', 'bubbly or dimensional type', 'small concept object', 'use simplified glaze pools and strong object contour'),
  material('puff ink', 'ink', 'smooth expanded ink', 'soft rounded print edge', 'noticeable raised layer', 'broad matte highlight', 'solid saturated color', 'screen-printed expansion', 'hero block lettering', 'garment graphic itself', 'simulate a clear raised bevel with no fragile detail'),
  material('raised gel ink', 'ink', 'glossy domed ink', 'precise rounded edge', 'low transparent dome', 'sharp wet highlight', 'tinted or clear color', 'registered spot application', 'outline or accent word', 'garment graphic detail', 'keep domes broad and attached to solid artwork'),
  material('cracked ink', 'ink', 'aged fractured print', 'mostly intact outer edge', 'flat weathered layer', 'matte broken surface', 'faded solid color', 'controlled distress pattern', 'retro block type', 'vintage graphic area', 'use sparse large cracks without compromising legibility'),
  material('distressed ink', 'ink', 'worn screen-print texture', 'controlled imperfect edge', 'flat ink layer', 'matte response', 'uneven opacity', 'selectively abraded print', 'headline and illustration texture', 'apparel graphic itself', 'keep distress broad and retain at least 80% solid coverage'),
]

export function describeMaterial(item: MaterialDefinition, palette: string, zone: string) {
  return `MATERIAL — ${item.name}; SURFACE — ${item.surface}; EDGE — ${item.edge}; DEPTH — ${item.depth}; LIGHT — ${item.light}; COLOR — coordinate with ${palette}; APPLICATION ZONE — ${zone}. Construction cue: ${item.construction}. For DTF simulation, ${item.dtf}`
}
