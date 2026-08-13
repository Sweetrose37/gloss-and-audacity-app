export interface TypographySystem { name: string; family: string; behavior: string; interaction: string }
const type = (name: string, family: string, behavior: string, interaction: string): TypographySystem => ({ name, family, behavior, interaction })

export const typographyLibrary: TypographySystem[] = [
  type('oversized condensed editorial', 'custom condensed display sans', 'very large scale with tight deliberate spacing', 'sits behind the focal figure'),
  type('high-contrast serif', 'elegant high-contrast display serif', 'dramatic thick-thin rhythm', 'anchors a luxury editorial hierarchy'),
  type('hand-painted script', 'original brush script', 'visible pressure shifts and connected rhythm', 'sweeps through one controlled open area'),
  type('bubbly display', 'custom rounded display lettering', 'buoyant inflated counters', 'supports playful concepts without childish clutter'),
  type('retro groovy type', 'original 1970s-inspired display', 'soft curves and compressed spacing', 'forms one rhythmic phrase silhouette'),
  type('athletic block', 'custom varsity-inspired block', 'bold squared structure without team branding', 'creates strong garment-scale emphasis'),
  type('graffiti-inspired lettering', 'original hand-built urban lettering', 'energetic strokes without copying a known handstyle', 'crosses one foreground plane'),
  type('fashion-magazine type', 'editorial serif and restrained sans pairing', 'clear headline and subhead hierarchy', 'uses alignment as a fashion layout tool'),
  type('dimensional puff lettering', 'rounded display capitals', 'simulated raised depth and soft edge volume', 'functions as the hero material zone'),
  type('Human Typography', 'custom letter architecture', 'the figure and negative space complete select letterforms', 'keeps anatomy credible and every word readable'),
  type('stacked type', 'coordinated display family', 'phrases stack in disciplined tiers', 'locks to the figure’s vertical rhythm'),
  type('vertical type', 'narrow display capitals', 'reads in an intentional vertical sequence', 'balances a long portrait silhouette'),
  type('curved type', 'display lettering on a measured arc', 'consistent baseline and spacing', 'wraps around rather than distorting the figure'),
  type('framed type', 'decorative but legible display', 'forms a typographic perimeter', 'frames the character without covering the face'),
  type('type behind subject', 'bold editorial display', 'large background scale', 'uses clean occlusion while preserving word recognition'),
  type('type crossing foreground', 'strong display lettering', 'one deliberate foreground pass', 'never crosses eyes, mouth, or critical gesture'),
  type('type weaving through subject', 'custom dimensional lettering', 'alternates front and back at logical depth points', 'avoids impossible tangencies and remains readable'),
  type('lettering as architecture', 'structural geometric display', 'letterforms become platforms, columns, or frames', 'character placement respects the phrase order'),
  type('editorial subhead', 'clean supporting sans', 'small but readable secondary hierarchy', 'only appears when the user provides secondary wording'),
]

export function describeTypography(item: TypographySystem) {
  return `${item.name} using ${item.family}, with ${item.behavior}; it ${item.interaction}`
}
