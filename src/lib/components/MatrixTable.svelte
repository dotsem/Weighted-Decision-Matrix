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
                    <th class="option-col"
                        >Options <br /><button class="clear-all-button" onclick={onClearAll}
                            >Clear Matrix</button
                        ></th
                    >
                    {#each criteria as criterion (criterion.id)}
                        <th class="criterion-col">
                            <div class="criterion-header">
                                <ReactiveTextArea
                                    bind:value={criterion.name}
                                    onchange={onChange}
                                    class="criterion-name-input"
                                    placeholder="Criterion"
                                ></ReactiveTextArea>

                                <div>
                                    <div class="weight-badge" title="Weight">
                                        <input
                                            type="number"
                                            bind:value={criterion.weight}
                                            onchange={onChange}
                                            min="0"
                                            max="10"
                                            class="weight-input"
                                        />
                                    </div>
                                    <button
                                        onclick={() =>
                                            onRemoveCriterion(criterion.id)}
                                        class="btn-icon btn-danger-icon"
                                        disabled={criteria.length <= 1}
                                        title="Remove criterion"
                                    >
                                        x
                                    </button>
                                </div>
                            </div>
                        </th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#each options as option, idx (option.id)}
                    <tr>
                        <td class="option-name-cell">
                            <div class="option-name-container">
                                <ReactiveTextArea
                                    bind:value={option.name}
                                    onchange={onChange}
                                    placeholder="Option name"
                                    class="option-name-input"
                                ></ReactiveTextArea>
                                <button
                                    onclick={() => onRemoveOption(option.id)}
                                    class="btn-icon btn-danger-icon"
                                    disabled={options.length <= 1}
                                    title="Remove option"
                                >
                                    x
                                </button>
                            </div>
                        </td>
                        {#each criteria as criterion (criterion.id)}
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
                            </td>
                        {/each}
                        {#if idx === 0}
                            <AddCell
                                tag="td"
                                rowspan={options.length}
                                onclick={onAddCriterion}
                            />
                        {/if}
                    </tr>
                {/each}
                <tr>
                    <td class="option-name-cell"></td>
                    <AddCell colspan={criteria.length} onclick={onAddOption} />
                    <td class="option-name-cell"></td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

<style>
    .card {
        background: white;
        border-radius: 12px;
        padding: 1.2rem;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);

        .table-container {
            overflow-x: auto;
            border-radius: 8px;
            border: 1px solid #e5e7eb;

            .matrix-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 0.9rem;

                th,
                td {
                    padding: 0.6rem;
                    text-align: center;
                    border: 1px solid #e5e7eb;
                }
                thead th {
                    background: linear-gradient(
                        135deg,
                        #667eea 0%,
                        #764ba2 100%
                    );
                    color: white;
                    font-weight: 600;
                    position: sticky;
                    top: 0;
                    z-index: 10;
                }
            }
        }
    }

    .option-col {
        text-align: left;
        min-width: 150px;
        max-width: 200px;
    }

    .criterion-col {
        min-width: 140px;
        height: 100%;
        padding: 0.4rem;

        .criterion-header {
            height: 100%;
            display: flex;
            flex-direction: column;

            gap: 0.3rem;
            align-items: center;
            justify-content: center;
        }
    }

    :global(.criterion-name-input) {
        width: 100%;
        padding: 0.3rem 0.4rem;
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.2);
        color: white;
        text-align: center;
        font-size: 0.85rem;
        font-weight: 600;

        &::placeholder {
            color: rgba(255, 255, 255, 0.7);
        }

        &:focus {
            outline: none;
            background: rgba(255, 255, 255, 0.3);
            border-color: rgba(255, 255, 255, 0.5);
        }
    }

    .weight-badge {
        display: flex;
        align-items: center;
        gap: 0.2rem;
    }

    .weight-input {
        width: 45px;
        padding: 0.2rem 0.3rem;
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.95);
        color: #667eea;
        text-align: center;
        font-size: 0.8rem;
        font-weight: 700;
    }

    .weight-input:focus {
        outline: none;
        border-color: white;
        background: white;
    }

    .btn-icon {
        border: none;
        background: transparent;
        color: white;
        font-size: 1.3rem;
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
        background: rgba(255, 255, 255, 0.2);
    }

    .btn-icon:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }

    .btn-danger-icon:hover:not(:disabled) {
        background: rgba(239, 68, 68, 0.9);
    }

    .clear-all-button {
        background: #ef4444;
        color: white;
        font-weight: 600;
        padding: 8px 16px;
        border: none;
        border-radius: 8px;
        margin-top: 8px;
    }

    .option-name-cell {
        background: #f9fafb;
        text-align: left;
        padding: 0.4rem;
    }

    .option-name-container {
        display: flex;
        align-items: center;
        gap: 0.4rem;
    }

    :global(.option-name-input) {
        flex: 1;
        padding: 0.4rem 0.5rem;
        border: 1px solid #e5e7eb;
        border-radius: 4px;
        font-size: 0.9rem;
        font-weight: 600;
        background: white;

        &:focus {
            outline: none;
            border-color: #667eea;
        }
    }

    .option-name-container .btn-icon {
        color: #ef4444;
    }

    .score-cell {
        background: white;
        padding: 0.3rem;
    }

    .score-input {
        width: 60px;
        padding: 0.4rem;
        border: 2px solid #e5e7eb;
        border-radius: 4px;
        text-align: center;
        font-size: 0.9rem;
        font-weight: 600;
        transition: all 0.2s;
    }

    .score-input:focus {
        outline: none;
        border-color: #667eea;
        background: #f0f4ff;
    }

    .score-input:hover {
        border-color: #cbd5e1;
    }

    /* Zebra striping for rows */
    .matrix-table tbody tr:nth-child(even) {
        background: #fafafa;
    }

    .matrix-table tbody tr:hover {
        background: #f0f4ff;
    }

    @media (max-width: 768px) {
        .table-container {
            font-size: 0.8rem;
        }

        .matrix-table th,
        .matrix-table td {
            padding: 0.4rem;
        }

        .criterion-col {
            min-width: 100px;
        }

        .score-input {
            width: 50px;
            padding: 0.3rem;
        }

        .weight-input {
            width: 40px;
        }
    }
</style>
