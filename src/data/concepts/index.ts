export interface ConceptTerritory { name: string; angles: string[]; requestedOnly?: boolean }

export const conceptLibrary: ConceptTerritory[] = [
  { name: 'grown-woman humor', angles: ['seasoned discernment with a dry punchline', 'choosing ease over unnecessary explanation'] },
  { name: 'boundaries', angles: ['access is earned, not assumed', 'a graceful no that needs no defense'] },
  { name: 'protected peace', angles: ['quiet space treated as something precious', 'calm maintained through intentional distance'] },
  { name: 'quiet confidence', angles: ['presence without performance', 'certainty that does not require volume'] },
  { name: 'soft life', angles: ['tenderness supported by standards', 'comfort as an intentional practice'] },
  { name: 'work and career', angles: ['competence with creative authority', 'ambition directed by purpose rather than burnout'] },
  { name: 'creativity', angles: ['ideas becoming visible through disciplined play', 'original vision over trend imitation'] },
  { name: 'friendship', angles: ['chosen sisterhood with specific shared joy', 'friendship that makes room for growth'] },
  { name: 'motherhood', angles: ['identity and care existing together', 'maternal humor grounded in lived tenderness'], requestedOnly: true },
  { name: 'faith', angles: ['quiet trust through uncertain seasons', 'grace expressed without borrowed scripture'], requestedOnly: true },
  { name: 'introvert energy', angles: ['social battery protected with wit', 'rich inner life over forced availability'] },
  { name: 'fashion humor', angles: ['the outfit arriving before the explanation', 'getting dressed as decisive punctuation'] },
  { name: 'beauty rituals', angles: ['care routines as private ceremony', 'beauty preparation as creative authorship'] },
  { name: 'nostalgia', angles: ['memory translated through era-specific texture', 'familiar warmth without copying pop culture'] },
  { name: 'celebration', angles: ['joy with movement and specificity', 'marking the moment without generic slogans'] },
  { name: 'playful pettiness', angles: ['a tiny consequence delivered with immaculate composure', 'humor sharpened but not cruel'] },
  { name: 'ambition', angles: ['building quietly before the reveal', 'standards rising with the vision'] },
  { name: 'rest', angles: ['rest as maintenance rather than reward', 'stillness with dignity and intention'] },
  { name: 'social humor', angles: ['an observant truth about everyday performance', 'private thoughts meeting public etiquette'] },
]

export const phraseStructures = ['dry two-part observation', 'short declarative boundary', 'rhythmic three-beat phrase', 'fashion-editorial statement', 'playful call-and-response', 'understated one-line punchline']
