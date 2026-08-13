export type ThemeCategory = 'holidays' | 'zodiac'

export const holidayThemes = [
  "New Year's Day", 'Martin Luther King Jr. Day', 'Lunar New Year', 'Black History Month',
  "Valentine's Day", 'Mardi Gras / Carnival', "International Women's Day", "St. Patrick's Day",
  'Ramadan', 'Eid al-Fitr', 'Easter', 'Earth Day', "Mother's Day", 'Memorial Day',
  'Pride Month', "Father's Day", 'Juneteenth', 'Independence Day', 'Labor Day',
  "Grandparents' Day", 'Hispanic Heritage Month', "Indigenous Peoples' Day", 'Breast Cancer Awareness Month',
  'Halloween', 'Diwali', "Veterans Day", 'Thanksgiving', 'Hanukkah', 'Christmas', 'Kwanzaa',
  "New Year's Eve",
] as const

export const zodiacThemes = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
] as const

export const themeOptions: Record<ThemeCategory, readonly string[]> = {
  holidays: holidayThemes,
  zodiac: zodiacThemes,
}

export function themeConcept(category: ThemeCategory, theme: string) {
  return category === 'zodiac'
    ? `${theme} zodiac energy interpreted through an original Black women’s fashion-art concept without generic constellation clip art`
    : `${theme} celebration interpreted through an original Black women’s fashion-art concept with culturally thoughtful, occasion-relevant details`
}
