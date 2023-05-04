<script lang="ts">
    import Input from "./Input.svelte";
    import { fade } from "svelte/transition";
    import { longPressAction, clickOutsideAction } from "svelte-legos";
    import { flex, camelToKebab } from "./flex";

    // css props control pannel

    let cssProps = Object.fromEntries(
        Object.entries(flex).map(([k, v]) => [
            k,
            {
                value: "",
                options: v,
            },
        ])
    );

    let gap = 8;

    let containerElement: HTMLDivElement;
    let cssText = "";

    $: {
        if (containerElement) {
            for (const [k, v] of Object.entries(cssProps)) Reflect.set(containerElement.style, k, v.value);
            cssText = containerElement.style.cssText ?? "";
        }
    }
    $: if (containerElement) containerElement.style.gap = gap + "px";

    const selfStyle: Partial<CSSStyleDeclaration> = {
        width: "",
        height: "",
        maxWidth: "",
        maxHeight: "",
        flexBasis: "",
        flexGrow: "",
        flexShrink: "",
        alignSelf: "",
        justifySelf: "",
    };
    // init items
    let items = Array.from({ length: 6 }, (v, k) => {
        return {
            key: k,
            text: `Edit me! I'm No.${k}`,
            style: { ...selfStyle },
            menu: false,
        };
    });
    // let deleteItem = (index: number) => (items = items.slice(0, index).concat(items.slice(index + 1)));
    let deleteItem = (key: number) => (items = items.filter((item) => item.key !== key));
    let addItem = () =>
        (items = [
            ...items,
            { key: items.length, menu: false, text: `Edit me! __No.${items.length}__`, style: { ...selfStyle } },
        ]);
</script>

<fieldset>
    <legend>output</legend>
    <div bind:this={containerElement} class="flex">
        {#each items as item (item.key)}
            <!-- style:flex-basis={item.style.flexBasis}
                    style:flex-grow={item.style.flexGrow}
                    style:flex-shirnk={item.style.flexShrink}
                    style:align-self={item.style.alignSelf}
                    style:justify-self={item.style.justifySelf}
                 -->
            <div
                style={Object.entries(item.style)
                    .map(([k, v]) => (v ? `${camelToKebab(k)}: ${v};` : ""))
                    .join("")}
                class="relative"
                use:longPressAction={500}
                on:longpress={() => (item.menu = !item.menu)}
                use:clickOutsideAction
                on:clickoutside={() => (item.menu = false)}
                on:contextmenu={(e) => {
                    e.preventDefault();
                    // close all other menu
                    items = items.map((i) => ({ ...i, menu: i === item ? !item.menu : false }));
                }}
            >
                <div class="bg-cyan-50 focus:outline-none focus:ring focus:ring-fuchsia-100" contenteditable>
                    Edit Me! __No.{item.key}__
                </div>
                {#if item.menu}
                    <menu
                        transition:fade={{ duration: 200 }}
                        class="absolute top-0 left-0 z-10 border-2 rounded with-backdrop"
                    >
                        <strong class="block px-2 py-1"> settings for {item.key} </strong>
                        {#each Object.keys(item.style) as prop}
                            <Input bind:value={item.style[prop]}>{camelToKebab(prop)}</Input>
                        {/each}
                        <button
                            class="w-[100%] rounded hover:bg-[rgba(0,0,0,0.2)] p-1 bg-[rgba(0,0,0,0.1)]"
                            on:click={() => deleteItem(item.key)}
                        >
                            remove this
                        </button>
                    </menu>
                {/if}
            </div>
        {/each}
    </div>
</fieldset>

<fieldset>
    <legend>container style</legend>

    <label>
        gap
        <input type="range" bind:value={gap} />
    </label>

    <button on:click={addItem}>Add One</button>

    <div class="flex gap-2 justify-center">
        {#each Object.keys(cssProps) as prop}
            <fieldset class="p-2">
                <legend>{camelToKebab(prop)}</legend>
                {#each cssProps[prop].options as option}
                    <label class="block pa-2">
                        <input name={prop} type="radio" value={option} bind:group={cssProps[prop].value} />
                        {option}
                    </label>
                {/each}
            </fieldset>
        {/each}
    </div>
</fieldset>

<fieldset>
    <legend> cssText </legend>
    <pre>{cssText.split("; ").join(";\n")}</pre>
</fieldset>

<style>
    :root {
        max-width: 1080px;
        margin: auto;
        overflow-x: hidden;
    }

    pre {
        display: block;
        font-family: consolas, monospace;
    }
    .with-backdrop {
        backdrop-filter: blur(0.5em);
    }
</style>
