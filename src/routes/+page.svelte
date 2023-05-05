<script lang="ts">
    import Input from "./Input.svelte";
    import Button from "./Button.svelte";
    import { afterUpdate } from "svelte";
    import { fade } from "svelte/transition";
    import { longPressAction, clickOutsideAction } from "svelte-legos";
    import { flex, camelToKebab, styleObjToText } from "./flex";

    // css props control pannel
    let containerFlexStylesWithOptions = Object.fromEntries(
        Object.entries(flex).map(([k, v]) => [
            k,
            {
                value: "",
                options: v,
            },
        ])
    );

    // css props control pannel, part other
    let containerOtherStyles: Partial<CSSStyleDeclaration> = {
        gap: "8px",
        width: "",
        height: "",
        boxSizing: "border-box",
        margin: "",
        padding: "",
    };

    // apply styles to container element
    let containerStyles: Partial<CSSStyleDeclaration> = {}; // the final applied styles
    let containerElement: HTMLDivElement;
    let cssText = "";

    $: {
        containerStyles = {
            ...containerOtherStyles,
            ...Object.fromEntries(
                // containerFlexStylesWithOptions -> containerFlexStyles
                Object.entries(containerFlexStylesWithOptions).map(([k, v]) => [k, v.value])
            ),
        };
        // console.table(containerStyles);

        // mutate css text to reflect container style changes
        // notice: can only get cssText after the DOM change
        afterUpdate(() => {
            // if (containerElement)
            cssText = containerElement.style.cssText ?? "";
        });
    }

    // initial style for child items
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
    let addItem = () => {
        const key = items.length ? items.at(-1)!.key + 1 : 0;
        // key = items.length
        items = [...items, { key, menu: false, text: `Edit me! __No.${key}__`, style: { ...selfStyle } }];
    };
    let removeAllItem = () => (items = []);

    // this is used for avoid typescript error with Object.keys
    // Element implicitly has an 'any' type because index expression is not of type 'number'.ts(7015)
    const getKeysOfObject = (o: object) => Object.keys(o) as any[];
</script>

<fieldset>
    <legend>output</legend>
    <div bind:this={containerElement} class="flex outline" style={styleObjToText(containerStyles)}>
        {#each items as item (item.key)}
            <div
                style={styleObjToText(item.style)}
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
                        {#each getKeysOfObject(item.style) as prop}
                            <Input bind:value={item.style[prop]}>{camelToKebab(prop)}</Input>
                        {/each}
                        <Button className="w-[100%]" on:click={() => deleteItem(item.key)}>remove this</Button>
                    </menu>
                {/if}
            </div>
        {/each}
    </div>
</fieldset>

<fieldset>
    <legend>container style</legend>

    <div class="flex gap-2 justify-center flex-wrap">
        {#each Object.keys(containerFlexStylesWithOptions) as prop}
            <fieldset class="p-2">
                <legend>{camelToKebab(prop)}</legend>
                {#each containerFlexStylesWithOptions[prop].options as option}
                    <label class="block">
                        <input
                            name={prop}
                            type="radio"
                            value={option}
                            bind:group={containerFlexStylesWithOptions[prop].value}
                        />
                        {option}
                    </label>
                {/each}
            </fieldset>
        {/each}

        <fieldset class="p-2">
            <legend>others</legend>
            <p>
                right click or long press any of <br /> the child element to set its own style
            </p>

            <Button on:click={addItem}>Add One</Button>
            <Button on:click={removeAllItem}>Remove All</Button>
            {#each getKeysOfObject(containerOtherStyles) as prop}
                <Input bind:value={containerOtherStyles[prop]}>{camelToKebab(prop)}</Input>
            {/each}
        </fieldset>
    </div>
</fieldset>

<fieldset>
    <legend> cssText </legend>
    <pre>{cssText.split("; ").join(";\n")}</pre>
</fieldset>

<style>
    :root {
        max-width: 99%;
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
