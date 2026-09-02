# AniLense

Find your next anime through a clearer lens.

AniLense is a seasonal anime discovery tool — browse what's currently
airing, search by title, filter by status, or look up a specific past
or upcoming season, without digging through an unfiltered wall of
listings.

## Background

Built for the **React app development with AI** assignment in the
[Front-End AI Engineering track](https://internship.flyrank.ai/tracks/fe)
of the FlyRank AI Internship, inspired by an internal mentor-led
session on AI-assisted React development. AniLense applies the same
AI-assisted, single-responsibility prompting approach demonstrated
there, applied to a different app and domain.

## Features

- Browse the current season's airing anime at a glance
- Look up any specific past or upcoming season by year
- Search by title, including English titles
- Filter by airing status (currently airing, finished, not yet aired)
- Resilient loading and error states that never block access to the
  filters themselves

## Tech Stack

- [React](https://react.dev/) — functional components and hooks only
- [Vite](https://vite.dev/) — build tooling and dev server
- [Tailwind CSS v4](https://tailwindcss.com/) — styling
- [Jikan API](https://docs.api.jikan.moe/) — unofficial MyAnimeList REST API, no key required

## Getting Started

```bash
git clone https://github.com/Ri-Mon/anilense.git
cd anilense
npm install
npm run dev
```

## AI-Assisted Development

This project was built using AI (GitHub Copilot) as a development
assistant, following a granular, single-responsibility prompting
approach with explicit constraints on each change. The full prompt
log, an explanation of how AI assisted throughout, and specific
examples of manual review and correction are documented in
[`PROMPTS.md`](./PROMPTS.md).

## Known Limitations

- Native `<select>` dropdown lists are styled when closed, but the
  open options list is rendered by the browser/OS in Chrome and
  Safari, outside CSS's reach — see `PROMPTS.md` for details.
- Lighthouse Performance score is constrained primarily by third-party
  image delivery from the Jikan/MyAnimeList CDN, which this app has no
  control over.

## Future Plans

1. Make each anime's title a clickable link that opens a detailed page
   for that title, including its description, an official trailer (if
   available), publisher/studio information, release date, and a list
   of its other seasons — each of which would itself be a clickable
   link for further exploration.
2. Flag anime marked "Currently Airing" that haven't had a new episode
   in an unusually long time, to surface titles that may have quietly
   gone on hiatus without an official announcement.

## License

MIT — see [`LICENSE`](./LICENSE).