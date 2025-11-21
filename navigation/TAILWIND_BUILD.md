# Tailwind CSS Build Process

## ✅ Tailwind CSS is Included in Dist Files

The navigation component **automatically includes all Tailwind CSS** in the built dist files. No external stylesheet is needed!

## How It Works

### 1. **Import Styles in Component**
```typescript
// cw-navigation.ts
import styles from './styles.css?inline';

static styles = [
  unsafeCSS(styles),  // Tailwind CSS is injected here
  css`
    :host {
      display: block;
    }
  `
];
```

### 2. **Tailwind Configuration**
The `tailwind.config.js` scans the component files for Tailwind classes:

```javascript
export default {
  content: [
    "./cw-navigation.ts",      // Main component file
    "./src/**/*.{ts,js,html}"  // Any additional source files
  ],
  // ...
}
```

### 3. **Build Process (Vite)**
When you run `npm run build`, Vite:
1. Processes `styles.css` through PostCSS
2. PostCSS runs Tailwind CSS to compile all used classes
3. The compiled CSS is inlined into the component
4. Everything is bundled into `dist/cw-navigation.es.js`

### 4. **Result**
The dist file contains:
- ✅ Tailwind base styles (reset, defaults)
- ✅ All utility classes used in the component
- ✅ Responsive variants (md:, hover:, etc.)
- ✅ Custom component styles

## Verification

You can verify Tailwind is included by checking the dist file:

```bash
# Search for Tailwind classes in the dist file
Get-Content dist/cw-navigation.es.js | Select-String "bg-slate-800"
```

You should see the compiled CSS like:
```css
.bg-slate-800{--tw-bg-opacity: 1;background-color:rgb(30 41 59 / var(--tw-bg-opacity, 1))}
```

## Usage

When you import the component, all styles are automatically included:

```javascript
import '@jtimbobolan/shared-ui-components/navigation';

// The component is fully styled - no external CSS needed!
const nav = document.querySelector('cw-navigation');
```

## Benefits

1. **Self-contained**: Component includes all its styles
2. **No conflicts**: Styles are scoped to the Shadow DOM
3. **No external dependencies**: Users don't need to install Tailwind
4. **Optimized**: Only the Tailwind classes you use are included
5. **Framework-agnostic**: Works anywhere without additional setup

## Rebuilding

If you modify Tailwind classes in the component:

```bash
# Rebuild to update the compiled CSS
npm run build
```

The new Tailwind classes will be automatically detected and compiled into the dist file.

## File Sizes

- **ES Module**: ~32KB (includes all Tailwind utilities used)
- **UMD Module**: ~24KB (includes all Tailwind utilities used)
- **Gzipped**: Much smaller due to CSS compression

## Shadow DOM Scoping

The styles are injected into the component's Shadow DOM, which means:
- ✅ Styles don't leak out to the page
- ✅ Page styles don't affect the component
- ✅ Multiple components can coexist without conflicts

## Adding New Tailwind Classes

1. Add the class to your component template
2. Run `npm run build`
3. The new class will be automatically compiled and included

Example:
```typescript
// Add a new class
render() {
  return html`
    <nav class="bg-slate-800 p-4 shadow-lg">  <!-- Added shadow-lg -->
      ...
    </nav>
  `;
}
```

Then rebuild:
```bash
npm run build
```

The `.shadow-lg` class will now be included in the dist file!

