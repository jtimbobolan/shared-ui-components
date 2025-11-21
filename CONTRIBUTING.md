# Contributing Guide

## Adding a New Component

This guide will help you add new components to the shared UI components library.

### 1. Create Component Directory

Create a new directory for your component in the root folder:

```bash
mkdir my-component
cd my-component
```

### 2. Initialize Component Package

Create a `package.json` for your component:

```json
{
  "name": "@jtimbobolan/cw-my-component",
  "version": "1.0.0",
  "description": "Description of your component",
  "type": "module",
  "main": "dist/cw-my-component.js",
  "types": "dist/cw-my-component.d.ts",
  "files": ["dist"],
  "scripts": {
    "dev": "vite build --watch --mode development",
    "build": "vite build",
    "preview": "vite preview"
  },
  "keywords": ["web-components", "lit", "lit-element", "tailwindcss"],
  "author": "jtimbobolan",
  "license": "MIT",
  "dependencies": {
    "lit": "^3.1.0"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "vite": "^5.0.8",
    "vite-plugin-dts": "^3.7.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "terser": "^5.26.0"
  }
}
```

### 3. Copy Configuration Files

Copy these files from the `navigation` component as templates:
- `tsconfig.json`
- `tsconfig.build.json`
- `vite.config.ts`
- `tailwind.config.js`
- `postcss.config.js`
- `vite-env.d.ts`
- `styles.css`

Update the component name in `vite.config.ts`:

```typescript
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'cw-my-component.ts'),
      name: 'CwMyComponent',
      fileName: (format) => `cw-my-component.${format}.js`
    }
  }
});
```

### 4. Create Your Component

Create `cw-my-component.ts`:

```typescript
import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './styles.css?inline';

@customElement('cw-my-component')
export class CwMyComponent extends LitElement {
  @property({ type: String })
  myProp: string = '';

  static styles = [
    unsafeCSS(styles),
    css`
      :host {
        display: block;
      }
    `
  ];

  render() {
    return html`
      <div class="my-component">
        ${this.myProp}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cw-my-component': CwMyComponent;
  }
}
```

### 5. Create Component README

Create a `README.md` documenting your component's API, usage examples, and features.

### 6. Update Root Package.json

Add your component to the root `package.json`:

**In `exports` section:**
```json
"./my-component": {
  "types": "./my-component/dist/cw-my-component.d.ts",
  "import": "./my-component/dist/cw-my-component.js"
}
```

**Add scripts:**
```json
"build:my-component": "cd my-component && npm run build",
"dev:my-component": "cd my-component && npm run dev",
"preview:my-component": "cd my-component && npm run preview",
"install:my-component": "cd my-component && npm install",
"clean:my-component": "rimraf my-component/dist"
```

**Update the main `build` and `install:all` scripts:**
```json
"build": "npm run build:navigation && npm run build:my-component",
"install:all": "npm run install:navigation && npm run install:my-component",
"clean": "npm run clean:navigation && npm run clean:my-component"
```

### 7. Install Dependencies and Build

```bash
# From component directory
npm install
npm run build

# Or from root
npm run install:my-component
npm run build:my-component
```

### 8. Test Your Component

Create a test HTML file to verify your component works correctly.

### 9. Update Main README

Add your component to the "Available Components" section in the root `README.md`.

## Component Naming Convention

- Use the `cw-` prefix for all component names (CaseWorthy)
- Use kebab-case for component names: `cw-my-component`
- Use PascalCase for class names: `CwMyComponent`

## Best Practices

- Always include TypeScript types
- Document all public properties and events
- Include usage examples for multiple frameworks
- Use Tailwind CSS for styling
- Keep components framework-agnostic
- Write comprehensive README documentation

