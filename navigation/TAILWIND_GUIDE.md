# Tailwind CSS Integration in LIT Component

## Overview

The LIT implementation now uses Tailwind CSS for styling, providing a utility-first approach with a customizable design system.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Build Process                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. src/styles.css (Tailwind source)                        │
│     ↓                                                        │
│  2. Tailwind CLI processes with tailwind.config.js          │
│     ↓                                                        │
│  3. dist/styles.css (compiled CSS)                          │
│     ↓                                                        │
│  4. inject-css.js injects CSS into TypeScript               │
│     ↓                                                        │
│  5. cw-navigation-lit.compiled.ts (with embedded CSS)      │
│     ↓                                                        │
│  6. TypeScript compiler                                      │
│     ↓                                                        │
│  7. dist/cw-navigation-lit.js (final component)            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Files Created/Modified

### New Files:
1. **`src/styles.css`** - Tailwind source with custom utilities
2. **`tailwind.config.js`** - Tailwind configuration with custom colors
3. **`postcss.config.js`** - PostCSS configuration
4. **`inject-css.js`** - Build script to inject CSS into TypeScript
5. **`tsconfig.build.json`** - TypeScript config for compiled file

### Modified Files:
1. **`package.json`** - Added Tailwind dependencies and build scripts
2. **`cw-navigation-lit.ts`** - Updated to use Tailwind classes

## Custom Tailwind Utilities

The component defines custom utility classes in `@layer components`:

| Class | Purpose | Tailwind Classes |
|-------|---------|------------------|
| `.nav-container` | Nav wrapper | `bg-nav-dark p-4` |
| `.nav-list` | List container | `list-none m-0 p-0 flex gap-2` |
| `.nav-item` | List item | `m-0` |
| `.nav-link` | Link styling | `text-nav-light no-underline px-4 py-2 rounded transition-colors duration-300 block cursor-pointer` |
| `.nav-link:hover` | Link hover | `bg-nav-darker` |
| `.nav-link.active` | Active link | `bg-nav-active text-white` |

## Custom Color Palette

Defined in `tailwind.config.js`:

```javascript
colors: {
  'nav-dark': '#2c3e50',     // Main navigation background
  'nav-darker': '#34495e',   // Hover state
  'nav-active': '#3498db',   // Active/selected state
  'nav-light': '#ecf0f1'     // Text color
}
```

## Build Commands

```bash
# Build only CSS
npm run build:css

# Inject CSS into TypeScript
npm run build:inject

# Compile TypeScript
npm run build:ts

# Build everything (recommended)
npm run build

# Watch mode (both CSS and TS)
npm run watch
```

## Customization Guide

### Change Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      'nav-dark': '#your-color',
      'nav-darker': '#your-color',
      'nav-active': '#your-color',
      'nav-light': '#your-color'
    }
  }
}
```

Then rebuild: `npm run build`

### Add New Utilities

Edit `src/styles.css`:

```css
@layer components {
  .your-custom-class {
    @apply your-tailwind-utilities;
  }
}
```

Then rebuild: `npm run build`

### Modify Existing Styles

Edit the utility classes in `src/styles.css`, then rebuild.

## Why This Approach?

1. **No Runtime CSS Loading** - CSS is embedded in the component
2. **Shadow DOM Compatible** - CSS is scoped to the component
3. **Type-Safe** - TypeScript compilation ensures no errors
4. **Optimized** - Tailwind purges unused CSS
5. **Customizable** - Easy to modify design system
6. **Framework-Agnostic** - Works anywhere web components work

## Advantages Over Vanilla CSS

| Aspect | Vanilla CSS | Tailwind CSS |
|--------|-------------|--------------|
| Utility Classes | Manual | Built-in |
| Consistency | Manual | Design system |
| Responsive | Manual breakpoints | Built-in responsive utilities |
| Hover/Focus | Manual pseudo-classes | Built-in modifiers |
| Dark Mode | Manual implementation | Built-in support (if enabled) |
| Customization | Edit CSS directly | Edit config file |
| Bundle Size | Depends on CSS | Auto-purged, minimal |

## Browser Support

Same as LIT + Tailwind CSS:
- Chrome/Edge 54+
- Firefox 63+
- Safari 10.1+
- Opera 41+

## Troubleshooting

### CSS not applying?
1. Make sure you run `npm run build` (not just `npm run build:ts`)
2. Check that `dist/styles.css` exists
3. Verify `cw-navigation-lit.compiled.ts` was created

### Tailwind directives showing errors in editor?
- This is normal! The `@tailwind` and `@apply` directives are processed by Tailwind CLI
- Errors will disappear after running `npm run build:css`

### TypeScript compilation errors?
- Make sure `cw-navigation-lit.compiled.ts` exists
- Run the full build: `npm run build`

## Example: Adding a New Color Scheme

1. Update `tailwind.config.js`:
```javascript
colors: {
  'nav-dark': '#1a202c',      // Darker blue-gray
  'nav-darker': '#2d3748',    // Blue-gray
  'nav-active': '#4299e1',    // Bright blue
  'nav-light': '#f7fafc'      // Off-white
}
```

2. Rebuild:
```bash
npm run build
```

3. The component will now use the new colors!

## Next Steps

- Explore Tailwind's responsive utilities for mobile customization
- Add dark mode support using Tailwind's dark mode feature
- Create additional component variants with different color schemes
- Leverage Tailwind plugins for extended functionality
