<script lang="ts">
    import type { Option, Criterion } from "$lib/types";
    import ReactiveTextArea from "./ReactiveTextArea.svelte";
    import AddCell from "./AddCell.svelte";
    import Button from "./Button.svelte";

    interface Props {
        criterion: Criterion;
        options: Option[];
        idx: number;
        criteriaLength: number;
        canDelete: boolean;
        onChange: () => void;
        onRemove: (id: string) => void;
        onAddOption: () => void;
    }

    let {
        criterion,
        options,
        idx,
        criteriaLength,
        canDelete,
        onChange,
        onRemove,
        onAddOption,
    }: Props = $props();
</script>

<tr class="hover:bg-primary">
    <td
        class="bg-bg-light-1 text-left p-1.5 align-middle border border-[#3D3D3D]"
    >
        <div class="flex flex-col gap-1.5 items-start justify-center">
            <ReactiveTextArea
                bind:value={criterion.name}
                onchange={onChange}
                class="w-full px-1.5 py-1 text-[0.85rem] font-semibold text-text bg-[#292929] border border-[#3D3D3D] rounded hover:border-primary focus:outline-none focus:border-primary text-left placeholder:text-muted-text"
                placeholder="Criterion"
            ></ReactiveTextArea>

            <div class="flex items-center gap-1.5">
                <label for="weight" class="text-[0.9rem]">Weight:</label>
                <input
                    name="weight"
                    type="number"
                    bind:value={criterion.weight}
                    onchange={onChange}
                    min="0"
                    max="10"
                    class="w-[55px] max-md:w-[40px] px-1 py-0.5 text-[0.8rem] font-bold text-primary bg-[#292929] border border-[#3D3D3D] rounded text-center focus:outline-none focus:border-primary"
                />

                <Button
                    onclick={() => onRemove(criterion.id)}
                    variant="danger"
                    disabled={!canDelete}
                    title="Remove criterion"
                >
                    x
                </Button>
            </div>
        </div>
    </td>

    {#each options as option (option.id)}
        <td
            class="bg-[#292929] text-text p-1 border border-[#3D3D3D] align-middle text-center"
        >
            <input
                type="number"
                bind:value={option.scores[criterion.id]}
                onchange={onChange}
                min="0"
                max="10"
                class="w-[60px] max-md:w-[50px] max-md:p-[0.3rem] p-1.5 text-[0.9rem] font-semibold text-center border-2 border-[#3D3D3D] rounded bg-bg-light-1 text-text transition-all duration-200 focus:outline-none focus:border-primary focus:bg-[#474747] hover:border-[#3D3D3D] ml-1 mr-1"
                placeholder="0"
            />
            => {option.scores[criterion.id] * criterion.weight}
        </td>
    {/each}

    {#if idx === 0}
        <AddCell tag="td" rowspan={criteriaLength} onclick={onAddOption} />
    {/if}
</tr>
