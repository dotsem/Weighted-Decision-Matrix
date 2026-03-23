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
<hr />

<ResultsSection
    results={matrixStore.results}
    criteria={matrixStore.criteria}
    options={matrixStore.options}
    onExport={handleExport}
/>

<style>
    :global(body) {
        margin: 1rem;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, sans-serif;
        min-height: 100vh;
        background-color: var(--bg);
    }

    .container {
        margin: 0 auto;
        padding: 1.5rem;
    }

    header {
        text-align: center;
        color: var(--text);
        margin-bottom: 1.5rem;
    }

    header h1 {
        font-size: 2.5rem;
        margin: 0 0 0.3rem 0;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    }

    header p {
        font-size: 1rem;
        opacity: 0.95;
        margin: 0;
        margin-bottom: 1.5rem;
    }

    @media (max-width: 768px) {
        .container {
            padding: 1rem;
        }

        header h1 {
            font-size: 1.8rem;
        }
    }
</style>
