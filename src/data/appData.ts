import {
  Bookmark, Box, FolderHeart, Home, Lightbulb, Maximize, PenLine,
  RefreshCcw, Sparkles, WandSparkles, Images, Ruler, Workflow,
} from 'lucide-react'
import type { CreativeMode, NavItem } from '../types'

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'build', label: 'Build With Me', icon: PenLine },
  { id: 'shake', label: 'Shake The Box', icon: Box },
  { id: 'idea', label: 'I Have An Idea', icon: Lightbulb },
  { id: 'remix', label: 'Remix My Prompt', icon: RefreshCcw },
  { id: 'collection', label: 'Collection Builder', icon: Workflow },
  { id: 'saved', label: 'Saved Prompts', icon: Bookmark },
  { id: 'sizing', label: 'Sizing & Measurements', icon: Ruler },
  { id: 'gallery', label: 'Inspiration Gallery', icon: Images },
]

export const creativeModes: CreativeMode[] = [
  { id: 'build', title: 'Build With Me', description: 'Step-by-step prompt builder with complete creative control.', action: 'Build', icon: PenLine },
  { id: 'shake', title: 'Shake The Box', description: 'Randomized creative engine for fresh, unexpected concepts.', action: 'Shake It', icon: Box },
  { id: 'idea', title: 'I Have An Idea', description: 'Turn your raw idea into a detailed, production-ready prompt.', action: 'Start', icon: Lightbulb },
  { id: 'remix', title: 'Remix My Prompt', description: 'Refine, expand, or reimagine an existing prompt.', action: 'Remix', icon: RefreshCcw },
  { id: 'collection', title: 'Collection Builder', description: 'Create matching series, bundles, or themed collections.', action: 'Build Collection', icon: FolderHeart },
]

export const galleryItems = [
  { title: 'Unbothered\nBy Opinions', position: '64% 35%', tone: 'pink' },
  { title: 'Minding\nMy Peace', position: '74% 29%', tone: 'gold' },
  { title: 'Protect\nMy Peace', position: '63% 38%', tone: 'gold' },
  { title: 'Make Them\nStop & Stare', position: '72% 42%', tone: 'pink' },
  { title: 'Level Up\nLoading…', position: '60% 28%', tone: 'pink' },
  { title: 'Soft Life\nStrong Mind', position: '70% 32%', tone: 'gold' },
]

export const skinTones = ['#3b1f17', '#5c2f1e', '#7c4329', '#9a5f3c', '#b87a50', '#d59a70']
export const moods = ['Boss Energy', 'Soft & Pretty', 'Unbothered', 'Luxury', 'Street Chic', 'Bold & Edgy']
export const palettes = [
  ['#650d27', '#f3d9d4', '#f1c45f'],
  ['#402515', '#090909', '#c39746'],
]
export const effects = [
  { name: 'Gold Glitter', className: 'glitter' },
  { name: 'Black Leather', className: 'leather' },
  { name: 'Gold Foil', className: 'foil' },
  { name: 'Quilted', className: 'quilt' },
]

export const featurePages = {
  build: { eyebrow: 'Guided Studio', title: 'Build With Me', body: 'Shape your design one intentional choice at a time.', icon: PenLine },
  shake: { eyebrow: 'Creative Wildcard', title: 'Shake The Box', body: 'Let unexpected combinations spark your next bestseller.', icon: WandSparkles },
  idea: { eyebrow: 'Idea Lab', title: 'I Have An Idea', body: 'Bring the spark. We’ll turn it into a production-ready prompt.', icon: Lightbulb },
  remix: { eyebrow: 'Prompt Refinery', title: 'Remix My Prompt', body: 'Polish what you have without losing what made it yours.', icon: RefreshCcw },
  collection: { eyebrow: 'Series Studio', title: 'Collection Builder', body: 'Build a cohesive family of graphics with one unmistakable point of view.', icon: Workflow },
  saved: { eyebrow: 'Your Archive', title: 'Saved Prompts', body: 'Your locally saved concepts, ready when inspiration strikes again.', icon: Bookmark },
  sizing: { eyebrow: 'Production Desk', title: 'Sizing & Measurements', body: 'Choose print-ready dimensions with confidence.', icon: Maximize },
  gallery: { eyebrow: 'Moodboard', title: 'Inspiration Gallery', body: 'A curated hit of color, attitude, and editorial energy.', icon: Images },
  home: { eyebrow: '', title: '', body: '', icon: Sparkles },
}
