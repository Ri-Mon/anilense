# AniLense — AI-Assisted Development Log

This document records the prompts used to build AniLense, how AI
assisted throughout, and the manual corrections made after reviewing
its output. See the project README for what AniLense is and how to
run it.

## Prompts Used

Development followed a granular, single-responsibility approach — one
prompt per file or feature, each with explicit constraints on what
*not* to touch, verified before moving to the next step. A fresh chat
session was used for each prompt to avoid context bleeding between
unrelated changes. Prompts are reproduced exactly as sent.

**1. Scaffold**
```
Initialize a new React application using Vite and JavaScript in this
existing folder, which already contains a README.md and LICENSE file —
do not modify or remove those.

Use functional components only.

Do not install any UI library or additional dependencies yet.

Do not add any anime-related functionality yet.

Do not create any folders beyond what Vite generates by default.
```

**2. Clean the starter**
```
Remove the default Vite starter content from this React app.

Remove the default logo, counter button, and demo styling from App.jsx.

Replace App.jsx with a minimal functional component that renders a single
heading that says "AniLense".

Do not add any routing, state management, or API-related code yet.

Do not install any new dependencies.

Do not modify the folder structure.
```

**3. Service layer**
```
Create a new file at src/services/jikanService.js.

Add a single exported async function called fetchCurrentSeasonAnime that
fetches data from the Jikan API's current season endpoint
(https://api.jikan.moe/v4/seasons/now).

The function should return the parsed JSON response.

If the fetch fails or the response is not ok, throw an error with a
clear message rather than returning undefined or null.

Do not add any React code, hooks, or components in this file.

Do not create any UI to display the data yet.

Do not add any other functions beyond fetchCurrentSeasonAnime.
```
*(Verified manually before wiring into any UI: added a temporary
`useEffect` in `App.jsx` to log the result, confirmed success in the
console, then reverted `App.jsx` back to just the heading before
committing.)*

**4. Hook layer**
```
Create a new file at src/hooks/useAnimeExplorer.js.

Create a custom hook called useAnimeExplorer that:
- Calls fetchCurrentSeasonAnime from src/services/jikanService.js
- Manages three pieces of state: data, loading, and error
- Sets loading to true before the fetch starts, and false after it
  completes or fails
- Automatically fetches on mount using useEffect
- Returns an object with { data, loading, error }

Do not render any JSX in this file.

Do not create any UI components here.

Do not add any additional state beyond data, loading, and error.

Do not add search, filtering, or any feature beyond fetching once on mount.
```

**5. Basic view**
```
In src/App.jsx, use the useAnimeExplorer hook from src/hooks/useAnimeExplorer.js.

Render the following based on the hook's state:
- While loading is true, show a simple loading message.
- If error is not null, show the error's message in place of the list.
- If data is available, render a list of anime. For each anime, display
  its title, image, airing status, and number of episodes.

The Jikan API response shape is { data: [ ...array of anime objects... ] }.
Each anime object has: title, images.jpg.image_url, status, and episodes.

Do not add search, filtering, or sorting yet.
Do not add any styling beyond what's needed to display the list readably.
Do not create separate component files yet — keep everything in App.jsx
for this step.
```

**6. Search logic**
```
In src/hooks/useAnimeExplorer.js, add search functionality:

- Add a new state value called searchTerm, initialized to an empty string.
- Add a function called setSearchTerm to update it.
- Derive a filteredData value: if searchTerm is empty, it equals the full
  fetched anime list; otherwise, it's the list filtered to anime whose
  title includes the searchTerm, case-insensitive.
- Return searchTerm, setSearchTerm, and filteredData from the hook, in
  addition to the existing data, loading, and error.

Do not make any new API calls for search — filter only the data already
fetched.

Do not modify fetchCurrentSeasonAnime or jikanService.js.

Do not add any UI or input elements — this prompt is state and logic only.
```

**7. Search UI**
```
In src/App.jsx, add a text input above the anime list that's bound to
searchTerm and setSearchTerm from useAnimeExplorer.

Change the list rendering to map over filteredData instead of data.data.

Do not change any logic in useAnimeExplorer.js.

Do not add any styling beyond a basic input element.

Do not add debouncing or any delay to the search input.
```

