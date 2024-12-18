# Tubesaurus

Tubesaurus is a website to download YouTube videos. You can download videos in different formats and qualities and also download only the audio.

![Tubesaurus](./docs/screenshot.png)

## Requirements

- [Node.js](https://nodejs.org/en/)
- [ffmeg](https://ffmpeg.org/). You can install it using [Homebrew](https://brew.sh/) (`brew install ffmpeg`) for macOS.

## Run locally

```bash
npm run dev
```

## Linter

We use [Next lint](https://nextjs.org/docs/basic-features/eslint) and [Oxlint](https://oxc.rs/docs/guide/usage/linter) to lint the code.

```bash
npm run lint # Next lint
npx oxlint # Oxlint
```

## Format

We use [Prettier](https://prettier.io/) to format the code.

```bash
npm run format
```

### Check format

```bash
npm run check-format
```
