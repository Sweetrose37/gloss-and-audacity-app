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

The first build uses local browser state only. The API boundary is intentionally left open for future OpenAI image generation and prompt services.

## Structure

- `src/components` — reusable dashboard and navigation surfaces
- `src/data` — navigation, creative mode, gallery, and style-selector data
- `src/hooks` — local project persistence
- `src/types` — shared application models
- `src/styles` — responsive visual system
- `public/assets` — generated imagery, icons, and future local fonts
