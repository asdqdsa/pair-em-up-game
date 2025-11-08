### 📦 Template Overview

A custom **Vite** + **JS** + **SASS** starter template that loosely follows FSD methodology.

1. `app` - application entry point (`index.js`, `style.sccs`)

2. `page` - page indexes/view composition (_e.g. home, profile_, etc.)

3. `feature` - isolated application features (_e.g theme-switcher_)

4. `shared` - general utilities, UI kit, infrastructer

The `shared` layer inludes (`uikit`, `utils`, `storage`):

- Modular SCSS architecture [**components**]
- Draft typography tokens and theme colors [**theme**]
- Reusable mixins and helper utilities [**core**]
- Atomic styles (Tailwind-like) [**atomic**]
- LocalStorage API for state persistence [**storage**]
- General helpers, constants, DOM manipulation and Events handling [**utils**]

### 📦 Start

```bash
pnpm i # install
pnpm dev # port:4444
pnpm build # dist
pnpm prev # port:5555
```

> [!NOTE]
> This template uses environment variables.
> Don't forget to remove the `.example` part from the provided `.env` files.

**Version:** 0.9.0 - second iteration
