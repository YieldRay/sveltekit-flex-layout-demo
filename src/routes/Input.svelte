<script>
    export let value = "";
</script>

<label class="hover:bg-[rgba(0,0,0,0.1)] p-1">
    <span class="break-keep w-[max-content]">
        <slot />
    </span>
    <input
        class="bg-[rgba(0,0,0,0.15)] font-normal focus:outline-none rounded px-1"
        bind:value
        type="text"
        {...$$props}
    />
</label>

<style>
    label {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.5em;
    }

    * {
        font-family: consolas, monospace;
    }
</style>
