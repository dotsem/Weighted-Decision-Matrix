<script lang="ts">
    import MatrixTable from "./MatrixTable.svelte";
    import ResultsSection from "./ResultsSection.svelte";
    import { matrixStore } from "$lib/stores/matrixStore.svelte";
    import { exportToMarkdown } from "$lib/utils/export";

    function handleExport() {
        exportToMarkdown(
            matrixStore.criteria,
            matrixStore.options,
            matrixStore.results,
        );
    }
</script>

<svelte:head>
    <title>Weighted Decision Matrix</title>
</svelte:head>

<div class="p-2 text-center text-text mb-6">
    <h1
        class="text-3xl md:text-[2.5rem] mt-0 mb-1.5 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.2)]"
    >
        Weighted Decision Matrix
    </h1>
    <p class="text-base opacity-95 mt-0 mb-6">
        Evaluate and compare multiple options based on weighted criteria to make
        informed decisions.
    </p>

    <MatrixTable
        options={matrixStore.options}
        criteria={matrixStore.criteria}
        onAddOption={() => matrixStore.addOption()}
        onRemoveOption={(id) => matrixStore.removeOption(id)}
        onAddCriterion={() => matrixStore.addCriterion()}
        onRemoveCriterion={(id) => matrixStore.removeCriterion(id)}
        onChange={() => matrixStore.updateOption()}
        onClearAll={() => {
            if (confirm("Are you sure?")) matrixStore.clear();
        }}
    />
    <hr class="border-primary my-8" />

    <ResultsSection
        results={matrixStore.results}
        criteria={matrixStore.criteria}
        options={matrixStore.options}
        onExport={handleExport}
    />
</div>
