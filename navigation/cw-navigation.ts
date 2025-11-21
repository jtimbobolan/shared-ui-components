import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './styles.css?inline';

export interface NavigationItem {
  label: string;
  href: string;
  active?: boolean;
}

@customElement('cw-navigation')
export class CwNavigation extends LitElement {
  @property({ type: Array })
  items: NavigationItem[] = [];

  static styles = [
    unsafeCSS(styles),
    css`
      :host {
        display: block;
      }
    `
  ];

  private handleClick(event: Event, item: NavigationItem): void {
    event.preventDefault();
    
    // Dispatch custom event
    const navEvent = new CustomEvent('navigation-click', {
      detail: { item },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(navEvent);

    // Update active state
    this.items = this.items.map(i => ({
      ...i,
      active: i.href === item.href
    }));

    // Navigate
    window.history.pushState({}, '', item.href);
  }

  render() {
    return html`
      <nav class="bg-slate-800 p-4">
        <ul class="list-none m-0 p-0 flex flex-wrap gap-2 md:flex-nowrap">
          ${this.items.map(item => html`
            <li class="m-0 w-full md:w-auto">
              <a
                href="${item.href}"
                class="text-slate-100 no-underline px-4 py-2 rounded transition-colors duration-300 block cursor-pointer hover:bg-slate-700 text-center md:text-left ${item.active ? 'bg-blue-500 text-white' : ''}"
                @click="${(e: Event) => this.handleClick(e, item)}"
              >
                ${item.label}
              </a>
            </li>
          `)}
        </ul>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cw-navigation': CwNavigation;
  }
}
