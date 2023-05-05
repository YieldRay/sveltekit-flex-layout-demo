// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        // interface Platform {}
    }

    // svelte-legos
    namespace svelteHTML {
        interface HTMLAttributes<T> {
            "on:clickoutside"?: (e: CustomEvent<T>) => void;
        }
        interface HTMLAttributes<T> {
            "on:longpress"?: (e: CustomEvent<T>) => void;
        }
    }
}

export {};
