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
    class="add-cell"
    class:add-column={rowspan > 1}
    class:add-row={colspan > 1}
    {colspan}
    {rowspan}
>
    +
</svelte:element>

<style>
    .add-cell {
        padding: 0;
        background: var(--bg-light-3);
        vertical-align: middle;
        text-align: center;
        font-weight: bold;
        font-size: 1.2rem;
        color: var(--text);

        cursor: pointer;

        &.add-column {
            width: 32px;
            min-width: 32px;
            max-width: 32px;
        }

        &.add-row {
            height: 40px;
            min-height: 40px;
            max-height: 40px;
        }
    }

    th.add-cell {
        background: rgba(102, 126, 234, 0.2);
    }
</style>
