import { describe, expect, it } from 'vitest'
import { holidayThemes, themeConcept, themeOptions, zodiacThemes } from '.'

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
    expect(themeConcept('zodiac', 'Leo')).toMatch(/Leo zodiac energy/)
    expect(themeConcept('holidays', 'Juneteenth')).toMatch(/Juneteenth celebration/)
    expect(themeConcept('zodiac', 'Leo')).toMatch(/original Black women/)
  })
})