**8. Status filter logic**
```
In src/hooks/useAnimeExplorer.js, add status filtering:

- Add a new state value called statusFilter, initialized to "all".
- Add a function called setStatusFilter to update it.
- Update filteredData so that, in addition to the existing search
  filtering, it also filters by status: if statusFilter is "all",
  don't filter by status; otherwise, only include anime whose status
  field exactly matches statusFilter.
- Return statusFilter and setStatusFilter from the hook.

The Jikan status field values are: "Currently Airing", "Finished Airing",
"Not yet aired".

Do not add any UI or dropdown elements yet.
Do not modify the search filtering logic.
Do not make any new API calls.
```

**9. Status filter UI**
```
In src/App.jsx, add a dropdown (select element) above the anime list,
bound to statusFilter and setStatusFilter from useAnimeExplorer.

Include these options: "All" (value "all"), "Currently Airing",
"Finished Airing", "Not yet aired".

Do not change the search input or its behavior.
Do not modify any logic in useAnimeExplorer.js.
Do not add any styling beyond a basic select element.
```

**10. Season-specific fetch**
```
In src/services/jikanService.js, add a new exported async function
called fetchSeasonAnime that takes two parameters: year (a number) and
season (a string, one of "winter", "spring", "summer", "fall").

It should fetch from https://api.jikan.moe/v4/seasons/{year}/{season},
substituting the actual year and season values into the URL.

Follow the exact same error handling pattern as fetchCurrentSeasonAnime:
throw a clear error on network failure, throw a clear error on a
non-ok response, and handle a malformed JSON response safely.

Also apply the same deduplication logic by mal_id that fetchCurrentSeasonAnime
uses, so this function returns clean, duplicate-free data too.

Do not modify fetchCurrentSeasonAnime.
Do not add any React code to this file.
Do not export any new functions beyond fetchSeasonAnime.
```
*(Manually refactored afterward — see Manual Improvements.)*

**11. Season/year state**
```
In src/hooks/useAnimeExplorer.js, add support for browsing a specific
year and season instead of only the current season:

- Add two new state values: selectedYear (default: the current year)
  and selectedSeason (default: "current", meaning "use the current season").
- Add setSelectedYear and setSelectedSeason functions to update them.
- Update the existing useEffect so that:
  - If selectedSeason is "current", call fetchCurrentSeasonAnime.
  - Otherwise, call fetchSeasonAnime(selectedYear, selectedSeason).
  - The effect should re-run whenever selectedYear or selectedSeason
    changes, not just once on mount.
- Import fetchSeasonAnime alongside the existing fetchCurrentSeasonAnime
  import.
- Return selectedYear, setSelectedYear, selectedSeason, and setSelectedSeason
  from the hook.

Do not change the search or status filtering logic.
Do not change fetchCurrentSeasonAnime or fetchSeasonAnime themselves.
Do not add any UI or dropdown elements yet.
```

**12. Season/year UI**
```
In src/App.jsx, add controls for selecting a season and year, using
selectedSeason, setSelectedSeason, selectedYear, and setSelectedYear
from useAnimeExplorer:

- Add a select element for season with options: "Current Season"
  (value "current"), "Winter" (value "winter"), "Spring" (value "spring"),
  "Summer" (value "summer"), "Fall" (value "fall").
- Add a number input for year, but only render it when selectedSeason
  is not "current" — hide it entirely when "Current Season" is selected.
- The year input should be bound to selectedYear and setSelectedYear.

Do not change the search input, status dropdown, or their behavior.
Do not modify any logic in useAnimeExplorer.js.
Do not add any styling beyond basic form elements.
```

