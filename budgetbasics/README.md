# BudgetBasics — Student Financial Literacy Platform

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![React Router](https://img.shields.io/badge/React_Router-v7-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![AOS](https://img.shields.io/badge/AOS-2.3-blue)](https://michalsnik.github.io/aos/)

> **Empowering Students & Young Adults with Foundational Financial Literacy.**    
> **Official Contact:** [`decode@aptechgdn.net`](mailto:decode@aptechgdn.net)  
> **Repository:** [https://github.com/decodetechwiz/budgetbasics.git](https://github.com/decodetechwiz/budgetbasics.git)

---

## 📑 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Key Features & Modules](#-key-features--modules)
  - [1. User Authentication & Profile Management](#1-user-authentication--profile-management)
  - [2. Landing Page & Financial Pathways (`/`)](#2-landing-page--financial-pathways-)
  - [3. Financial Basics & Needs vs. Wants Game (`/basics`)](#3-financial-basics--needs-vs-wants-game-basics)
  - [4. 50/30/20 Budget Calculator (`/calculator`)](#4-503020-budget-calculator-calculator)
  - [5. Student Expense Tracker (`/exptracker`)](#5-student-expense-tracker-exptracker)
  - [6. Visual Infographics Gallery (`/infographics`)](#6-visual-infographics-gallery-infographics)
  - [7. About Us & Community Feedback (`/about`)](#7-about-us--community-feedback-about)
  - [8. BudgetBee AI Chatbot Widget](#8-budgetbee-ai-chatbot-widget)
  - [9. Interactive Sitemap Modal](#9-interactive-sitemap-modal)
  - [10. Header, Clock & Global Controls](#10-header-clock--global-controls)
  - [11. Responsive Footer](#11-responsive-footer)
- [🏗️ Code Structure & Architecture](#️-code-structure--architecture)
  - [Component Architecture & Data Flow](#component-architecture--data-flow)
  - [Authentication & Persistence Lifecycle](#authentication--persistence-lifecycle)
  - [Performance & Render Optimizations](#performance--render-optimizations)
- [📂 Project & Folder Structure](#-project--folder-structure)
- [🛠️ Tech Stack & Dependencies](#️-tech-stack--dependencies)
  - [Production Dependencies](#production-dependencies)
  - [Development Dependencies](#development-dependencies)
  - [External Design Assets & Fonts](#external-design-assets--fonts)
- [💻 Getting Started: Local Setup Guide](#-getting-started-local-setup-guide)
  - [1. Prerequisites](#1-prerequisites)
  - [2. Clone the Repository](#2-clone-the-repository)
  - [3. Navigate to Project Folder](#3-navigate-to-project-folder)
  - [4. Install Node Modules](#4-install-node-modules)
  - [5. Start Development Server](#5-start-development-server)
  - [6. Build for Production](#6-build-for-production)
  - [7. Code Quality & Linting](#7-code-quality--linting)
- [💾 Data Architecture & Local Storage Keys](#-data-architecture--local-storage-keys)
- [❓ Troubleshooting & FAQs](#-troubleshooting--faqs)
- [👥 Team & Acknowledgments](#-team--acknowledgments)

---

## 🌟 Overview

**BudgetBasics** is a fast, modern, and accessible Single Page Application (SPA) designed to demystify personal finance for college students, young professionals, and novice budgeters. Engineered with user privacy at its core, it operates with **zero bank account linking**, **zero cloud tracking**, and **no external database requirements** — all user profiles, calculations, and expense logs are safely stored entirely on the client device using HTML5 LocalStorage.

### Why BudgetBasics?
- **Financial Illiteracy Gap:** Many young adults face credit pitfalls, student debt, and subscription leaks without ever learning practical budgeting rules.
- **The 50/30/20 Framework:** Visualizes the gold standard of personal finance: 50% for Needs, 30% for Wants, and 20% for Savings and debt reduction.
- **Gamified Learning:** Replaces dry spreadsheets with interactive flashcard games, sound effects, and confetti celebrations.
- **Client-Side Authentication:** Lightweight, zero-backend authentication system with persistent session management, user avatars, and strict validation.
- **Blazing Performance:** Built with React 19 and Vite with code-splitting, lazy-loaded routes, isolated clock memoization, and responsive touch optimizations across mobile, tablet, and desktop devices.

---

## ✨ Key Features & Modules

### 1. User Authentication & Profile Management
- **Zero-Backend Architecture:** Powered entirely by HTML5 `localStorage` with zero database or server latency.
- **Pre-Registered Demo Users (`users.json`):** Comes pre-loaded with 2 student profiles:
  - **Alex Morgan:** `alexmorgan` | `alex123` | `alex.morgan@budgetbasics.org` (Finance Scholar)
  - **Sarah Chen:** `sarahc` | `sarah123` | `sarah.chen@budgetbasics.org` (Budget Explorer)
- **1-Click Quick Demo Login:** Instant one-tap sign-in buttons for demo accounts without typing credentials.
- **Session Persistence:** Once logged in, the active session is stored in `localStorage` (`budget_active_user`). Returning to the website automatically keeps the user logged in until they explicitly click **Log Out**.
- **Dynamic Header Button to Avatar Transformation:**
  - **Desktop / Bigger Screens:** Displays a "Sign In" button on the navbar. When logged in, dynamically morphs into a circular user avatar with an online status indicator. Clicking the avatar toggles an account popover showing Full Name, `@username`, Email, College / Major, and Log Out action.
  - **Mobile / Smaller Screens:** Prominently presented inside the mobile navigation drawer. When logged in, displays a dedicated user profile card with avatar, Full Name, `@username`, and email with calibrated x-axis padding.
- **Strict Registration Input Validation:**
  - **Full Name:** Strictly restricts input to alphabetic letters (`A-Z`, `a-z`) and spaces only. Numbers and special characters are prevented on keystroke and sanitized on paste.
  - **Username:** Cannot start with a number or special character (must begin with a letter). Only alphanumeric characters and the specific symbols `(- _ & .)` are permitted.
- **Avatar Preset Selector:** Allows users to choose between diverse student avatar illustrations during sign-up, with fallback generation via UI-Avatars.

### 2. Landing Page & Financial Pathways (`/`)
- **Interactive Hero Section:** Bold typography, value proposition chips, and direct call-to-action buttons.
- **Interactive Decision Tree:** Explore branching scenarios based on real student situations (e.g., managing part-time income, handling sudden expenses).
- **Core Pillars Overview:** At-a-glance introduction to Budgeting, Tracking, and Needs vs. Wants classification.
- **Dynamic FAQ Accordion:** Search engine optimized with Schema.org `FAQPage` structured data to answer common student finance queries.

### 3. Financial Basics & Needs vs. Wants Game (`/basics`)
- **Core Educational Cards:** 3 visually animated cards covering *Income vs. Expenses*, *The 50/30/20 Rule*, and *Avoiding Impulse Purchases* with AOS scroll reveals.
- **Gamified Classification Quiz:** Real-time challenge where players test their intuition on items like groceries, gaming consoles, designer clothing, electricity bills, and rent.
- **Celebratory Feedback:** Instant visual feedback, streak scoring, and celebratory fireworks via `canvas-confetti` upon successful game completion.

### 4. 50/30/20 Budget Calculator (`/calculator`)
- **Instant Allocation Breakdown:** Enter any monthly allowance or income to see exact dollar amounts and percentage progress bars:
  - **50% Needs:** Housing, groceries, utilities, tuition, transportation.
  - **30% Wants:** Dining out, entertainment, hobbies, streaming subscriptions.
  - **20% Savings & Debt:** Emergency funds, investments, student loan payoff.
- **Student Income Presets:** Quick one-click buttons for typical student budgets ($500, $1,200, $2,500, $3,000).

### 5. Student Expense Tracker (`/exptracker`)
- **Live Session Planner:** Full CRUD functionality (Add, Edit, Delete, Reset) for tracking income and expenses.
- **Category Tagging:** Label expenses as **Need** or **Want** with badge indicators.
- **Dynamic Budget Variance Alerts:** Automatic warning banners when user spending exceeds the recommended 50% or 30% thresholds.
- **Smart Financial Insights:** Contextual tips generated dynamically based on current spending habits.
- **Data Persistence:** Expenses automatically persist across browser refreshes via `localStorage`.

### 6. Visual Infographics Gallery (`/infographics`)
- **High-Impact Financial Blueprints:**
  - *Emergency Fund Blueprint:* How to build a 3-to-6 month financial safety net.
  - *The Subscription Trap:* Exposing micro-transactions and recurrent billing drains.
  - *Smart Student Hacks:* Frugal living tactics tailored for college life.
- **Card Actions:** Interactive card expansions with key takeaways and summary badges.

### 7. About Us & Community Feedback (`/about`)
- **Team Decode Showcase:** Profiles, roles, and skills of team members (Nihal, Ahmed, Hamza, Mutahir).
- **Project Pillars & Mission:** Statement of educational intent for Techwiz 7.
- **Community Feedback Form:** Interactive review submission with real-time 5-star rating, category selectors, and client-side validation.
- **Live Testimonial Board:** Displays verified community reviews saved directly in browser storage.

### 8. BudgetBee AI Chatbot Widget
- **Floating AI Peer Assistant:** Accessible from every page in the bottom-right corner.
- **GSAP-Powered Animations:** Smooth slide and scale entrance transitions with backdrop filtering.
- **Intelligent Keyword Matching:** Answers inquiries regarding the 50/30/20 rule, emergency funds, differentiating needs from wants, and expense tracking.
- **Interactive Suggestion Chips:** One-click prompt bubbles to help first-time users ask questions quickly.

### 9. Interactive Sitemap Modal
- **Full Application Directory:** Triggered from the navbar or footer to give users immediate access to all pages and sections.
- **Live Filter Search:** Instant client-side search box to filter sitemap links in real time.
- **Keyboard Friendly:** Supports `Escape` key to close.

### 10. Header, Clock & Global Controls
- **Memoized Real-Time Clock (`<LiveClock />`):** Updates the local time every second without triggering re-renders in the parent navigation bar, eliminating 60 redundant navbar re-renders per minute.
- **Visitor Counter:** Tracks and displays visits stored in `localStorage`.
- **Theme Switcher:** Seamless transition between **Light Mode** and **Dark Mode** via React Context.
- **Collapsible Navigation:** Clean responsive mobile drawer menu.

### 11. Responsive Footer
- **Official Contact:** [`decode@aptechgdn.net`](mailto:decode@aptechgdn.net)
- **Competition Credit:** Aptech Limited • Techwiz 7: The World Tech Championship.
- **Quick Links & Legal Notice:** Direct jump links to all modules alongside an educational simulation disclaimer.

---

## 🏗️ Code Structure & Architecture

### Component Architecture & Data Flow

```
                                    +-----------------------+
                                    |       main.jsx        |
                                    |    (BrowserRouter)    |
                                    +-----------+-----------+
                                                |
                                    +-----------v-----------+
                                    |        App.jsx        |
                                    |    (ThemeProvider)    |
                                    +-----------+-----------+
                                                |
        +---------------------------------------+---------------------------------------+
        |                                       |                                       |
+-------v-------+                       +-------v-------+                       +-------v-------+
|  Navbar.jsx   |                       |    Routes     |                       |  Footer.jsx   |
|               |                       | (Suspense &   |                       |  Chatbot      |
+-------+-------+                       |  Lazy-Loaded) |                       +---------------+
        |                               +-------+-------+
        +-----------------------+               |
        |                       |       +-------+-------+-------+-------+-------+
+-------v-------+       +-------v-------+       |       |       |       |       |
|  LiveClock    |       | Authentication|     Landing Basics  Calc   Tracker  About
|  (Memoized)   |       |  .jsx & .css  |      Page    Page   Page    Page    Page
+---------------+       +-------+-------+
                                |
                +---------------+---------------+
                |                               |
        +-------v-------+               +-------v-------+
        | Desktop Popover|              |  Mobile Drawer |
        | User Card &   |               | User Card with|
        | Avatar Button |               | X-Axis Spacing|
        +-------+-------+               +-------+-------+
                |                               |
                +---------------+---------------+
                                |
                        +-------v-------+
                        |  AuthModal    |
                        | (createPortal |
                        | to body)      |
                        +---------------+
```

### Authentication & Persistence Lifecycle

1. **Bootstrap / Seeding:**
   On initial load, `getStoredUsers()` checks `localStorage.getItem("budget_users")`. If not present, it seeds the collection using `src/data/users.json` (containing Alex Morgan and Sarah Chen).
2. **Session Verification:**
   `getActiveUser()` reads `localStorage.getItem("budget_active_user")`. If a session exists, the user is immediately recognized as authenticated without showing registration or login forms.
3. **Reactive Bus & Multi-Tab Synchronization:**
   An internal observer (`authListeners`) notifies all mounted instances (`Navbar`, drawer, profile menus) of login/logout actions simultaneously. A native `window.addEventListener("storage", ...)` listener synchronizes session status across all open browser tabs in real time.
4. **Portal Rendering:**
   `AuthModal` utilizes React's `createPortal(..., document.body)` so modal dialogs render at the root DOM level. This prevents z-index clipping, overflow issues, or accidental unmounting when parent containers (such as mobile menus) close.

### Performance & Render Optimizations

- **Isolated Clock Rendering (`LiveClock`):** Extracted the 1-second interval timer into a standalone memoized component (`React.memo`). The parent `Navbar` and all page components remain completely un-rendered during clock ticks.
- **Route-Based Code Splitting:** All 6 primary pages (`LandingPage`, `AboutUs`, `BasicsPage`, `CalculatorPage`, `ExpenseTrackerPage`, `InfographicsPage`) and modals (`SitemapModal`, `ChatbotWidget`) are loaded dynamically via `React.lazy()` and `Suspense`.
- **Hardware-Accelerated Animations:** Transitions rely on GPU-friendly `transform` and `opacity` with cubic-bezier easing to maintain 60 FPS performance on mobile hardware.
- **Mobile Touch Enhancements:** Inputs are locked to a minimum `16px` font size on smaller viewports to prevent iOS Safari auto-zooming.
- **Asset Preconnecting:** `index.html` implements `preconnect` and `dns-prefetch` for Google Fonts, Unsplash image CDNs, and UI-Avatars.

---

## 📂 Project & Folder Structure

```
budgetbasics/
├── public/                                # Static public assets
│   ├── favicon.png                        # Raster favicon icon
│   ├── favicon.svg                        # Vector brand favicon
│   └── icons.svg                          # Reusable SVG sprite symbols
│
├── srv/                                   # Backup datasets and resource copies
│   └── data/                              # Static schemas & offline fallbacks
│       ├── aboutUsData.json
│       ├── budgetCalculatorData.json
│       ├── chatbotData.json
│       ├── educationalCardsData.json
│       ├── expenseTrackerData.json
│       ├── infographicsData.json
│       ├── landingPageData.json
│       ├── needsWantsGameData.json
│       ├── sitemapData.json
│       └── users.json                     # Backup user schema & demo accounts
│
├── src/                                   # Application source code
│   ├── assets/                            # Brand assets and team imagery
│   │   ├── ahmed.avif                     # Team member avatar
│   │   ├── hamza.avif                     # Team member avatar
│   │   ├── logo.jpg                       # Brand logo graphic
│   │   ├── mutahir.avif                   # Team member avatar
│   │   └── nihal.jpg                      # Team member avatar
│   │
│   ├── components/                        # Reusable modular UI components
│   │   ├── Authentication.css             # Dedicated styling for auth popover, modal & cards
│   │   ├── Authentication.jsx             # Auth system, session hook, avatar button & modal
│   │   ├── BudgetCalculator.jsx           # 50/30/20 formula calculator with progress bars
│   │   ├── ChatbotWidget.jsx              # Floating BudgetBee conversational assistant
│   │   ├── EducationalCards.jsx           # 3 core financial principle cards with AOS
│   │   ├── ExpenseTracker.jsx             # Live tracker, alerts, presets & CRUD table
│   │   ├── Footer.jsx                     # Multi-column footer with contact and legal notes
│   │   ├── HeroBanner.jsx                 # Animated entrance hero section
│   │   ├── InfographicsGallery.jsx        # Visual guides (Emergency fund, Subscriptions)
│   │   ├── Navbar.jsx                     # Header with LiveClock, counter, theme & auth
│   │   ├── NeedsWantsGame.jsx             # Interactive 5-card classification quiz
│   │   ├── SEO.jsx                        # Dynamic meta tag & Open Graph injector
│   │   ├── SitemapModal.css               # Modal backdrop and dialog styles
│   │   ├── SitemapModal.jsx               # Searchable application sitemap overlay
│   │   └── TopProgressBar.jsx             # Route transition progress indicator bar
│   │
│   ├── context/                           # React Context providers
│   │   └── ThemeContext.jsx               # Dark/Light mode provider and persistence
│   │
│   ├── data/                              # JSON data models for app features
│   │   ├── aboutUsData.json               # Team data, pillars & initial testimonials
│   │   ├── budgetCalculatorData.json      # Income presets and formula parameters
│   │   ├── chatbotData.json               # Q&A intents, keywords & responses
│   │   ├── educationalCardsData.json      # Educational card content
│   │   ├── expenseTrackerData.json        # Default starter expenses & presets
│   │   ├── infographicsData.json          # Infographic data and action tips
│   │   ├── landingPageData.json           # Decision tree and FAQ datasets
│   │   ├── needsWantsGameData.json        # Quiz items, classifications & feedback
│   │   ├── sitemapData.json               # Categorized routes for the sitemap modal
│   │   └── users.json                     # Initial 2 pre-registered users with avatars
│   │
│   ├── pages/                             # Lazy-loaded route views
│   │   ├── AboutUs.css                    # Styling for about page & review cards
│   │   ├── AboutUs.jsx                    # About Us, Team Decode & feedback system
│   │   ├── BasicsPage.jsx                 # Financial basics page container
│   │   ├── CalculatorPage.jsx             # 50/30/20 calculator page container
│   │   ├── ExpenseTrackerPage.jsx         # Expense planner page container
│   │   ├── Home.jsx                       # Legacy tab container / fallback
│   │   ├── InfographicsPage.jsx           # Visual guides page container
│   │   ├── LandingPage.css                # Styles for hero, decision tree & FAQ
│   │   └── LandingPage.jsx                # Comprehensive landing homepage
│   │
│   ├── utils/                             # Utility helpers
│   │   └── formatters.js                  # Currency formatters & number sanitizers
│   │
│   ├── App.jsx                            # Root application component & route configuration
│   ├── index.css                          # Custom CSS variables, themes & global styles
│   └── main.jsx                           # Application entry point with BrowserRouter
│
├── .gitignore                             # Git ignore rules (node_modules, dist, etc.)
├── eslint.config.js                       # ESLint configuration
├── index.html                             # Main HTML entry with Schema.org & fonts
├── package.json                           # Project scripts and dependencies
├── package-lock.json                      # Locked dependency tree
├── vite.config.js                         # Vite build and manual chunking configuration
└── README.md                              # Project documentation
```

---

## 🛠️ Tech Stack & Dependencies

The project is built on modern JavaScript/React tooling:

### Production Dependencies
| Package | Version | Purpose |
| :--- | :--- | :--- |
| **`react`** | `^19.2.8` | Core UI library for building component-based interfaces |
| **`react-dom`** | `^19.2.8` | DOM rendering package for React 19 (including `createPortal`) |
| **`react-router-dom`** | `^7.18.4` | Client-side routing, navigation, and lazy route loading |
| **`gsap`** | `^3.15.0` | GreenSock Animation Platform for smooth hero and chatbot transitions |
| **`aos`** | `^2.3.4` | Animate On Scroll library for revealing cards on viewport scroll |
| **`lucide-react`** | `^1.48.0` | Clean, customizable, tree-shakeable SVG icon set |
| **`bootstrap-icons`** | `^1.13.1` | Additional vector icon set complementing the UI |
| **`canvas-confetti`** | `^1.9.4` | Canvas particle animation library for quiz completion fireworks |

### Development Dependencies
| Package | Version | Purpose |
| :--- | :--- | :--- |
| **`vite`** | `^8.3.0` | Next-generation frontend build tool and ultra-fast dev server |
| **`@vitejs/plugin-react`**| `^6.1.1` | Official Vite plugin for React Fast Refresh and JSX transformation |
| **`eslint`** | `^10.10.0` | Pluggable JavaScript linter for enforcing code quality standards |
| **`@eslint/js`** | `^10.0.1` | ESLint recommended configuration set |
| **`eslint-plugin-react-hooks`** | `^7.1.1` | Enforces React Hooks rules |
| **`eslint-plugin-react-refresh`** | `^0.5.6` | Validates Hot Module Replacement compliance |
| **`@types/react`** | `^19.2.18`| TypeScript type definitions for React |
| **`@types/react-dom`** | `^19.2.7` | TypeScript type definitions for React DOM |
| **`globals`** | `^17.12.0` | Global variable definitions for ESLint |

### External Design Assets & Fonts
- **Bootstrap 5.3.8:** Integrated via CDN for responsive grid, utilities, and components.
- **Google Fonts:**
  - `Plus Jakarta Sans`: Body copy, UI labels, clean modern readability.
  - `Outfit`: Bold headings, numerical metrics, and banner displays.
- **Avatars & Image CDNs:**
  - `images.unsplash.com` & `ui-avatars.com`: Profile portraits with preconnect hints.

---

## 💻 Getting Started: Local Setup Guide

Follow these step-by-step instructions to get a copy of **BudgetBasics** running on your local machine.

### 1. Prerequisites

Ensure you have the following installed on your computer:
- **Node.js**: `v18.x` or higher (Node 20+ LTS recommended). Check with:
  ```bash
  node -v
  ```
- **npm**: `v9.x` or higher (bundled with Node.js). Check with:
  ```bash
  npm -v
  ```
- **Git**: Installed for version control. Check with:
  ```bash
  git --version
  ```
- A modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari).

---

### 2. Clone the Repository

Clone the project repository to your desired local directory:

```bash
# Using HTTPS
git clone https://github.com/decodetechwiz/budgetbasics.git

# Or using SSH (if configured on your machine)
git clone git@github.com:decodetechwiz/budgetbasics.git
```

---

### 3. Navigate to Project Folder

Move into the project directory:

```bash
cd budgetbasics
```

*(If you cloned into an outer workspace like `Techwiz`, ensure you navigate to the folder containing `package.json`: `cd budgetbasics`).*

---

### 4. Install Node Modules

Install all required production and development dependencies:

```bash
npm install
```

> [!NOTE]
> If you encounter dependency peer warnings or permission issues on Windows, you can safely run:
> ```bash
> npm install --legacy-peer-deps
> ```

---

### 5. Start Development Server

Run the local Vite development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

*For Windows PowerShell users running into script execution restrictions:*
```powershell
cmd /c "npm.cmd run dev"
```

Once launched, Vite will output the local network URL in your terminal:

```
  VITE v8.3.0  ready in 250 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Open your browser and navigate to **`http://localhost:5173/`**.

---

### 6. Build for Production

To create an optimized, minified production build:

```bash
npm run build
```

This compiles your source files into the `dist/` directory, optimized with manual vendor chunking configured in `vite.config.js` (`vendor-react`, `vendor-icons`, `vendor-anim`).

To test the production build locally:

```bash
npm run preview
```

---

### 7. Code Quality & Linting

To check the codebase against ESLint rules:

```bash
npm run lint
```

---

## 💾 Data Architecture & Local Storage Keys

BudgetBasics operates entirely client-side without external database calls. Data persistence is managed using standard browser `localStorage`:

| Storage Key | Format | Description |
| :--- | :--- | :--- |
| `budget_users` | JSON Array of Objects | Registered users registered or seeded from `users.json` |
| `budget_active_user` | JSON Object / `null` | Active authenticated user session (persists until logout) |
| `budgetbasics_theme_preference` | String (`"light"` \| `"dark"`) | Active user color theme preference |
| `budget_visits` | Number | Incremental visitor session counter |
| `budgetbasics_income` | String / Number | Saved user monthly income in the Expense Tracker |
| `budgetbasics_expenses` | JSON Array of Objects | Stored expenses with ID, description, amount, and category |
| `budgetbasics_user_feedback` | JSON Array of Objects | Feedback submissions submitted via the About Us page |

---

## ❓ Troubleshooting & FAQs

### How do I log in using the demo accounts?
Open the **Sign In** modal from the navbar or mobile menu. Inside the modal, you will find a **"Pre-Registered Demo Accounts (1-Click)"** tray. Simply click on **Alex Morgan** or **Sarah Chen** to log in instantly. You can also sign in manually using:
- **Username:** `alexmorgan` | **Password:** `alex123`
- **Username:** `sarahc` | **Password:** `sarah123`

### Why does my login persist after refreshing or closing the browser?
This is by design. BudgetBasics stores the authenticated session in `localStorage.budget_active_user` so you don't need to re-login every time you return. To end the session, click on your avatar / user profile card and select **Log Out**.

### Port 5173 is already in use
If another application is using port `5173`, Vite will automatically choose the next available port (e.g., `5174`). You can also specify a custom port:
```bash
npx vite --port 3000
```

### Script Execution Disabled Error on Windows PowerShell
If you see `File ... cannot be loaded because running scripts is disabled on this system`:
Run the command via `cmd.exe`:
```powershell
cmd /c "npm.cmd run dev"
```
Or allow local scripts for your current session:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
npm run dev
```

### Styles or Animations not displaying properly
Ensure that third-party CDN assets are allowed through your network/firewall:
- `cdn.jsdelivr.net` (Bootstrap 5.3.8)
- `fonts.googleapis.com` & `fonts.gstatic.com` (Google Fonts)
- `images.unsplash.com` (Profile Avatars)

---

## 👥 Team & Acknowledgments

- **Competition:** Techwiz 7 — The World Tech Championship
- **Organized By:** Aptech Limited
- **Project Team:** Team Decode
  - **Nihal** — Lead Developer & Architecture
  - **Ahmed** — UI/UX Designer & Frontend Engineer
  - **Hamza** — State & Feature Developer
  - **Mutahir** — QA, Documentation & Research
- **Official Contact Email:** [`decode@aptechgdn.net`](mailto:decode@aptechgdn.net)

---

*BudgetBasics is created strictly for educational purposes to simulate personal finance scenarios and does not offer financial advice or banking services.*
