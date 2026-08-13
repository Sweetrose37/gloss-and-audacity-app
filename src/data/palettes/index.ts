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
  { name: 'Midnight Orchid', dominant: 'midnight navy', supporting: 'orchid', accent: 'electric violet', neutral: 'pearl', metallic: 'silver' },
  { name: 'Cherry Mocha', dominant: 'black cherry', supporting: 'mocha brown', accent: 'poppy red', neutral: 'vanilla' },
  { name: 'Saffron Cobalt', dominant: 'cobalt blue', supporting: 'saffron', accent: 'coral', neutral: 'warm white' },
  { name: 'Emerald Noir', dominant: 'deep emerald', supporting: 'near-black', accent: 'malachite', neutral: 'champagne', metallic: 'pale gold' },
  { name: 'Desert Bloom', dominant: 'sunbaked clay', supporting: 'dusty mauve', accent: 'cactus green', neutral: 'sand' },
  { name: 'Ocean Velvet', dominant: 'deep ocean blue', supporting: 'petrol teal', accent: 'sea-glass aqua', neutral: 'shell', metallic: 'pewter' },
  { name: 'Papaya Plum', dominant: 'ripe papaya', supporting: 'dark plum', accent: 'hot coral', neutral: 'cream' },
  { name: 'Silver Lilac', dominant: 'smoky lilac', supporting: 'charcoal', accent: 'icy lavender', neutral: 'white', metallic: 'liquid silver' },
  { name: 'Coffee Rose', dominant: 'espresso', supporting: 'rosewood', accent: 'dusty pink', neutral: 'oat' },
  { name: 'Solar Flare', dominant: 'marigold', supporting: 'burnt orange', accent: 'magenta', neutral: 'black', metallic: 'bright gold' },
  { name: 'Mint Merlot', dominant: 'deep merlot', supporting: 'cool mint', accent: 'berry', neutral: 'soft beige' },
  { name: 'Indigo Denim', dominant: 'dark indigo', supporting: 'washed blue', accent: 'copper orange', neutral: 'ecru', metallic: 'antique copper' },
  { name: 'Acid Romance', dominant: 'acid green', supporting: 'soft blush', accent: 'black cherry', neutral: 'ivory' },
  { name: 'Monochrome Cocoa', dominant: 'deep cocoa', supporting: 'chestnut', accent: 'caramel', neutral: 'latte' },
  { name: 'Ruby Ice', dominant: 'ruby red', supporting: 'icy blue', accent: 'deep burgundy', neutral: 'frost white', metallic: 'chrome' },
  { name: 'Lavender Moss', dominant: 'moss green', supporting: 'lavender', accent: 'aubergine', neutral: 'mushroom' },
  { name: 'Neon Night', dominant: 'black', supporting: 'ultraviolet', accent: 'laser cyan', neutral: 'cool gray' },
  { name: 'Peach Petrol', dominant: 'petrol blue', supporting: 'soft peach', accent: 'rust', neutral: 'bone' },
  { name: 'Wine and Brass', dominant: 'cabernet', supporting: 'deep brown', accent: 'fig', neutral: 'parchment', metallic: 'aged brass' },
  { name: 'Tropical Editorial', dominant: 'lush green', supporting: 'turquoise', accent: 'mango', neutral: 'black' },
  { name: 'Powder and Ink', dominant: 'ink navy', supporting: 'powder blue', accent: 'clear pink', neutral: 'paper white' },
  { name: 'Apricot Aubergine', dominant: 'aubergine', supporting: 'apricot', accent: 'raspberry', neutral: 'warm cream' },
  { name: 'Future Neutral', dominant: 'graphite', supporting: 'aluminum gray', accent: 'digital blue', neutral: 'porcelain', metallic: 'brushed silver' },
  { name: 'Golden Hour', dominant: 'warm terracotta', supporting: 'honey', accent: 'deep teal', neutral: 'sunlit cream', metallic: 'soft bronze' },
]

export function describePalette(palette: CuratedPalette) {
  return `${palette.name}: ${palette.dominant} dominant, ${palette.supporting} supporting, ${palette.accent} accent, ${palette.neutral} neutral${palette.metallic ? `, with restrained ${palette.metallic} metallic detail` : ''}`
}
