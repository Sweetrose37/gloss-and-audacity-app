# GLOSS & AUDACITY™

Black Women’s Graphic Prompt Studio — a responsive React + TypeScript application shell built from the approved dashboard prototype.

## Run locally

```bash
npm install
npm run dev
```

Production verification:

```bash
npm run build
npm run lint
```

Phase 2 uses local browser state only and is strictly a prompt-building studio. It does not generate images or call paid APIs.

## Phase 2 workflows

- Build With Me — progressive guided prompt construction
- Shake the Box — compatible randomization with lockable choices
- I Have an Idea — preserves a rough idea while supplying missing art direction
- Remix My Prompt — selectively reworks an existing prompt
- Collection Builder — creates 4, 6, 8, or 12 coordinated prompts
- Final Prompt — copy, locally save, remix, or start another prompt

## Phase 3 creative intelligence

Structured libraries now guide character diversity, Black hair construction, fashion styling, composition, exact typography, curated palettes, engineered faux materials, effect zoning, concept territories, and compatible creative wildcards. Session-level originality logic rotates major creative dimensions and collections preserve a small set of shared DNA while varying the execution.

### Phase 3.1 Creative Intensity

Every creation workflow supports Restrained, Polished, Bold, Extra, and Audacious direction. The selected level changes composition complexity, typography interaction, material count, fashion drama, pose energy, supporting-element limits, depth, contrast, density, negative space, and surface engineering. Polished is the default.

## Phase 4 local prompt workspace

Saved Prompts is a persistent local workspace with prompt cards, favorites, recent items, search, filters, sorting, full-detail views, private notes, safe duplication and deletion, remix handoff, plain and structured text export, persistent collection management, ordered collection membership, and JSON backup/import-and-merge. Workspace data stays in the browser; no account or backend is required.

## Structure

- `src/components` — reusable dashboard and navigation surfaces
- `src/data` — navigation, creative mode, gallery, and style-selector data
- `src/data/*` — dedicated character, hair, fashion, composition, typography, palette, material, effect, concept, and wildcard libraries
- `src/engine` — originality tracking, compatibility checks, Shake intelligence, and collection variation
- `src/workspace` — validated workspace records, search/filter/sort, backup merge, exports, and safe collection membership operations
- `src/hooks` — local project persistence
- `src/services` — prompt composition and controlled randomization
- `src/types` — shared application models
- `src/styles` — responsive visual system
- `public/assets` — generated imagery, icons, and future local fonts
