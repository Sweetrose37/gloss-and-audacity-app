export interface FashionDirection { name: string; garments: string; fabric: string; silhouette: string; construction: string }
const fashion = (name: string, garments: string, fabric: string, silhouette: string, construction: string): FashionDirection => ({ name, garments, fabric, silhouette, construction })

export const fashionLibrary: FashionDirection[] = [
  fashion('luxury editorial', 'architectural column dress', 'fluid crepe with restrained sheen', 'elongated and statuesque', 'precise couture seaming'),
  fashion('street couture', 'cropped moto jacket and wide trousers', 'matte faux leather and structured twill', 'strong shoulders over relaxed volume', 'purposeful paneling and topstitching'),
  fashion('tailored minimalism', 'single-breasted suit and clean shell', 'fine wool suiting', 'sharp but unfussy', 'crisp lapels and disciplined seams'),
  fashion('glam', 'draped evening jumpsuit', 'liquid satin', 'body-skimming with controlled volume', 'gathered waist and clean finish'),
  fashion('soft feminine', 'midi dress with shaped sleeves', 'silk chiffon over matte lining', 'gentle movement and defined waist', 'delicate gathers without excess ornament'),
  fashion('retro modern', 'cropped jacket and high-waist skirt', 'textured woven cloth', 'neat hourglass proportion', 'graphic vintage-inspired tailoring'),
  fashion('70s soul', 'wide-leg suit with a fitted knit', 'velvet and fine rib knit', 'long flared line', 'broad collar and confident waist shaping'),
  fashion('80s glamour', 'strong-shoulder cocktail dress', 'taffeta with controlled luster', 'dramatic upper volume and narrow waist', 'sculpted sleeve construction'),
  fashion('90s editorial', 'minimal slip dress and long coat', 'silk satin and wool', 'lean relaxed column', 'clean bias cut and spare tailoring'),
  fashion('Y2K', 'fitted cropped jacket and cargo skirt', 'technical satin and cotton twill', 'compact top with low elongated line', 'utility seams used selectively'),
  fashion('avant-garde', 'conceptual coat-dress', 'bonded textile', 'unexpected asymmetrical volume', 'engineered folds and disciplined negative space'),
  fashion('sculptural fashion', 'molded peplum top and tapered trouser', 'structured faille', 'geometric waist emphasis', 'architectural darts and curved panels'),
  fashion('sporty luxe', 'track-inspired jacket and fluid trouser', 'matte performance knit', 'streamlined relaxed silhouette', 'refined piping without logos'),
  fashion('professional fashion', 'modern wrap blazer and straight trouser', 'seasonless suiting', 'composed and mobile', 'clean closures and functional tailoring'),
  fashion('casual elevated', 'fine knit set with an overshirt', 'soft knit and washed twill', 'easy layered proportion', 'quiet finishing and deliberate fit'),
  fashion('romantic', 'flowing blouse and sweeping skirt', 'organza and soft crepe', 'airborne volume grounded at the waist', 'poetic sleeves and subtle pleating'),
  fashion('futuristic', 'modular tunic and tapered trouser', 'metallic textile and matte neoprene', 'sleek segmented silhouette', 'precision bonded construction'),
  fashion('artistic eclectic', 'layered asymmetric separates', 'mixed woven textures', 'rhythmic creative proportion', 'considered patchwork without branded motifs'),
]

export function describeFashion(item: FashionDirection) {
  return `${item.name}: ${item.garments} in ${item.fabric}, with a ${item.silhouette} and ${item.construction}; keep accessories restrained and concept-driven`
}
