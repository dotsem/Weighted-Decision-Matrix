<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import type { Result, Criterion, Option } from "$lib/types";
    import {
        convertToMarkdown,
        downloadMarkdown,
        copyMarkdownToClipboard,
    } from "$lib/utils/export";

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
                      r.weightedScores.map((w) => w.weighted),
                  ),
              )
            : 0;
    });

    function widthPercentGlobal(ws: { weighted: number }) {
        return globalMax > 0 ? (ws.weighted / globalMax) * 100 : 0;
    }

    function handleDownload() {
        const md = convertToMarkdown(criteria, options, results);
        downloadMarkdown(md);
    }

    async function handleCopy() {
        const md = convertToMarkdown(criteria, options, results);
        await copyMarkdownToClipboard(md);
        // Optionally provide ephemeral UI feedback in the future
    }
</script>

<div
    class="col-span-full bg-[#292929] rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
>
    <div class="flex flex-wrap justify-between items-center mb-4 gap-3">
        <h2 class="m-0 text-text text-xl font-bold">Results</h2>
        <div class="flex flex-wrap gap-2 items-center">
            <Button onclick={handleDownload} variant="primary">
                Download As Markdown
            </Button>
            <Button onclick={handleCopy} variant="secondary">
                Copy Markdown to Clipboard
            </Button>
        </div>
    </div>

    {#if results && results.length}
        <div class="flex flex-col gap-3.5">
            {#each results as result, index (result.optionId)}
                <div
                    class="p-4 rounded-lg shadow-lg border-l-4 bg-linear-to-br from-bg-light-1 to-[#292929] {index ===
                    0
                        ? 'border-l-gold from-[#3D3D3D]'
                        : index === 1
                          ? 'border-l-silver'
                          : index === 2
                            ? 'border-l-bronze'
                            : 'border-l-primary'}"
                >
                    <div class="flex items-center gap-3 mb-3">
                        <span
                            class="text-2xl font-bold {index === 0
                                ? 'text-gold-dark'
                                : index === 1
                                  ? 'text-silver'
                                  : index === 2
                                    ? 'text-bronze-dark'
                                    : 'text-text'}"
                        >
                            #{index + 1}
                        </span>
                        <h3 class="m-0 flex-1 text-text text-lg font-bold">
                            {result.optionName}
                        </h3>
                        <span
                            class="text-[1.4rem] font-bold px-2.5 py-1 bg-[#292929] rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] {index ===
                            0
                                ? 'text-gold-dark'
                                : index === 1
                                  ? 'text-silver'
                                  : index === 2
                                    ? 'text-bronze-dark'
                                    : 'text-primary'}"
                        >
                            {result.totalScore.toFixed(2)}
                        </span>
                    </div>

                    <div class="flex flex-col gap-2.5">
                        {#each result.weightedScores as ws}
                            <div
                                class="grid grid-cols-1 md:grid-cols-[160px_1fr_120px] items-center gap-1.5 md:gap-3"
                            >
                                <div class="text-left">
                                    <span
                                        class="font-semibold text-text text-[0.95rem]"
                                        >{ws.criterionName}</span
                                    >
                                </div>

                                <div
                                    class="h-5 bg-[#474747] rounded-full overflow-hidden relative shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
                                    aria-hidden="true"
                                >
                                    <div
                                        class="absolute left-0 top-0 h-full transition-[width] duration-250 ease-in-out shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] z-10 {index ===
                                        0
                                            ? 'bg-linear-to-r from-gold to-gold-dark'
                                            : index === 1
                                              ? 'bg-linear-to-r from-silver to-silver'
                                              : index === 2
                                                ? 'bg-linear-to-r from-bronze to-bronze-dark'
                                                : 'bg-text'}"
                                        style="width: {widthPercentGlobal(ws)}%"
                                    ></div>
                                </div>

                                <div class="text-left md:text-right">
                                    <span
                                        class="font-semibold text-text text-[0.9rem]"
                                    >
                                        {ws.score} * w = {ws.weighted.toFixed(
                                            2,
                                        )}
                                    </span>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <p class="text-center text-muted-text p-5 text-base m-0">
            Add criteria and options to see results
        </p>
    {/if}
</div>
