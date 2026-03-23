<script lang="ts">
    interface Props {
        colspan?: number;
        rowspan?: number;
        onclick: () => void;
        tag?: "td" | "th";
    }

    let { colspan = 1, rowspan = 1, onclick, tag = "td" }: Props = $props();
</script>

<!-- use svelte:element to render th or td dynamically -->
<svelte:element
    this={tag}
    {onclick}
    role="button"
    tabindex="0"
    aria-label="Add cell"
    class="p-0 bg-[#474747] align-middle text-center font-bold text-[1.2rem] text-text cursor-pointer hover:bg-primary transition-colors {rowspan >
    1
        ? 'w-[32px] min-w-[32px] max-w-[32px]'
        : ''} {colspan > 1 ? 'h-[40px] min-h-[40px] max-h-[40px]' : ''} {tag ===
    'th'
        ? 'bg-[rgba(102,126,234,0.2)]'
        : ''}"
    {colspan}
    {rowspan}
>
    +
</svelte:element>
