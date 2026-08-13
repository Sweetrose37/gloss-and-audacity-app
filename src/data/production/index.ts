export interface MasterReference { width: number; height: number; ratio: string; inches: string }
export interface PlacementGuide { name: string; range: string; note: string }

export const masterReferences: MasterReference[] = [
  { width: 3000, height: 4500, ratio: '2:3', inches: '10 × 15 in at 300 PPI' },
  { width: 3600, height: 4800, ratio: '3:4', inches: '12 × 16 in at 300 PPI' },
  { width: 4500, height: 5400, ratio: '5:6', inches: '15 × 18 in at 300 PPI' },
  { width: 3600, height: 3600, ratio: '1:1', inches: '12 × 12 in at 300 PPI' },
]

export const placementGuides: PlacementGuide[] = [
  { name: 'Adult Left Chest', range: 'Approximately 3–4.5 in wide', note: 'Compact marks and short phrases usually read best.' },
  { name: 'Adult Center Front', range: 'Approximately 9–12 in wide', note: 'Balance width against artwork height and garment size.' },
  { name: 'Adult Oversized Front', range: 'Approximately 12–15+ in wide', note: 'Confirm transfer and platen limits before committing.' },
  { name: 'Youth Center Front', range: 'Approximately 7–10 in wide', note: 'Scale detail and typography for the smaller garment.' },
  { name: 'Toddler Center Front', range: 'Approximately 5–7 in wide', note: 'Favor simplified shapes and substantial lettering.' },
]

export const artworkShapes = [
  { name: 'Tall / Narrow', guidance: 'Prioritize final height; a modest width can still create an oversized vertical impression.' },
  { name: 'Wide', guidance: 'Confirm chest width, sleeve proximity, and platen limits; height may remain comparatively shallow.' },
  { name: 'Square', guidance: 'Check both width and height because the design occupies substantial area in both directions.' },
  { name: 'Circular', guidance: 'Measure the full diameter and preserve even breathing room around the perimeter.' },
  { name: 'Irregular / Isolated', guidance: 'Use visible artwork bounds rather than transparent canvas edges when judging placement.' },
]

export const dtfGuidance = ['Transparent background', 'Isolated artwork', 'Cohesive outer silhouette', 'Strong contrast', 'Garment-scale readability', 'Substantial important lines', 'Controlled micro-detail', 'Clean outer edges', 'Intentional negative space', 'Connected or grouped decorative elements', 'Exact typography', 'Production-conscious fine detail']
export const sublimationGuidance = ['Fuller or environmental backgrounds', 'Edge-to-edge composition where appropriate', 'Broader textures and color transitions', 'All-over design potential', 'Correct product dimensions', 'Appropriate source resolution', 'Readable typography', 'Vendor-specific templates when necessary']
export const readabilityChecks = ['Tiny text', 'Extremely thin lettering', 'Fine facial detail', 'Narrow gaps', 'Isolated particles', 'Tiny faux rhinestones', 'Glitter specks', 'Distressed textures', 'Thin outlines', 'Tiny collage fragments', 'Very small material fibers']
export const fauxMaterials = ['chenille', 'embroidery', 'rhinestones', 'puff', 'leather', 'sequins', 'foil', 'velvet', 'gel', 'chrome']

export const placementDisclaimer = 'These are starting ranges—not universal placement sizes. Final decisions depend on garment size, artwork shape, transfer dimensions, platen size, printer or vendor requirements, and the intended fashion look.'
