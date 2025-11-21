# Shared UI Components

A collection of framework-agnostic web components built with LIT, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Framework-agnostic** - Works with React, Vue, Angular, or vanilla JavaScript
- **TypeScript** - Full type safety and IntelliSense support
- **Tailwind CSS** - Modern, utility-first styling
- **LIT** - Fast, lightweight web components
- **Tree-shakeable** - Import only what you need

## 📦 Installation

```bash
npm install @jtimbobolan/shared-ui-components
```

## 🧩 Available Components

### Navigation Component

A responsive navigation bar component with active state management and click event handling.

```javascript
import '@jtimbobolan/shared-ui-components/navigation';

// Use in your HTML
const nav = document.querySelector('cw-navigation');
nav.items = [
  { label: 'Home', href: '/', active: true },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' }
];

nav.addEventListener('navigation-click', (e) => {
  console.log('Clicked:', e.detail.item);
});
```

[See full Navigation documentation →](./navigation/README.md)

## 🔧 Development

### Setup

```bash
# Install dependencies for all components
npm run install:all

# Build all components
npm run build

# Development mode for specific component
npm run dev:navigation
```

### Building Individual Components

```bash
# Build specific component
npm run build:navigation

# Clean build artifacts
npm run clean:navigation
```

### Project Structure

```
shared-ui-components/
├── navigation/           # Navigation component
│   ├── src/             # Source files
│   ├── dist/            # Built files (generated)
│   └── README.md        # Component documentation
├── [future-component]/  # Additional components follow same structure
├── package.json         # Root package configuration
├── CONTRIBUTING.md      # Guide for adding new components
└── README.md           # This file
```

### Adding New Components

This package is designed to scale with multiple components. Each component lives in its own directory with its own build configuration.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed instructions on adding new components.

## 📖 Usage Examples

### React

```tsx
import { useEffect, useRef } from 'react';
import '@jtimbobolan/shared-ui-components/navigation';

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

  return <cw-navigation ref={navRef} />;
}
```

### Vue

```vue
<template>
  <cw-navigation ref="nav" @navigation-click="handleClick" />
</template>

<script>
import '@jtimbobolan/shared-ui-components/navigation';

export default {
  mounted() {
    this.$refs.nav.items = [
      { label: 'Home', href: '/', active: true },
      { label: 'About', href: '/about' }
    ];
  }
}
</script>
```

### Angular

```typescript
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import '@jtimbobolan/shared-ui-components/navigation';

@Component({
  selector: 'app-root',
  template: '<cw-navigation #nav></cw-navigation>'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('nav') nav!: ElementRef;

  ngAfterViewInit() {
    this.nav.nativeElement.items = [
      { label: 'Home', href: '/', active: true },
      { label: 'About', href: '/about' }
    ];
  }
}
```

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## 📄 License

MIT

## 🔗 Links

- [Repository](https://github.com/jtimbobolan/shared-ui-components)
- [Issues](https://github.com/jtimbobolan/shared-ui-components/issues)
- [NPM Package](https://www.npmjs.com/package/@jtimbobolan/shared-ui-components)

