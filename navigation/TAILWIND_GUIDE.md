# Tailwind CSS Integration in LIT Component

## Overview

The LIT implementation now uses Tailwind CSS for styling, providing a utility-first approach with a customizable design system.

## Architecture (Vite-based)

```
┌─────────────────────────────────────────────────────────────┐
│                   Vite Build Process                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. cw-navigation.ts (component source)                      │
│     ↓                                                        │
│  2. import styles from './styles.css?inline'                 │
│     ↓                                                        │
│  3. Vite processes CSS through PostCSS + Tailwind           │
│     ↓                                                        │
│  4. Tailwind compiles utilities based on tailwind.config.js │
│     ↓                                                        │
│  5. CSS is inlined into the component                        │
│     ↓                                                        │
│  6. TypeScript is compiled                                   │
│     ↓                                                        │
│  7. dist/cw-navigation.es.js (final ES module)              │
│  8. dist/cw-navigation.umd.js (final UMD module)            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Key Files

### Configuration Files:
1. **`styles.css`** - Tailwind source with custom utilities
2. **`tailwind.config.js`** - Tailwind configuration (scans component for classes)
3. **`postcss.config.js`** - PostCSS configuration (processes Tailwind)
4. **`vite.config.ts`** - Vite bundler configuration
5. **`tsconfig.json`** - TypeScript configuration

### Component Files:
1. **`cw-navigation.ts`** - Main component with Tailwind classes
2. **`package.json`** - Dependencies and build scripts

### Build Output:
1. **`dist/cw-navigation.es.js`** - ES module with embedded CSS
2. **`dist/cw-navigation.umd.js`** - UMD module with embedded CSS
3. **`dist/cw-navigation.d.ts`** - TypeScript type definitions

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
# Build for production (compiles TypeScript + Tailwind)
npm run build

# Development mode with watch (auto-rebuild on changes)
npm run dev

# Preview the built component
npm run preview
```

**Note:** Vite handles everything automatically - no separate CSS build step needed!

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
1. Make sure you run `npm run build`
2. Check that `dist/cw-navigation.es.js` exists
3. Verify Tailwind classes are in the dist file: `Get-Content dist/cw-navigation.es.js | Select-String "bg-slate"`

### Tailwind directives showing errors in editor?
- This is normal! The `@tailwind` and `@apply` directives are processed by PostCSS during build
- The component will work correctly after building

### TypeScript compilation errors?
- Make sure all dependencies are installed: `npm install`
- Run the full build: `npm run build`
- Check `vite.config.ts` is properly configured

### New Tailwind classes not appearing?
1. Make sure the class is used in `cw-navigation.ts`
2. Verify `tailwind.config.js` content array includes your file
3. Rebuild: `npm run build`

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
