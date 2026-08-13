import { describe, expect, it } from 'vitest'
import { applyThemeDirection, holidayThemes, themeConcept, themeOptions, zodiacEssences, zodiacProfiles, zodiacThemes } from '.'
import { defaultSelections } from '../promptOptions'

describe('Shake theme categories', () => {
  it('contains every zodiac sign exactly once', () => {
    expect(zodiacThemes).toHaveLength(12)
    expect(new Set(zodiacThemes).size).toBe(12)
    expect(zodiacThemes).toEqual(expect.arrayContaining(['Aries', 'Cancer', 'Libra', 'Capricorn', 'Pisces']))
  })

  it('provides a broad inclusive holiday and observance library', () => {
    expect(holidayThemes.length).toBeGreaterThanOrEqual(30)
    expect(holidayThemes).toEqual(expect.arrayContaining(['Black History Month', 'Juneteenth', 'Kwanzaa', 'Christmas', 'Hanukkah', 'Diwali', 'Eid al-Fitr', 'Lunar New Year']))
    expect(themeOptions.holidays).toBe(holidayThemes)
  })

  it('turns a selected theme into an original concept anchor', () => {
    expect(themeConcept('zodiac', 'Leo')).toMatch(/Leo as solar charisma/)
    expect(themeConcept('holidays', 'Juneteenth')).toMatch(/Juneteenth celebration/)
    expect(themeConcept('zodiac', 'Leo')).toMatch(/Black woman/)
  })

  it('gives every sign a deep phrase library and coordinated fashion looks', () => {
    zodiacThemes.forEach((sign) => {
      expect(zodiacProfiles[sign].phrases.length).toBeGreaterThanOrEqual(6)
      expect(zodiacProfiles[sign].looks.length).toBeGreaterThanOrEqual(3)
      zodiacProfiles[sign].looks.forEach((look) => {
        expect(look.fashion.length).toBeGreaterThan(35)
        expect(look.typography.length).toBeGreaterThan(35)
      })
    })
  })

  it('coordinates different zodiac looks and matching typography', () => {
    const base = { ...defaultSelections }
    const aries = applyThemeDirection('zodiac', 'Aries', base, new Set(), () => 0)
    const pisces = applyThemeDirection('zodiac', 'Pisces', base, new Set(), () => 0.7)
    expect(aries.concept).toMatch(/Aries/)
    expect(pisces.concept).toMatch(/Pisces/)
    expect(aries.fashion).not.toBe(pisces.fashion)
    expect(aries.typography).not.toBe(pisces.typography)
    expect(zodiacProfiles.Aries.phrases).toContain(aries.phrase)
    expect(zodiacProfiles.Pisces.phrases).toContain(pisces.phrase)
  })

  it('respects a manually locked clothing choice', () => {
    const base = { ...defaultSelections }
    const result = applyThemeDirection('zodiac', 'Leo', base, new Set(['fashion']), () => 0)
    expect(result.fashion).toBe(base.fashion)
    expect(result.typography).not.toBe(base.typography)
  })

  it('never returns the same zodiac outfit or phrase when alternatives exist', () => {
    const first = applyThemeDirection('zodiac', 'Aquarius', { ...defaultSelections }, new Set(), () => 0)
    const next = applyThemeDirection('zodiac', 'Aquarius', first, new Set(), () => 0)
    expect(next.fashion).not.toBe(first.fashion)
    expect(next.phrase).not.toBe(first.phrase)
  })

  it('protects a unique elemental palette and embodied art direction for every sign', () => {
    const colorStories = zodiacThemes.map((sign) => zodiacEssences[sign].colors)
    expect(new Set(colorStories).size).toBe(12)
    zodiacThemes.forEach((sign) => {
      const result = applyThemeDirection('zodiac', sign, { ...defaultSelections }, new Set(), () => 0)
      expect(result.theme).toBe(sign)
      expect(result.themeCategory).toBe('zodiac')
      expect(result.themeDirection).toContain('MANDATORY SIGNATURE COLOR STORY')
      expect(result.themeDirection).toContain(zodiacEssences[sign].colors)
      expect(result.themeDirection).toContain('personification')
      expect(result.themeDirection).toContain('not merely a model wearing themed clothing')
    })
  })
})
