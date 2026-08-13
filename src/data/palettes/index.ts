export interface CuratedPalette { name: string; dominant: string; supporting: string; accent: string; neutral: string; metallic?: string }

export const paletteLibrary: CuratedPalette[] = [
  { name: 'Plum Audacity', dominant: 'near-black', supporting: 'deep plum', accent: 'hot pink', neutral: 'warm ivory', metallic: 'champagne gold' },
  { name: 'Oxblood Blush', dominant: 'oxblood', supporting: 'blush', accent: 'espresso', neutral: 'ivory' },
  { name: 'Teal Copper', dominant: 'deep teal', supporting: 'black', accent: 'verdigris', neutral: 'warm stone', metallic: 'copper' },
  { name: 'Cobalt Espresso', dominant: 'cobalt', supporting: 'espresso', accent: 'warm white', neutral: 'sand', metallic: 'gold' },
  { name: 'Lilac Heat', dominant: 'chocolate', supporting: 'lilac', accent: 'clear red', neutral: 'soft cream' },
  { name: 'Plum Citron', dominant: 'plum', supporting: 'cream', accent: 'citron', neutral: 'deep brown' },
  { name: 'Jewel Salon', dominant: 'emerald', supporting: 'amethyst', accent: 'ruby', neutral: 'camel', metallic: 'antique gold' },
  { name: 'Electric Monochrome', dominant: 'black', supporting: 'charcoal', accent: 'electric fuchsia', neutral: 'ivory' },
  { name: 'Deep Earth', dominant: 'umber', supporting: 'forest green', accent: 'terracotta', neutral: 'oatmeal' },
  { name: 'Soft Luxe', dominant: 'mushroom taupe', supporting: 'dusty rose', accent: 'cocoa', neutral: 'pearl', metallic: 'soft gold' },
  { name: 'Runway Brights', dominant: 'ultramarine', supporting: 'magenta', accent: 'acid yellow', neutral: 'black' },
  { name: 'Retro Muted', dominant: 'muted mustard', supporting: 'dusty teal', accent: 'brick red', neutral: 'aged cream' },
]

export function describePalette(palette: CuratedPalette) {
  return `${palette.name}: ${palette.dominant} dominant, ${palette.supporting} supporting, ${palette.accent} accent, ${palette.neutral} neutral${palette.metallic ? `, with restrained ${palette.metallic} metallic detail` : ''}`
}
