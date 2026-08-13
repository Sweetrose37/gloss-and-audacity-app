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

## Structure

- `src/components` — reusable dashboard and navigation surfaces
- `src/data` — navigation, creative mode, gallery, and style-selector data
- `src/hooks` — local project persistence
- `src/services` — prompt composition and controlled randomization
- `src/types` — shared application models
- `src/styles` — responsive visual system
- `public/assets` — generated imagery, icons, and future local fonts
