<script lang="ts">
	import CriteriaSection from '$lib/components/CriteriaSection.svelte';
	import OptionsSection from '$lib/components/OptionsSection.svelte';
	import ResultsSection from '$lib/components/ResultsSection.svelte';
	import { matrixStore } from '$lib/stores/matrixStore.svelte';
	import { exportToMarkdown } from '$lib/utils/export';

	function handleExport() {
		exportToMarkdown(matrixStore.criteria, matrixStore.options, matrixStore.results);
	}
</script>

<div class="container">
	<header>
		<h1>⚖️ Weighted Decision Matrix</h1>
		<p>Make better decisions by comparing options across weighted criteria</p>
	</header>

	<div class="sections">
		<CriteriaSection
			criteria={matrixStore.criteria}
			onAdd={() => matrixStore.addCriterion()}
			onRemove={(id) => matrixStore.removeCriterion(id)}
			onChange={() => matrixStore.updateCriterion()}
		/>

		<OptionsSection
			options={matrixStore.options}
			criteria={matrixStore.criteria}
			onAdd={() => matrixStore.addOption()}
			onRemove={(id) => matrixStore.removeOption(id)}
			onChange={() => matrixStore.updateOption()}
		/>
	</div>

	<ResultsSection
		results={matrixStore.results}
		criteria={matrixStore.criteria}
		options={matrixStore.options}
		onExport={handleExport}
	/>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			sans-serif;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		min-height: 100vh;
	}

	.container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 1.5rem;
	}

	header {
		text-align: center;
		color: white;
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
	}

	.sections {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 1.2rem;
		margin-bottom: 1.2rem;
	}

	@media (max-width: 768px) {
		.container {
			padding: 1rem;
		}

		header h1 {
			font-size: 1.8rem;
		}

		.sections {
			grid-template-columns: 1fr;
		}
	}
</style>
