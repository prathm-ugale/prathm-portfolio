# Prathmesh Ugale — Developer Portfolio

A personal portfolio website built with **React + Vite**. It is a **frontend-only** project: no backend server, no database, no login. Every piece of content lives in plain JavaScript files under `src/data/`, so updating the site means editing text — not hunting through components.

This README is written for someone who has just learned React. It explains how to run the project, how the files fit together, and what every folder is for. If a term is new to you, check the [Glossary](#glossary) at the bottom.

---

## Table of contents

1. [What the site contains](#1-what-the-site-contains)
2. [What you need installed](#2-what-you-need-installed)
3. [Run it in three commands](#3-run-it-in-three-commands)
4. [The npm scripts](#4-the-npm-scripts)
5. [How the app starts up](#5-how-the-app-starts-up)
6. [Project structure](#6-project-structure)
7. [The React concepts used here](#7-the-react-concepts-used-here)
8. [Component reference](#8-component-reference)
9. [Page reference](#9-page-reference)
10. [Editing the content (`src/data/`)](#10-editing-the-content-srcdata)
11. [Styling and theming](#11-styling-and-theming)
12. [Images: `public/` vs `src/assets/`](#12-images-public-vs-srcassets)
13. [The contact form (EmailJS)](#13-the-contact-form-emailjs)
14. [The Resume button](#14-the-resume-button)
15. [Accessibility and performance](#15-accessibility-and-performance)
16. [Deploying the site](#16-deploying-the-site)
17. [How to extend it](#17-how-to-extend-it)
18. [Troubleshooting](#18-troubleshooting)
19. [Glossary](#glossary)

---

## 1. What the site contains

Six pages plus a 404 page, all reachable from the navbar:

| Page | Route | What's on it |
| --- | --- | --- |
| Home | `/` | Hero introduction, key stats, featured projects, tech stack, call to action |
| About | `/about` | Bio, career summary, education, training & certifications, leadership roles |
| Work | `/work` | All projects in a grid, filterable by category |
| Experience | `/experience` | Job history as a vertical timeline |
| Skills | `/skills` | Skills grouped into categories |
| Contact | `/contact` | Contact details, profile links, and a working contact form |
| Not found | anything else | Friendly 404 with links back |

### The tech stack

| Concern | Choice | Why |
| --- | --- | --- |
| UI library | **React 19** | Component-based UI |
| Build tool | **Vite 8** | Instant dev server and fast production builds |
| Language | **JavaScript (JSX)** | No TypeScript, to keep the barrier low |
| Routing | **React Router DOM 7** | Multiple pages without a page reload |
| Styling | **Plain CSS** with custom properties | No Tailwind/Bootstrap to learn first |
| Icons | Inline SVG in `Icon.jsx` | No icon library dependency |
| Contact form | **EmailJS** (`@emailjs/browser`) | Sends email from the browser, so no backend |

Only four runtime dependencies: `react`, `react-dom`, `react-router-dom` and `@emailjs/browser`. That's deliberate — fewer moving parts to understand.

---

## 2. What you need installed

**Node.js** — Vite 8 requires Node `20.19+` or `22.12+`. Anything newer is fine.

Check what you have:

```bash
node -v    # should print v20.19.x or higher
npm -v     # comes bundled with Node
```

If Node is missing or too old, download the LTS build from [nodejs.org](https://nodejs.org). `npm` is installed automatically with it.

You do **not** need a database, a backend server, Docker, or a paid account of any kind to run this locally.

---

## 3. Run it in three commands

```bash
# 1. Install the dependencies listed in package.json (creates node_modules/)
npm install

# 2. Copy the environment file template (needed only for the contact form)
cp .env.example .env

# 3. Start the development server
npm run dev
```

The terminal prints something like:

```
  VITE v8.2.1  ready in 320 ms

  ➜  Local:   http://localhost:5173/
```

Open **http://localhost:5173** in your browser. Edit any file under `src/`, hit save, and the browser updates instantly without losing your place — that's **HMR** (hot module replacement).

Stop the server with `Ctrl + C`.

> The site runs fine without step 2. Skipping it just means the contact form shows a "not configured yet" note instead of sending email. See [section 13](#13-the-contact-form-emailjs).

---

## 4. The npm scripts

Defined in `package.json` under `"scripts"`, run with `npm run <name>`:

| Command | What it does | When you use it |
| --- | --- | --- |
| `npm run dev` | Starts the Vite dev server on port 5173 with hot reload | While developing |
| `npm run build` | Compiles everything into a `dist/` folder of static files | Before deploying |
| `npm run preview` | Serves the built `dist/` folder locally | To check the production build before shipping |
| `npm run lint` | Runs ESLint to catch mistakes and bad patterns | Before committing |

`npm run build` output looks like this — three small files plus images:

```
dist/index.html                   1.6 kB
dist/assets/index-xxxxxxx.css    30.7 kB
dist/assets/index-xxxxxxx.js    275.3 kB
```

That `dist/` folder is the entire website. It can be hosted anywhere that serves static files.

---

## 5. How the app starts up

Understanding this chain explains most of the project:

```
index.html                     the only real HTML file; contains <div id="root">
    │  loads /src/main.jsx
    ▼
src/main.jsx                   mounts React into #root
    │  wraps everything in <BrowserRouter> (enables routing)
    │  imports global.css + components.css (site-wide styles)
    ▼
src/App.jsx                    the layout shell + the route table
    │
    ├── <ScrollToTop />         scrolls to top when the route changes
    ├── <Navbar />              always visible
    ├── <main>                  ← the current page renders here
    │      <Routes>
    │        "/"           → <Home />
    │        "/about"      → <About />
    │        "/work"       → <Work />
    │        "/experience" → <Experience />
    │        "/skills"     → <Skills />
    │        "/contact"    → <Contact />
    │        "*"           → <NotFound />     (any unmatched URL)
    │      </Routes>
    └── <Footer />              always visible
```

Only the `<main>` region swaps when you navigate. The navbar and footer never re-mount, which is why navigation feels instant — no full page reload happens.

**Where does the content come from?** Pages don't contain hardcoded text. They import it:

```
src/data/site.js  ─┐
src/data/about.js  ├──▶  a page component  ──▶  .map() over the array  ──▶  reusable component
src/data/skills.js ┘         (Skills.jsx)                                     (SkillCard.jsx)
```

So to change what the site says, edit `src/data/*.js`. To change how it looks, edit `src/components/` and `src/styles/`.

---

## 6. Project structure

```
pratham-portfolio/
│
├── index.html                  Single HTML page. Holds <div id="root">, the <title>,
│                               SEO/social meta tags and the Google Fonts links.
├── vite.config.js              Vite setup — just enables the React plugin.
├── eslint.config.js            Linting rules.
├── package.json                Dependencies and the npm scripts.
├── .env                        Your EmailJS keys. Gitignored — never commit it.
├── .env.example                Template for .env, safe to commit.
├── .gitignore                  Files git should ignore (node_modules, dist, .env…).
│
├── public/                     Served as-is at the site root. Not processed by Vite.
│   ├── favicon.svg             Browser tab icon (modern browsers).
│   ├── favicon.ico             Fallback tab icon.
│   ├── images/projects/        Project preview images → used as "/images/projects/x.svg"
│   └── resume/                 Optional: put the resume PDF here instead of Drive.
│
└── src/
    ├── main.jsx                Entry point. Mounts React, sets up the router.
    ├── App.jsx                 Layout shell (navbar + main + footer) and the routes.
    │
    ├── assets/
    │   └── images/
    │       └── profile.png     Imported by About.jsx (see section 12).
    │
    ├── components/             Small, reusable building blocks.
    │   ├── Navbar.jsx          Top navigation + mobile hamburger menu.
    │   ├── Footer.jsx          Site footer.
    │   ├── Button.jsx          One button used everywhere (link or real button).
    │   ├── SectionTitle.jsx    Eyebrow + heading + subtitle block.
    │   ├── ProjectCard.jsx     A single project card.
    │   ├── SkillCard.jsx       One skill category card.
    │   ├── TimelineItem.jsx    One job in the experience timeline.
    │   ├── SocialLinks.jsx     Row of social icon links.
    │   ├── Icon.jsx            All SVG icons, looked up by name.
    │   ├── Reveal.jsx          Fades children in when scrolled into view.
    │   └── ScrollToTop.jsx     Resets scroll position on navigation.
    │
    ├── pages/                  One file per route. These compose components.
    │   ├── Home.jsx
    │   ├── About.jsx
    │   ├── Work.jsx
    │   ├── Experience.jsx
    │   ├── Skills.jsx
    │   ├── Contact.jsx
    │   └── NotFound.jsx
    │
    ├── data/                   ← ALL CONTENT LIVES HERE. Edit these files.
    │   ├── site.js             Name, role, email, phone, socials, nav links, stats.
    │   ├── about.js            Bio paragraphs, education, certifications, leadership.
    │   ├── projects.js         The project list.
    │   ├── experience.js       The job history.
    │   └── skills.js           Skill categories.
    │
    ├── config/
    │   └── emailjs.js          EmailJS setup + the sendContactEmail() function.
    │
    └── styles/                 One CSS file per area of the site.
        ├── global.css          Design tokens, CSS reset, layout, animations.
        ├── components.css      Buttons, tags, section titles, chips, 404.
        ├── navbar.css
        ├── footer.css
        ├── home.css
        ├── about.css
        ├── work.css
        ├── experience.css
        ├── skills.css
        └── contact.css
```

### Why this split?

- **`data/` separate from `pages/`** — you can update your job history without touching JSX, so there's less chance of breaking something.
- **`components/` separate from `pages/`** — a component is used in more than one place (`Button` appears on every page). A page is used once, by one route.
- **One CSS file per area** — you always know where a style lives. `navbar.css` only styles the navbar.

---

## 7. The React concepts used here

If you've just learned React, these are the exact concepts this project uses. Every one has a real example you can open.

### Components and props

A component is a function that returns JSX. Props are its inputs. `SectionTitle.jsx` is the simplest example:

```jsx
// Definition — props arrive as an object, destructured here
export default function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <header className="section-title">
      <p className="section-title__eyebrow">{eyebrow}</p>
      <h2 className="section-title__heading">{title}</h2>
      <p className="section-title__subtitle">{subtitle}</p>
    </header>
  );
}

// Usage in a page
<SectionTitle eyebrow="Skills" title="Tools and technologies" />
```

Note `className` instead of `class` — `class` is a reserved word in JavaScript.

### Rendering a list with `.map()` and `key`

Almost every section does this: take an array from `data/`, turn each item into a component.

```jsx
// src/pages/Skills.jsx
{skillCategories.map((category) => (
  <SkillCard key={category.id} category={category} />
))}
```

`key` must be unique and stable — React uses it to track which item is which. That's why every entry in `data/` has an `id`.

### Conditional rendering

Show something only when a value exists:

```jsx
{errors.name && <p className="field__error">{errors.name}</p>}
{isSending ? "Sending…" : "Send message"}
```

### `useState` — remembering things

Used in four places:

- `Work.jsx` — which category filter is active
- `Contact.jsx` — the form values, validation errors, sending state
- `Navbar.jsx` — whether the mobile menu is open, and whether the page has scrolled
- `Reveal.jsx` — whether the element has come into view yet

```jsx
const [activeFilter, setActiveFilter] = useState("All");
// ...
<button onClick={() => setActiveFilter(category)}>{category}</button>
```

Calling the setter re-renders the component with the new value.

### `useEffect` — talking to the browser

Used where React needs to touch something outside itself:

- `ScrollToTop.jsx` — call `window.scrollTo(0, 0)` whenever the route changes
- `Navbar.jsx` — listen to the window `scroll` event, and to the `Escape` key while the menu is open
- `Reveal.jsx` — create an `IntersectionObserver`

Each of those returns a cleanup function that removes the listener again:

```jsx
useEffect(() => {
  const onScroll = () => setIsScrolled(window.scrollY > 12);
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll); // cleanup
}, []);
```

The `[]` means "run once when mounted". `[pathname]` would mean "run again whenever `pathname` changes".

### `useMemo` — avoiding repeated work

`Work.jsx` derives the filtered project list. `useMemo` recalculates it only when the filter changes, not on every render:

```jsx
const visibleProjects = useMemo(
  () => (activeFilter === ALL ? projects : projects.filter((p) => p.category === activeFilter)),
  [activeFilter],
);
```

### `useRef` — pointing at a DOM node

`Reveal.jsx` needs the actual `<div>` in order to observe it:

```jsx
const elementRef = useRef(null);
// ...
<div ref={elementRef}>{children}</div>
```

### Routing

`main.jsx` wraps the app in `<BrowserRouter>`. `App.jsx` maps URLs to pages with `<Routes>` / `<Route>`.

Three ways to link, and they are **not** interchangeable:

| Use | For | Why |
| --- | --- | --- |
| `<Link to="/about">` | internal pages | Navigates without reloading the page |
| `<NavLink to="/about">` | navbar items | Same as `Link`, but knows when it's the active route |
| `<a href="https://...">` | external sites, `mailto:`, `tel:` | Leaves the app |

`NavLink` gives you an `isActive` flag, which is how the navbar underlines the current page:

```jsx
<NavLink to={path} className={({ isActive }) => (isActive ? "navbar__link--active" : "navbar__link")}>
```

The `<Route path="*">` at the bottom of `App.jsx` catches every unmatched URL and shows `NotFound`.

### The scroll animation

`Reveal.jsx` is a wrapper. Anything inside it starts invisible and fades up when it scrolls into view:

```jsx
<Reveal delay={90}>
  <ProjectCard project={project} />
</Reveal>
```

It uses the browser's `IntersectionObserver` — no animation library. It also checks `prefers-reduced-motion` and skips the animation entirely for users who have asked for less motion. The `delay` prop staggers a list so cards appear one after another.

---

## 8. Component reference

| Component | Props | Notes |
| --- | --- | --- |
| `Button` | `to`, `href`, `variant`, `size`, `icon`, `iconPosition`, `fullWidth`, plus anything else | Renders a `<Link>` if `to` is given, an `<a>` if `href` is given, otherwise a `<button>`. External `http` links automatically get `target="_blank"`. Variants: `primary`, `secondary`, `ghost`. Sizes: `sm`, `md`, `lg`. |
| `SectionTitle` | `eyebrow`, `title`, `subtitle`, `align`, `as`, `id` | `as="h1"` for a page's main heading, otherwise it renders `h2`. |
| `ProjectCard` | `project` | Takes one object from `data/projects.js`. |
| `SkillCard` | `category` | Takes one object from `data/skills.js`. |
| `TimelineItem` | `item`, `delay` | Takes one object from `data/experience.js`. Renders as an `<li>`. |
| `SocialLinks` | `size`, `className` | Reads `socialLinks` from `data/site.js` directly. |
| `Icon` | `name`, `size`, `className` | Looks the SVG up by name. Returns `null` for an unknown name, so a typo shows nothing rather than crashing. |
| `Reveal` | `children`, `delay`, `as`, `className` | Scroll-in fade. Use `as="li"` when it must render a list item. |
| `ScrollToTop` | — | Renders nothing; only runs an effect. |
| `Navbar` | — | Desktop links, hamburger menu under 860px, blurred background once scrolled, closes on `Escape`, locks page scroll while open. |
| `Footer` | — | Brand, nav links (from `data/site.js`), contact details, copyright. |

Available `Icon` names:

```
github  linkedin  twitter  mail  phone  location  arrowRight  arrowUpRight
download  external  menu  close  code  server  database  smartphone  cloud
wrench  check  send  briefcase  education  target  sparkle  activity  layers
```

To add one, drop a 24×24 SVG `<path>` into the `ICONS` object in `src/components/Icon.jsx`.

---

## 9. Page reference

| Page | Reads from | Interactive bits |
| --- | --- | --- |
| `Home.jsx` | `site.js` (hero, stats, core stack), `projects.js` (featured only) | None — presentation only |
| `About.jsx` | `about.js`, `site.js` | None. Uses a local `RecordList` helper for education + leadership |
| `Work.jsx` | `projects.js` | Category filter chips (`useState` + `useMemo`) |
| `Experience.jsx` | `experience.js` | None |
| `Skills.jsx` | `skills.js` | None |
| `Contact.jsx` | `site.js`, `config/emailjs.js` | Full form: validation, sending state, success/error messages |
| `NotFound.jsx` | — | None |

---

## 10. Editing the content (`src/data/`)

This is the part you'll touch most. Nothing here is React — they're plain JavaScript objects and arrays.

### `site.js` — your identity

Drives the navbar, footer, hero and metadata. Change your name here and it updates everywhere.

```js
export const site = {
  name: "Prathmesh Ugale",
  firstName: "Prathmesh",
  initials: "PU",                      // the little square logo in the navbar
  role: "Java Full Stack Developer",   // big hero headline
  currentRole: "Java Backend Developer",
  currentCompany: "LTM (LTIMindtree)",
  tagline: "…",                        // one-liner under page titles and in the footer
  location: "Navi Mumbai, India",
  email: "prathm.ugale@gmail.com",
  phone: "8454060784",
  status: "…",                         // the green pill on the hero and contact page
  resumeUrl: "https://drive.google.com/…",
  intro: "…",                          // hero paragraph
};
```

Also exported from this file:

- `navLinks` — add an entry and it appears in **both** the navbar and the footer
- `socialLinks` — each needs `label`, `icon` (an `Icon` name) and `url`
- `stats` — the four numbers on the home page
- `coreStack` — the tech pills on the home page

### `projects.js` — add a project

```js
{
  id: "my-project",            // required, unique; used as the React key
  title: "My Project",         // required
  category: "Web App",         // required; also becomes a filter chip on /work
  description: "One or two sentences about what it does.",   // required
  tech: ["React", "Node.js"],  // required; rendered as tags
  image: "/images/projects/my-project.svg",   // required; file in public/images/projects/
  featured: true,              // true = also show on the home page

  // Everything below is optional — leave it out and that bit simply isn't rendered:
  highlights: ["Something notable about it."],   // bullet list with ticks
  year: "2024",                                  // shown next to the category
  github: "https://github.com/you/my-project",   // adds a "Code" button
  demo: "https://my-project.example.com",        // adds a "Live Demo" button
}
```

The two current projects set neither `github` nor `demo`, so no link buttons render on their
cards — add either key and the button appears. (`shortTitle` also appears in the data file but
nothing reads it yet; it's harmless to leave or remove.)

### `experience.js` — add a job

Newest first. The timeline renders however many entries exist.

```js
{
  id: "company-name",
  company: "Company Name",
  position: "Your Title",
  type: "Full-time",
  duration: "Jan 2025 — Present",
  current: true,               // highlights the timeline dot in the accent colour
  facts: [                     // optional label/value chips
    { label: "Client", value: "Some Bank" },
  ],
  summary: "One line of context.",
  responsibilities: ["What you did.", "Something else you did."],
  tech: ["Java", "Spring Boot"],
  compact: true,               // optional: smaller card, good for internships
}
```

### `skills.js` — add a category or skill

```js
{
  id: "frontend",
  title: "Frontend",
  icon: "layers",              // must be a name from Icon.jsx
  description: "Short line under the title.",
  skills: ["React", "Angular", "CSS"],
}
```

### `about.js` — the About page

- `paragraphs` — array of strings, one per paragraph
- `career` — the three "what I work on" cards (`title` + `body`)
- `education`, `leadership` — need `id`, `title`, `institution`, `duration`, optional `detail`
- `training`, `certifications` — plain arrays of strings

**Two rules for all data files:** every list item needs a unique `id` (or a unique string), and if you break the JavaScript syntax — a missing comma or quote — the terminal and browser will both tell you the exact line.

---

## 11. Styling and theming

Plain CSS, no framework. Two files load for every page (`global.css` and `components.css`, imported in `main.jsx`); the rest are imported by the component that needs them, e.g. `Navbar.jsx` imports `navbar.css`.

### Design tokens

The top of `src/styles/global.css` defines every colour, space and radius as a CSS custom property. Change a value there and it applies site-wide.

```css
:root {
  --bg: #08090c;              /* page background   */
  --surface: #101318;         /* card background   */
  --text: #e9ebf0;            /* body text         */
  --text-muted: #a3aab9;      /* secondary text    */

  --accent: #4fd6a8;          /* primary accent    */
  --accent-2: #7aa2ff;        /* gradient partner  */
  --accent-ink: #04140e;      /* text on accent    */

  --radius: 14px;
  --transition: 220ms var(--ease);
  --container: 1160px;        /* max content width */
}
```

**To retheme the whole site**, change `--accent`, `--accent-2` and `--accent-ink`. That's it — every button, tag, icon and gradient reads from them.

### Class naming

Loose BEM: `block__element--modifier`.

```
.project-card              the block
.project-card__title       an element inside it
.btn--primary              a variant of .btn
```

This keeps CSS predictable without needing CSS modules or styled-components.

### Responsive design

Mobile-friendly by default: grids use `repeat(auto-fill, minmax(...))`, and font sizes use `clamp()` so they scale with the viewport. Explicit breakpoints:

| Width | What changes | File |
| --- | --- | --- |
| `980px` | Hero becomes one column | `home.css` |
| `900px` | Contact page becomes one column | `contact.css` |
| `860px` | Navbar switches to the hamburger menu | `navbar.css` |
| `860px` | About intro becomes one column | `about.css` |
| `760px` | Footer becomes one column | `footer.css` |
| `640px` | Timeline rail and dates tighten up | `experience.css` |
| `560px` | Hero buttons and form fields stack full width | `home.css`, `contact.css` |
| `420px` | Navbar shows only the monogram, not the full name | `navbar.css` |

Test by resizing the browser, or with the device toolbar in DevTools (`Cmd/Ctrl + Shift + M`).

---

## 12. Images: `public/` vs `src/assets/`

This trips up most people new to Vite. There are two ways to add an image and they behave differently.

**`public/`** — copied to the output untouched. Reference it with an absolute path starting `/`:

```jsx
<img src="/images/projects/agrolink.svg" alt="AgroLink preview" />
```

Use this for project screenshots, the favicon, PDFs. The filename stays exactly as you wrote it.

**`src/assets/`** — processed by Vite. You must `import` it:

```jsx
import profileImage from "../assets/images/profile.png";

<img src={profileImage} alt="Portrait" />
```

Vite renames it with a hash (`profile-zTXgxXdH.png`) for cache-busting, and the build fails loudly if the file is missing — a useful safety net.

> Keep photos small. A 1.7 MB PNG makes the site noticeably slower to load; resizing to roughly 800px wide is usually plenty.

---

## 13. The contact form (EmailJS)

The form sends real email through [EmailJS](https://www.emailjs.com) directly from the browser — that's how a site with no backend can still deliver mail. All configuration is in `src/config/emailjs.js`, which exports `sendContactEmail()` and `isEmailjsConfigured`.

### Step 1 — environment variables

```bash
cp .env.example .env
```

Then fill in `.env`:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Where to find each value in the [EmailJS dashboard](https://dashboard.emailjs.com):

| Variable | Location |
| --- | --- |
| `VITE_EMAILJS_SERVICE_ID` | **Email Services** → your service |
| `VITE_EMAILJS_TEMPLATE_ID` | **Email Templates** → your template |
| `VITE_EMAILJS_PUBLIC_KEY` | **Account → General** |

Three things worth knowing:

- The `VITE_` prefix is required. Vite only exposes variables with that prefix to the browser, via `import.meta.env.VITE_…`.
- These three values are **public** by design — they end up in the built JavaScript, and that's fine. The EmailJS **private key** is server-side only and must never appear in this project.
- **Restart `npm run dev` after editing `.env`.** Env vars are read at startup, not live.

`.env` is gitignored. `.env.example` is committed as the template.

### Step 2 — the email template

In the EmailJS dashboard, create a template with these exact variable names:

**Subject**

```
New Contact Form Submission — {{subject}}
```

**Body**

```
You have received a new contact form submission.

Name: {{name}}
Email: {{email}}
Subject: {{subject}}

Message:
{{message}}

Reply directly to the user's email:
{{email}}
```

Also set the template's **Reply To** field to `{{email}}`, so hitting reply goes to the sender rather than to yourself.

### How the form behaves

- Validates before sending: name required, email required and format-checked, subject required, message at least 20 characters. Errors appear under each field.
- While sending: the button reads `Sending…` and is disabled, so it can't be submitted twice.
- On success: a confirmation message appears and the fields clear.
- On failure: a friendly error appears, **your typed message is preserved**, and the technical detail goes to the browser console for debugging.
- Before you add the keys: the form shows a short "not configured yet" note, and submitting shows an error instead of making a network request.

---

## 14. The Resume button

The Resume buttons on Home, About and Experience all read one value:

```js
// src/data/site.js
resumeUrl: "https://drive.google.com/drive/folders/1lqw7Jc43QfcQ5i7EIcru3bobuA0wCIbA",
```

`Button` sees a URL starting with `http` and renders `<a target="_blank" rel="noreferrer noopener">`, so it opens in a new tab and doesn't download automatically. To host the PDF with the site instead, put it in `public/resume/` and set `resumeUrl` to `/resume/your-file.pdf`.

---

## 15. Accessibility and performance

Worth knowing about, because it's easy to break accidentally:

- **Semantic HTML** — real `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>` elements, and exactly one `<h1>` per page.
- **Skip link** — press `Tab` on any page: the first stop is "Skip to main content".
- **Keyboard support** — every interactive element has a visible focus ring. The mobile menu closes with `Escape`.
- **Form accessibility** — real `<label>` elements, `aria-invalid` on failed fields, `aria-describedby` pointing to error text, and an `aria-live` region so success/error is announced by screen readers.
- **Reduced motion** — all animation is disabled for users with `prefers-reduced-motion: reduce`.
- **Images** — `alt` text everywhere, `loading="lazy"` and fixed `width`/`height` on project images to prevent layout shift.

If you add a new interactive element, give it a label and make sure you can reach it with `Tab`.

---

## 16. Deploying the site

Build first, then upload the `dist/` folder:

```bash
npm run build
npm run preview   # check it locally at http://localhost:4173
```

### One thing you must configure: SPA fallback

Routing happens in the browser, so the server really only has `index.html`. If someone opens `yoursite.com/work` directly, the server looks for a `/work` file, doesn't find it, and returns 404. The fix is telling the host to serve `index.html` for every path:

| Host | What to do |
| --- | --- |
| **Vercel** | Nothing — it detects Vite and handles this automatically |
| **Netlify** | Add a file `public/_redirects` containing `/*  /index.html  200` |
| **GitHub Pages** | Copy `dist/index.html` to `dist/404.html`, and set `base: "/repo-name/"` in `vite.config.js` |

### Don't forget the env vars

`.env` is gitignored, so your host never sees it. Add the three `VITE_EMAILJS_*` variables in the host's dashboard (Vercel: *Settings → Environment Variables*; Netlify: *Site configuration → Environment variables*) and redeploy. They're read at **build** time, so a redeploy is required after changing them.

---

## 17. How to extend it

### Add a new page

Three steps:

```jsx
// 1. Create src/pages/Blog.jsx
export default function Blog() {
  return (
    <div className="page">
      <div className="container">
        <h1>Blog</h1>
      </div>
    </div>
  );
}
```

```jsx
// 2. Register the route in src/App.jsx
import Blog from "./pages/Blog";
// ...inside <Routes>
<Route path="/blog" element={<Blog />} />
```

```js
// 3. Add it to navLinks in src/data/site.js — navbar AND footer pick it up
{ label: "Blog", path: "/blog" },
```

Keep the `<div className="page"><div className="container">` wrapper so spacing and max-width match the other pages.

### Add a new section to an existing page

Follow the pattern the other sections use:

```jsx
<section className="section" aria-labelledby="my-heading">
  <div className="container">
    <Reveal>
      <SectionTitle eyebrow="Label" title="My new section" id="my-heading" />
    </Reveal>
    {/* your content, ideally wrapped in <Reveal> */}
  </div>
</section>
```

### Add a new component

Put it in `src/components/`, give it a clear name, keep it presentational (props in, JSX out), and put its styles in the relevant `src/styles/*.css` file rather than inline.

---

## 18. Troubleshooting

| Problem | Cause and fix |
| --- | --- |
| `command not found: npm` | Node isn't installed. Install the LTS build from [nodejs.org](https://nodejs.org). |
| `Cannot find module` / `Failed to resolve import` | Dependencies missing or an import path typo. Run `npm install`; check the path is relative (`../data/site`) and the file exists. |
| Port 5173 already in use | Another dev server is running. Stop it with `Ctrl + C`, or run `npm run dev -- --port 3000`. |
| Blank white page | Open the browser console (`F12`). A red error usually names the file and line — often a typo in JSX or a missing import. |
| Changes don't show up | Make sure you saved, and that you're looking at the `npm run dev` URL. If it persists, stop the server and start it again. |
| `.env` changes have no effect | Env vars load at startup. Restart `npm run dev`. Also confirm the names start with `VITE_`. |
| Contact form shows "not configured yet" | `.env` is missing, or still contains the `your_…` placeholders. See [section 13](#13-the-contact-form-emailjs). |
| Contact form errors out on send | The IDs are wrong, or the EmailJS template variables don't match `{{name}} {{email}} {{subject}} {{message}}`. Check the console for the exact error. |
| An image doesn't load | In `public/`? Use an absolute path (`/images/...`). In `src/assets/`? You must `import` it. See [section 12](#12-images-public-vs-srcassets). |
| Sections stay invisible | `Reveal` shows content when it scrolls into view. If something never appears, check the console for a JS error — a crashed effect stops the observer. |
| 404 after deploying when refreshing `/work` | Missing SPA fallback. See [section 16](#16-deploying-the-site). |
| `npm run lint` reports an error | Read the message — it names the file, line and rule. Most are quick fixes (unused import, missing `key`). |

---

## Glossary

| Term | Meaning |
| --- | --- |
| **JSX** | The HTML-like syntax inside JavaScript. Compiles to `React.createElement` calls. |
| **Component** | A function returning JSX. A reusable piece of UI. |
| **Props** | The inputs to a component, passed like HTML attributes. |
| **State** | Data a component remembers between renders. Changing it re-renders the component. |
| **Hook** | A `use…` function that adds a capability to a component (`useState`, `useEffect`, `useMemo`, `useRef`). |
| **Vite** | The build tool. Runs the dev server and bundles the production build. |
| **HMR** | Hot module replacement — updating the page on save without a full reload. |
| **SPA** | Single-page application. One HTML file; JavaScript swaps the content as you navigate. |
| **Route** | A URL pattern mapped to a component. |
| **CSS custom property** | A variable in CSS, like `--accent: #4fd6a8`, used as `var(--accent)`. |
| **BEM** | A CSS naming convention: `block__element--modifier`. |
| **`dist/`** | The built output folder — the actual website that gets deployed. |
| **`node_modules/`** | Installed dependencies. Never edited or committed; recreated by `npm install`. |
| **Linting** | Automatic checking for mistakes and inconsistent style. |
| **Environment variable** | A config value kept outside the code, loaded from `.env`. |

---

Built with React, Vite and React Router. Content lives in `src/data/` — start there.
