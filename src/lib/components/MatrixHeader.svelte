<script lang="ts">
    import type { Option, Criterion } from "$lib/types";
    import Button from "./Button.svelte";
    import OptionHeader from "./OptionHeader.svelte";

    interface Props {
        options: Option[];
        criteria: Criterion[];
        onClearAll: () => void;
        onRemoveOption: (id: string) => void;
        onChange: () => void;
    }

    let { options, criteria, onClearAll, onRemoveOption, onChange }: Props =
        $props();
</script>

<thead>
    <tr
        class="text-muted-text font-bold uppercase text-[0.75rem] pt-[0.8rem] pb-[0.4rem]"
    >
        {#if criteria.length === 1}
            <th
                class="p-2. text-center border border-[#3D3D3D] align-middle pt-3 pb-1.5"
                >Criteria</th
            >
        {:else}
            <th
                class="p-2.5 bg-primary text-text text-center border border-[#3D3D3D] align-middle pt-3 pb-1.5"
                >Criterion</th
            >
        {/if}
        <th
            class="p-2.5 text-center bg-primary text-text border border-[#3D3D3D] align-middle pt-3 pb-1.5"
            colspan={options.length}
        >
            Option{options.length > 1 ? "s" : ""}
        </th>
        <th class="bg-primary border border-[#3D3D3D]"></th>
    </tr>

    <tr>
        <th
            class="text-left w-[200px] max-w-[260px] p-2.5 bg-bg-light-1 sticle top-0 z-10 border border-[#3D3D3D] align-middle"
        >
            <Button variant="danger" onclick={onClearAll} title="Clear Matrix">
                Clear Matrix
            </Button>
        </th>

        {#each options as option (option.id)}
            <OptionHeader
                {option}
                canDelete={options.length > 1}
                {onChange}
                onRemove={onRemoveOption}
            />
        {/each}
        <th class="bg-bg-light-1 border border-[#3D3D3D]"></th>
    </tr>
</thead>
