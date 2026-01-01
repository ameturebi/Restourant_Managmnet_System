declare module 'wowjs' {
    export default class WOW {
        constructor(config?: WOW.WOWConfig);
        init(): void;
    }

    export namespace WOW {
        export interface WOWConfig {
            boxClass?: string;
            animateClass?: string;
            offset?: number;
            mobile?: boolean;
            live?: boolean;
            callback?: (box: HTMLElement) => void;
            scrollContainer?: string | null;
        }
    }
}