**13. Tailwind v4 setup**
```
Install Tailwind CSS v4 in this Vite + React project using the current
official method:

- Install the tailwindcss and @tailwindcss/vite packages as dev dependencies.
- Add the tailwindcss Vite plugin to vite.config.js alongside the existing
  React plugin.
- Add a single `@import "tailwindcss";` line to the top of src/index.css,
  replacing any conflicting existing CSS import structure if needed, but
  do not remove the existing CSS custom properties (the :root variables).

Do not use tailwind.config.js, npx tailwindcss init, or the older
@tailwind base/components/utilities directive syntax — this project uses
Tailwind v4's plugin-based setup, not the v3 config-file approach.

Do not apply any Tailwind utility classes to components yet — this prompt
is setup only.
```

**14. Card grid layout**
```
In src/App.jsx, restyle the anime list as a responsive card grid using
Tailwind CSS utility classes:

- Replace the current <ul>/<li> list with a responsive grid layout
  (e.g. grid-cols-2 on small screens, more columns on larger screens).
- Each anime should render as a card: image on top, title, status, and
  episode count inside, with reasonable padding and spacing.
- Use a clean, minimal look — white/light background, subtle borders
  or shadow, no heavy decoration.

Do not change any state, conditional logic (loading, error, success
checks), or the structure of what's inside each conditional block —
only add className attributes and adjust the JSX layout inside the
existing conditionals.

Do not modify useAnimeExplorer.js.

Do not add any color accents yet — keep this pass neutral (grays/white).
Color styling will be a separate step.
```

Styling beyond prompt 14 (dark theme, orange accent, sticky
navigation, spacing fixes) was done through direct manual edits rather
than further prompts — each change was small and well-understood
enough that a fresh AI session would have added overhead without
adding value. Prompts 15 and 16 returned to the prompt-driven approach
for cleanup and accessibility specifically, since those benefited from
a structured, verifiable request rather than ad hoc editing.

**15. Cleanup pass**
```
Clean up unused files and code in this project:

- Remove any unused default Vite assets (e.g. src/assets/react.svg,
  public/vite.svg) if they are not referenced anywhere in the code.
- Remove any unused imports across all files.
- Remove any unused CSS selectors in src/index.css that don't correspond
  to any element actually used in the app.

Do not remove README.md, LICENSE, package-lock.json, .gitignore, or
any file inside src/services, src/hooks, or the .github folder.

Do not change any application logic, state, or component structure —
this is a cleanup pass only.
```

**16. Accessibility and semantic review**
```
In src/App.jsx, do two things:

1. Add proper label associations for accessibility:
   - Add a <label> element for the search input and each dropdown
     (status, season, year), using htmlFor/id pairs.
   - If a visible label would clutter the layout, use a visually-hidden
     (sr-only) label that's still present in the DOM for screen readers.

2. Review the file for semantic HTML correctness:
   - Confirm the top-level wrapper is a semantic element (main), not a
     generic div.
   - Confirm the anime list uses appropriate semantic elements — a real
     list (ul/li) rather than divs styled to look like one.
   - Confirm headings follow a logical order (a single h1 for the page
     title, h2 for each anime card title, no skipped levels).
   - Report back any semantic issues you find and fix them, or tell me
     specifically if none exist.

Do not change any application logic, state, or existing visual styling
beyond what's needed for label association and semantic corrections.
Do not touch src/services or src/hooks.
```

## How AI Assisted

AI handled the mechanical first draft of every layer: scaffolding,
the service/hook/view architecture, the search and filter logic, and
the initial card-grid styling. The single-responsibility, "do not"-
bounded prompting style meant each piece arrived narrow enough to
verify in isolation — a lesson carried over from an earlier drill
(FE-03) where a broad "rebuild" prompt had silently discarded existing
UI elements. Applying that lesson here meant no equivalent regression
occurred during the initial build phase.

AI was notably useful for replicating an established pattern exactly
(prompt 10, the season-specific fetch function) rather than
reinventing it — explicitly telling it to copy an existing function's
error-handling shape produced a consistent result on the first try.

## Manual Improvements and Corrections

These were identified through direct code review and hands-on testing,
not generated by AI:

- **Hardened JSON parsing**: the original service function trusted
  `response.json()` to always succeed; added a try/catch so a malformed
  response produces a clear error instead of an uncaught exception.
