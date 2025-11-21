# CW Navigation - LIT Implementation

A framework-agnostic navigation web component built with LIT, TypeScript, and Tailwind CSS. Uses the `cw-navigation` custom element name with the "cw" prefix for CaseWorthy.

## Features

- 🎨 **Tailwind CSS** - Utility-first CSS framework for styling
- ⚡ **LIT** - Fast, lightweight web components
- 📘 **TypeScript** - Full type safety
- 🎯 **Framework-agnostic** - Works with any framework or vanilla JS

## Installation

```bash
npm install
npm run build
```

## Development

```bash
# Watch mode - rebuilds on file changes
npm run dev

# Preview built component
npm run preview
```

The build process (powered by **Vite**):
1. Compiles Tailwind CSS with PostCSS
2. Bundles TypeScript with type definitions
3. Optimizes and minifies output

## Usage

### In HTML

```html
<script type="module" src="./dist/cw-navigation.es.js"></script>

<cw-navigation id="nav"></cw-navigation>

<script type="module">
  const nav = document.getElementById('nav');
  nav.items = [
    { label: 'Home', href: '/', active: true },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  nav.addEventListener('navigation-click', (e) => {
    console.log('Clicked:', e.detail.item);
  });
</script>
```

### In React

```tsx
import { useEffect, useRef } from 'react';
import '../path/to/dist/cw-navigation.es.js';

function App() {
  const navRef = useRef(null);

  useEffect(() => {
    if (navRef.current) {
      navRef.current.items = [
        { label: 'Home', href: '/', active: true },
        { label: 'About', href: '/about' }
      ];
    }
  }, []);

  const handleNavClick = (e) => {
    console.log('Navigation clicked:', e.detail.item);
  };

  return <cw-navigation ref={navRef} onNavigation-click={handleNavClick} />;
}
```

### In Vue

```vue
<template>
  <cw-navigation ref="nav" @navigation-click="handleNavClick" />
</template>

<script>
import '../path/to/dist/cw-navigation.es.js';

export default {
  mounted() {
    this.$refs.nav.items = [
      { label: 'Home', href: '/', active: true },
      { label: 'About', href: '/about' }
    ];
  },
  methods: {
    handleNavClick(e) {
      console.log('Navigation clicked:', e.detail.item);
    }
  }
}
</script>
```

### In Angular

```typescript
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import '../path/to/dist/cw-navigation.es.js';

@Component({
  selector: 'app-root',
  template: '<cw-navigation #nav (navigation-click)="handleNavClick($event)"></cw-navigation>'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('nav') nav!: ElementRef;

  ngAfterViewInit() {
    this.nav.nativeElement.items = [
      { label: 'Home', href: '/', active: true },
      { label: 'About', href: '/about' }
    ];
  }

  handleNavClick(event: CustomEvent) {
    console.log('Navigation clicked:', event.detail.item);
  }
}
```

## API

### Properties

- `items`: Array of navigation items

### Events

- `navigation-click`: Fired when a navigation item is clicked

## Tailwind CSS Customization

The component uses custom Tailwind utilities defined in `src/styles.css`:

```css
@layer components {
  .nav-container { @apply bg-nav-dark p-4; }
  .nav-list { @apply list-none m-0 p-0 flex gap-2; }
  .nav-item { @apply m-0; }
  .nav-link { @apply text-nav-light no-underline px-4 py-2 rounded transition-colors duration-300 block cursor-pointer; }
  .nav-link:hover { @apply bg-nav-darker; }
  .nav-link.active { @apply bg-nav-active text-white; }
}
```

Custom color palette (defined in `tailwind.config.js`):
- `nav-dark`: #2c3e50
- `nav-darker`: #34495e  
- `nav-active`: #3498db
- `nav-light`: #ecf0f1

You can customize colors by editing `tailwind.config.js` and rebuilding.

## Benefits of LIT + Tailwind

- Declarative templates with html tagged template literals
- Reactive properties with automatic re-rendering
- Built-in decorators for cleaner code
- Utility-first CSS with Tailwind
- Customizable design system
- Better TypeScript support
- Responsive design built-in
