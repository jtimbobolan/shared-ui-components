# Build Process Explanation

## You DON'T Need `cw-navigation.compiled.ts`

This file is **NOT needed** with the current Vite-based build process. It was part of an older build system that has been replaced.

## Current Build Process (Vite)

The component uses **Vite** which automatically handles everything:

### How It Works:

1. **Source File**: `cw-navigation.ts`
   ```typescript
   import styles from './styles.css?inline';
   ```

2. **Vite Build**: When you run `npm run build`, Vite:
   - Reads `cw-navigation.ts`
   - Sees the `styles.css?inline` import
   - Processes `styles.css` through PostCSS
   - PostCSS runs Tailwind CSS
   - Tailwind compiles all utility classes
   - The compiled CSS is **inlined directly** into the JavaScript
   - TypeScript is compiled
   - Everything is bundled into `dist/cw-navigation.es.js`

3. **Output**: 
   - `dist/cw-navigation.es.js` - ES module with embedded CSS
   - `dist/cw-navigation.umd.js` - UMD module with embedded CSS
   - `dist/cw-navigation.d.ts` - TypeScript types

### No Intermediate Files Needed!

The old process created intermediate files:
- ❌ `dist/styles.css` (compiled CSS)
- ❌ `cw-navigation.compiled.ts` (TS with injected CSS)

The new Vite process does this **all in memory** during build - no intermediate files!

## Files You DO Have:

### Source Files:
- ✅ `cw-navigation.ts` - Component source
- ✅ `styles.css` - Tailwind source
- ✅ `vite.config.ts` - Build configuration
- ✅ `tailwind.config.js` - Tailwind configuration
- ✅ `postcss.config.js` - PostCSS configuration

### Build Output:
- ✅ `dist/cw-navigation.es.js` - Final ES module
- ✅ `dist/cw-navigation.umd.js` - Final UMD module
- ✅ `dist/cw-navigation.d.ts` - Type definitions

### Legacy Files (Not Used):
- ⚠️ `inject-css.js` - Old build script (not used by Vite)

## Build Commands:

```bash
# Production build
npm run build

# Development mode (watch for changes)
npm run dev

# Preview built component
npm run preview
```

## Verifying Tailwind is Included:

Check the dist file contains Tailwind CSS:

```bash
# PowerShell
Get-Content dist/cw-navigation.es.js | Select-String "bg-slate-800"

# You should see:
# .bg-slate-800{--tw-bg-opacity: 1;background-color:rgb(30 41 59 / var(--tw-bg-opacity, 1))}
```

## Why Vite is Better:

| Old Process | Vite Process |
|-------------|--------------|
| Multiple build steps | Single command |
| Intermediate files | All in memory |
| Manual CSS injection | Automatic |
| Slower builds | Fast with HMR |
| Complex scripts | Simple config |

## Summary:

**You don't need `cw-navigation.compiled.ts`** - it's from an old build system. The current Vite-based build is:
- ✅ Simpler
- ✅ Faster
- ✅ More reliable
- ✅ Already working perfectly

Just use `npm run build` and Vite handles everything!

## If You See References to `.compiled.ts`:

These are from outdated documentation. The actual build process uses Vite and doesn't create or need this file.

Files to ignore/remove:
- `inject-css.js` (legacy build script)
- Any references to `.compiled.ts` files
- Old build scripts in package.json (if any)

The current `package.json` scripts are correct:
```json
{
  "scripts": {
    "dev": "vite build --watch --mode development",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

These are all you need! 🎉