- **Deduplication by `mal_id`**: discovered Jikan's seasonal endpoint can
  return duplicate entries (a known upstream data issue) via a React
  key-collision warning in the console. Traced it to the API response
  itself, not a rendering bug, and fixed it by deduplicating in the
  service layer rather than masking the symptom with array-index keys.
- **Stale error state**: caught that `error` state was never reset on a
  new fetch attempt — latent at the time (single fetch-on-mount), but
  would have surfaced a stale error alongside fresh data once
  season/year refetching was added later.
- **Removed a leftover early-return**: a restructured error-handling
  pattern was applied to fix controls disappearing on fetch failure,
  but the *old* early-return was never deleted — leaving two
  contradictory error-handling blocks in the same component, with the
  old one silently winning. Found through direct testing (forcing a
  real API error) rather than a code read.
- **Diagnosed a Tailwind v4 cascade-layer conflict**: custom CSS defined
  outside `@layer` was silently overriding utility classes with no
  error or warning, because unlayered CSS always wins over layered CSS
  regardless of specificity. Verified against Tailwind's own
  documentation before fixing, rather than guessing at a workaround.
- **Fixed inconsistent card heights**: CSS Grid stretches items to a
  row's tallest member, but the card's inner content didn't grow to
  match, leaving visible gaps on shorter cards. Fixed with a flex
  column layout so the content area fills available height.
- **Restored dropped classes during iterative styling**: on two
  occasions, rewriting a full `className` string for one fix
  accidentally dropped unrelated classes that were already working
  (layout spacing, flex behavior) — caught by comparing behavior before
  and after each change rather than assuming a fix was isolated.
- **Committed to a full dark theme rather than patching element by
  element**: repeated "this element doesn't match the dark theme"
  reports were actually one root cause — the page's base background
  was still light. Fixed once at the CSS variable level instead of
  continuing to patch individual components.
- **Fixed the page title and meta description**: `index.html` still
  carried Vite's default boilerplate title and no description, missed
  during earlier passes since neither is visible inside the app itself
  — only caught by checking the browser tab and running an SEO audit.

## Accessibility and Performance Verification

Rather than trust an AI's self-reported "this is accessible" claim,
the semantic HTML review (prompt 16) was explicitly worded to require
a definitive answer — either report specific issues found and fixed,
or state plainly that none exist. The response confirmed the existing
structure was already correct (`<main>` wrapper, `<ul>`/`<li>` list
markup, single `<h1>` with `<h2>` card headings) and added only the
missing label associations, verified with `npm run lint` and
`npm run build` before handing back the diff.

This was independently cross-checked with Chrome DevTools' Lighthouse
audit (mobile), rather than accepted on the AI's word alone:

- **Accessibility: 100**
- **Best Practices: 100**
- **SEO: 92** (86 before adding a meta description)
- **Performance: 56**

Performance was investigated, not ignored. Lighthouse's insight
breakdown attributed the score almost entirely to third-party image
delivery and cache headers from the Jikan/MyAnimeList CDN — factors
outside this app's control, since it has no ability to change how an
external server compresses, caches, or serves its own images.
`loading="lazy"` was added to defer off-screen image requests, which
measurably reduced Lighthouse's estimated data-transfer savings
(image delivery: 642 KiB → 148 KiB; cache lifetime: 225 KiB → 37 KiB)
without moving the overall Performance score — confirming the
remaining weight is genuinely upstream, not something further app-side
optimization would meaningfully fix. Given that, and time constraints
ahead of the next module, no further performance work was pursued.

## Known Limitation, Noted Rather Than Fixed

Native `<select>` dropdowns can be styled while closed, but the open
options list is rendered by the browser/OS in Chrome and Safari,
largely outside CSS's reach. Fully custom-styled dropdown options would
require replacing the native element with a custom component —
deliberately out of scope here given time constraints, and noted as a
conscious trade-off rather than an oversight.

## Future Plans

A stretch feature — flagging anime whose airing status says "Currently
Airing" but which hasn't had a new episode in an unusually long time —
was scoped but not built in this pass, given time constraints ahead of
the next module. Noted here as a planned enhancement, not a dropped
requirement.
