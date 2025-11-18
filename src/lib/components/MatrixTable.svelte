<script lang="ts">
    import type { Option, Criterion } from "$lib/types";
    import ReactiveTextArea from "./ReactiveTextArea.svelte";
    import AddCell from "./AddCell.svelte";

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

<section class="card">
    <div class="table-container">
        <table class="matrix-table">
            <thead>
                <tr>
                    <th class="criterion-col">
                        <button
                            class="clear-all-button"
                            onclick={onClearAll}>Clear Matrix</button>
                    </th>

                    {#each options as option (option.id)}
                        <th class="option-col">
                            <div class="option-header">
                                <ReactiveTextArea
                                    bind:value={option.name}
                                    onchange={onChange}
                                    class="option-name-input"
                                    placeholder="Option"
                                ></ReactiveTextArea>

                                <button
                                    onclick={() => onRemoveOption(option.id)}
                                    class="btn-icon btn-danger-icon option-delete"
                                    disabled={options.length <= 1}
                                    title="Remove option"
                                >
                                    x
                                </button>
                            </div>
                        </th>
                    {/each}
                </tr>
            </thead>

            <tbody>
                {#each criteria as criterion, idx (criterion.id)}
                    <tr class="criterion-row">
                        <td class="criterion-name-cell">
                            <div class="criterion-row-inner">
                                <ReactiveTextArea
                                    bind:value={criterion.name}
                                    onchange={onChange}
                                    class="criterion-name-input"
                                    placeholder="Criterion"
                                ></ReactiveTextArea>

                                <div class="weight-badge">
                                    <label for="weight">Weight:</label>
                                    <input
                                        name="weight"
                                        type="number"
                                        bind:value={criterion.weight}
                                        onchange={onChange}
                                        min="0"
                                        max="10"
                                        class="weight-input"
                                    />

                                    <button
                                        onclick={() => onRemoveCriterion(criterion.id)}
                                        class="btn-icon btn-danger-icon criterion-delete"
                                        disabled={criteria.length <= 1}
                                        title="Remove criterion"
                                    >
                                        x
                                    </button>
                                </div>
                            </div>
                        </td>

                        {#each options as option (option.id)}
                            <td class="score-cell">
                                <input
                                    type="number"
                                    bind:value={option.scores[criterion.id]}
                                    onchange={onChange}
                                    min="0"
                                    max="10"
                                    class="score-input"
                                    placeholder="0"
                                />
                                => {option.scores[criterion.id] * criterion.weight}
                            </td>
                        {/each}

                        {#if idx === 0}
                            <AddCell
                                tag="td"
                                rowspan={criteria.length}
                                onclick={onAddOption}
                            />
                        {/if}
                    </tr>
                {/each}

                <tr>
                    <td class="criterion-name-cell"></td>
                    <AddCell colspan={options.length} onclick={onAddCriterion} />
                    <td class="criterion-name-cell"></td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

<style>
    .card {
        background: var(--white);
        border-radius: 12px;
        padding: 1.2rem;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    }

    .card .table-container {
        overflow-x: auto;
        border-radius: 8px;
        border: 1px solid var(--border-light);
    }

    .matrix-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.9rem;
    }

    :global(.matrix-table) th,
    :global(.matrix-table) td {
        padding: 0.6rem;
        text-align: center;
        border: 1px solid var(--border-light);
        vertical-align: middle;
    }

    :global(.matrix-table) thead th {
        background-color: var(--primary);
        color: var(--white);
        font-weight: 600;
        position: sticky;
        top: 0;
        z-index: 10;
    }

    :global(.criterion-col) {
        text-align: left;
        min-width: 200px;
        max-width: 260px;
    }

    :global(.option-col) {
        min-width: 140px;
        height: 100%;
        padding: 0.4rem;
    }

    .option-header {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        justify-content: center;
        position: relative;
    }

    :global(.option-delete) {
        width: 20px;
        height: 20px;
    }

    .criterion-row-inner {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
        align-items: flex-start;
        justify-content: center;
    }

    :global(.criterion-name-input) {
        width: 100%;
        padding: 0.3rem 0.4rem;
        border: 1px solid var(--border-light);
        border-radius: 4px;
        background: var(--white);
        color: var(--text);
        text-align: left;
        font-size: 0.85rem;
        font-weight: 600;
    }

    :global(.criterion-name-input)::placeholder {
        color: var(--muted-text);
    }

    :global(.criterion-name-input):focus {
        outline: none;
        background: var(--white);
        border-color: var(--primary);
    }

    .weight-badge {
        display: flex;
        align-items: center;
        gap: 0.4rem;
    }

    :global(.weight-input) {
        width: 55px;
        padding: 0.2rem 0.3rem;
        border: 1px solid var(--border-light);
        border-radius: 4px;
        background: var(--white);
        color: var(--primary);
        text-align: center;
        font-size: 0.8rem;
        font-weight: 700;
    }

    :global(.weight-input):focus {
        outline: none;
        border-color: var(--primary);
        background: var(--white);
    }

    .btn-icon {
        border: none;
        background: transparent;
        color: var(--text);
        font-size: 1.1rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        line-height: 1;
        border-radius: 3px;
        transition: all 0.2s;
        font-weight: bold;
    }

    .btn-icon:hover:not(:disabled) {
        background: rgba(0, 0, 0, 0.04);
    }

    .btn-icon:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }

    .btn-danger-icon {
        background-color: var(--danger);
        color: var(--bg-light-3);
    }

    .btn-danger-icon:hover:not(:disabled) {
        background: var(--danger-hover);
    }

    .clear-all-button {
        background: var(--danger);
        color: var(--white);
        cursor: pointer;
        font-weight: 600;
        padding: 8px 16px;
        border: none;
        border-radius: 8px;
        margin-top: 8px;
    }

    .criterion-name-cell {
        background: var(--bg-light-1);
        text-align: left;
        padding: 0.4rem;
        vertical-align: middle;
    }

    :global(.option-name-input) {
        width: 100%;
        padding: 0.25rem 0.4rem;
        border: 1px solid var(--border-light);
        border-radius: 4px;
        font-size: 0.9rem;
        font-weight: 600;
        background: var(--white);
        color: var(--text);
        text-align: center;
    }

    :global(.option-name-input):focus {
        outline: none;
        border-color: var(--primary);
    }

    .score-cell {
        background: var(--white);
        padding: 0.3rem;
    }

    :global(.score-input) {
        width: 60px;
        padding: 0.4rem;
        border: 2px solid var(--border-light);
        border-radius: 4px;
        text-align: center;
        font-size: 0.9rem;
        font-weight: 600;
        transition: all 0.2s;
    }

    :global(.score-input):focus {
        outline: none;
        border-color: var(--primary);
        background: var(--muted-light);
    }

    :global(.score-input):hover {
        border-color: var(--border-light);
    }

    .matrix-table tbody tr:hover {
        background: var(--primary);
    }

    @media (max-width: 768px) {
        .table-container {
            font-size: 0.8rem;
        }

        :global(.matrix-table) th,
        :global(.matrix-table) td {
            padding: 0.4rem;
        }

        :global(.option-col) {
            min-width: 100px;
        }

        :global(.score-input) {
            width: 50px;
            padding: 0.3rem;
        }

        :global(.weight-input) {
            width: 40px;
        }
    }
</style>
