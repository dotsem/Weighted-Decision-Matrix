<script lang="ts">
    import type { Option, Criterion } from "$lib/types";
    import MatrixHeader from "../lib/components/MatrixHeader.svelte";
    import CriterionRow from "../lib/components/CriterionRow.svelte";
    import AddCell from "../lib/components/AddCell.svelte";

    interface Props {
        options: Option[];
        criteria: Criterion[];
        onAddOption: () => void;
        onRemoveOption: (id: string) => void;
        onAddCriterion: () => void;
        onRemoveCriterion: (id: string) => void;
        onChange: () => void;
        onClearAll: () => void;
    }

    let {
        options,
        criteria,
        onAddOption,
        onRemoveOption,
        onAddCriterion,
        onRemoveCriterion,
        onChange,
        onClearAll,
    }: Props = $props();
</script>

<div
    class="overflow-x-auto rounded-lg border border-border-light shadow-lg text-[0.8rem] md:text-[0.9rem]"
>
    <table class="w-full border-collapse">
        <MatrixHeader
            {options}
            {criteria}
            {onClearAll}
            {onRemoveOption}
            {onChange}
        />

        <tbody>
            {#each criteria as criterion, idx (criterion.id)}
                <CriterionRow
                    {criterion}
                    {options}
                    {idx}
                    criteriaLength={criteria.length}
                    canDelete={criteria.length > 1}
                    {onChange}
                    onRemove={onRemoveCriterion}
                    {onAddOption}
                />
            {/each}

            <tr>
                <td class="bg-bg-light-1 text-left p-1.5 align-middle"></td>
                <AddCell colspan={options.length} onclick={onAddCriterion} />
                <td class="bg-bg-light-1 text-left p-1.5 align-middle"></td>
            </tr>
        </tbody>
    </table>
</div>
