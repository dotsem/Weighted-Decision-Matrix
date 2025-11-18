<script lang="ts">
    import type { Result, Criterion, Option } from "$lib/types";

    interface Props {
        results: Result[];
        criteria: Criterion[];
        options: Option[];
        onExport: () => void;
    }

    let { results, criteria, options, onExport }: Props = $props();

    let globalMax = $derived.by<number>(() => {
        return results && results.length
            ? Math.max(
                  0,
                  ...results.flatMap((r) =>
                      r.weightedScores.map((w) => w.weighted)
                  )
              )
            : 0;
    });

    function widthPercentGlobal(ws: { weighted: number }) {
        return globalMax > 0 ? (ws.weighted / globalMax) * 100 : 0;
    }
</script>

<section class="card results">
    <div class="header">
        <h2>Results</h2>
        <button onclick={onExport} class="btn btn-success"
            >Export To Markdown</button
        >
    </div>

    {#if results && results.length}
        <div class="results-list">
            {#each results as result, index (result.optionId)}
                <div class="result-card rank-{index + 1}">
                    <div class="result-header">
                        <span class="rank">#{index + 1}</span>
                        <h3>{result.optionName}</h3>
                        <span class="total-score"
                            >{result.totalScore.toFixed(2)}</span
                        >
                    </div>

                    <div class="breakdown">
                        {#each result.weightedScores as ws}
                            <div class="breakdown-item">
                                <div class="criterion-col">
                                    <span class="criterion-name"
                                        >{ws.criterionName}</span
                                    >
                                </div>

                                <div
                                    class="score-bar-container"
                                    aria-hidden="true"
                                >
                                    <div
                                        class="score-bar-global"
                                        style="width: {widthPercentGlobal(ws)}%"
                                    ></div>
                                </div>

                                <div class="score-meta">
                                    <span class="score-value"
                                        >{ws.score} * w = {ws.weighted.toFixed(
                                            2
                                        )}</span
                                    >
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <p class="no-data">Add criteria and options to see results</p>
    {/if}
</section>

<style>
    .card {
        background: var(--white);
        border-radius: 12px;
        padding: 1.2rem;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
        grid-column: 1 / -1;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        gap: 0.8rem;
    }

    .header h2 {
        margin: 0;
        color: var(--text);
        font-size: 1.25rem;
    }

    .btn {
        padding: 0.4rem 0.8rem;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.85rem;
        font-weight: 600;
        transition: all 0.2s;
        white-space: nowrap;
    }

    .btn-success {
        background: var(--success);
        color: var(--white);
    }

    .btn-success:hover {
        background: var(--success-2);
        transform: translateY(-1px);
    }

    .results-list {
        display: flex;
        flex-direction: column;
        gap: 0.9rem;
    }

    .result-card {
        padding: 1rem;
        border-radius: 8px;
        border-left: 4px solid var(--primary);
        background: linear-gradient(135deg, var(--bg-light-1) 0%, var(--white) 100%);
    }

   

    .result-card.rank-1 {
        border-left-color: var(--gold);
        background: linear-gradient(135deg, var(--bg-light-1) 0%, var(--white) 100%);

        .rank {
            color: var(--gold-dark);
            font-size: 1.5rem;
        }

        .total-score {
            color: var(--gold-dark);
        }

        .score-bar-global {
            background: linear-gradient(90deg, var(--gold) 0%, var(--gold-dark) 100%);
        }
    }

    .result-card.rank-2 {
        border-left-color: var(--silver);
        background: linear-gradient(135deg, var(--bg-light-2) 0%, var(--white) 100%);
        .rank {
            color: var(--silver);
            font-size: 1.5rem;
        }

        .total-score {
            color: var(--silver);
        }
        
        .score-bar-global {
            background: linear-gradient(90deg, var(--silver) 0%, var(--silver) 100%);
        }
    }

    .result-card.rank-3 {
        border-left-color: var(--bronze);
        background: linear-gradient(135deg, var(--bg-light-2) 0%, var(--white) 100%);
        .rank {
            color: var(--bronze-dark);
            font-size: 1.5rem;
        }

        .total-score {
            color: var(--bronze-dark);
        }
        
        .score-bar-global {
            background: linear-gradient(90deg, var(--bronze) 0%, var(--bronze-dark) 100%);
        }
    }

    .result-header {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        margin-bottom: 0.75rem;
    }

    .result-header h3 {
        margin: 0;
        flex: 1;
        color: var(--text);
        font-size: 1.1rem;
    }

    .total-score {
        font-size: 1.4rem;
        font-weight: 700;
        color: var(--primary);
        padding: 0.25rem 0.6rem;
        background: var(--white);
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    }

    .breakdown {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
    }

    .breakdown-item {
        display: grid;
        grid-template-columns: 160px 1fr 120px;
        align-items: center;
        gap: 0.8rem;
    }

    .criterion-col {
        text-align: left;
    }

    .criterion-name {
        font-weight: 600;
        color: var(--text);
        font-size: 0.95rem;
    }

    .score-bar-container {
        height: 20px;
        background: var(--bg-light-3);
        border-radius: 10px;
        overflow: hidden;
        position: relative;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
    }

     

    .score-bar-global {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        background-color: color-mix(in srgb, var(--primary) 30%, transparent);
        transition: width 0.25s ease;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.06);
        z-index: 2;
    }

    .score-meta {
        text-align: right;
    }

    .score-value {
        font-weight: 600;
        color: var(--text);
        font-size: 0.9rem;
    }

    .no-data {
        text-align: center;
        color: var(--muted-text);
        padding: 1.2rem;
        font-size: 1rem;
        margin: 0;
    }

    @media (max-width: 768px) {
        .breakdown-item {
            grid-template-columns: 1fr;
            gap: 0.4rem;
        }
        .score-meta {
            text-align: left;
        }
    }
</style>
