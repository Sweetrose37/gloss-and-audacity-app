import { beforeEach, describe, expect, it } from 'vitest'
import { artStyleLibrary, effectLibrary, phraseLibrary, poseLibrary } from '../data/creativeKnowledge'
import { characterTraits } from '../data/characters'
import { compositionLibrary } from '../data/compositions'
import { conceptLibrary } from '../data/concepts'
import { fashionLibrary } from '../data/fashion'
import { hairLibrary } from '../data/hair'
import { paletteLibrary } from '../data/palettes'
import { defaultSelections, optionGroups } from '../data/promptOptions'
import { typographyLibrary } from '../data/typography'
import { composePrompt } from '../services/promptEngine'
import { applyCreativeDirection, creativeWorldCount } from './creativeDirector'
import { resetOriginalityHistory } from './originality'

describe('expanded creative intelligence', () => {
  beforeEach(resetOriginalityHistory)

  it('provides knowledge-scale libraries instead of short preset lists', () => {
    expect(hairLibrary.length).toBeGreaterThanOrEqual(40)
    expect(fashionLibrary.length).toBeGreaterThanOrEqual(50)
    expect(typographyLibrary.length).toBeGreaterThanOrEqual(45)
    expect(paletteLibrary.length).toBeGreaterThanOrEqual(35)
    expect(compositionLibrary.length).toBeGreaterThanOrEqual(35)
    expect(poseLibrary.length).toBeGreaterThanOrEqual(45)
    expect(artStyleLibrary.length).toBeGreaterThanOrEqual(45)
    expect(phraseLibrary.length).toBeGreaterThanOrEqual(100)
    expect(effectLibrary.length).toBeGreaterThanOrEqual(30)
    expect(conceptLibrary.length).toBeGreaterThanOrEqual(45)
    expect(characterTraits.expressions.length).toBeGreaterThanOrEqual(20)
    expect(creativeWorldCount).toBeGreaterThanOrEqual(12)
  })

  it('keeps every creative field open to a user-written direction', () => {
    expect(optionGroups.every((group) => group.allowCustom)).toBe(true)
  })

  it('art-directs natural-language ideas as a coordinated visual world', () => {
    const result = applyCreativeDirection(defaultSelections, new Set(), 'A visionary technology founder designing the future', () => 0)
    expect(result.fashion).toMatch(/futuristic|metallic minimalism|future romantic|sculptural sportswear/i)
    expect(result.typography).toMatch(/modular geometric|digital editorial|shadow-built|runway stencil/i)
    expect(result.palette).toMatch(/Future Neutral|Silver Lilac|Neon Night|Midnight Orchid/)
    expect(result.phrase).toMatch(/FUTURE|AHEAD|NEXT VERSION/)
  })

  it('preserves fully custom art direction and applies non-explicit safeguards', () => {
    const custom = {
      ...defaultSelections,
      fashion: 'my original hand-painted sculptural coat with ribbon sleeves',
      typography: 'my own asymmetric lettering system built from folded paper',
      pose: 'my custom grounded pose with one hand lifted',
    }
    const prompt = composePrompt(custom).prompt
    expect(prompt).toContain(custom.fashion)
    expect(prompt).toContain(custom.typography)
    expect(prompt).toContain(custom.pose)
    expect(prompt).toContain('Keep the character and styling non-explicit')
  })

  it('creates an enormous local combination space before custom entries', () => {
    const total = optionGroups.reduce((count, group) => count * BigInt(Math.max(group.options.length, 1)), 1n)
    expect(total).toBeGreaterThan(10n ** 40n)
  })
})
