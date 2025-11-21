import { LitElement } from 'lit';

export interface NavigationItem {
    label: string;
    href: string;
    active?: boolean;
}
export declare class CwNavigation extends LitElement {
    items: NavigationItem[];
    static styles: import('lit').CSSResult[];
    private handleClick;
    render(): import('lit').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'cw-navigation': CwNavigation;
    }
}
