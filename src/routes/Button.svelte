<script>
    export let className = "";
</script>

<button
    on:click
    class={"rounded hover:bg-[rgba(0,0,0,0.2)] active:ring p-1 bg-[rgba(0,0,0,0.1)] select-none" + " " + className}
    {...$$slots}
>
    <slot />
</button>
