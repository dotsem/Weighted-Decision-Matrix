<script lang="ts">
	import type { Result, Criterion, Option } from '$lib/types';

	interface Props {
		results: Result[];
		criteria: Criterion[];
		options: Option[];
		onExport: () => void;
	}

	let { results, criteria, options, onExport }: Props = $props();
</script>

<section class="card results">
	<div class="header">
		<h2>🏆 Results</h2>
		<button onclick={onExport} class="btn btn-success">📥 Export To Markdown</button>
	</div>

	{#if results.length > 0}
		<div class="results-list">
			{#each results as result, index (result.optionId)}
				<div class="result-card rank-{index + 1}">
					<div class="result-header">
						<span class="rank">#{index + 1}</span>
						<h3>{result.optionName}</h3>
						<span class="total-score">{result.totalScore.toFixed(2)}</span>
					</div>
					<div class="breakdown">
						{#each result.weightedScores as ws}
							<div class="breakdown-item">
								<span class="criterion-name">{ws.criterionName}</span>
								<div class="score-bar-container">
									<div class="score-bar" style="width: {(ws.weighted / 10) * 100}%"></div>
								</div>
								<span class="score-value">{ws.score} × w = {ws.weighted.toFixed(2)}</span>
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
		background: white;
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
		color: #333;
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
		background: #10b981;
		color: white;
	}

	.btn-success:hover {
		background: #059669;
		transform: translateY(-1px);
	}

	.results-list {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	.result-card {
		padding: 1rem;
		border-radius: 8px;
		border-left: 4px solid #667eea;
		background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
	}

	.result-card.rank-1 {
		border-left-color: #fbbf24;
		background: linear-gradient(135deg, #fef3c7 0%, #ffffff 100%);
	}

	.result-card.rank-2 {
		border-left-color: #9ca3af;
	}

	.result-card.rank-3 {
		border-left-color: #d97706;
	}

	.result-header {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		margin-bottom: 0.8rem;
	}

	.rank {
		font-size: 1.25rem;
		font-weight: 700;
		color: #667eea;
		min-width: 40px;
	}

	.result-card.rank-1 .rank {
		color: #f59e0b;
		font-size: 1.5rem;
	}

	.result-header h3 {
		margin: 0;
		flex: 1;
		color: #111;
		font-size: 1.1rem;
	}

	.total-score {
		font-size: 1.5rem;
		font-weight: 700;
		color: #667eea;
		padding: 0.3rem 0.8rem;
		background: white;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
	}

	.result-card.rank-1 .total-score {
		color: #f59e0b;
	}

	.breakdown {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.breakdown-item {
		display: grid;
		grid-template-columns: 130px 1fr 130px;
		align-items: center;
		gap: 0.8rem;
	}

	.criterion-name {
		font-weight: 500;
		color: #666;
		font-size: 0.85rem;
	}

	.score-bar-container {
		height: 20px;
		background: #e5e7eb;
		border-radius: 10px;
		overflow: hidden;
	}

	.score-bar {
		height: 100%;
		background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
		transition: width 0.3s ease;
	}

	.result-card.rank-1 .score-bar {
		background: linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%);
	}

	.score-value {
		text-align: right;
		font-weight: 600;
		color: #333;
		font-size: 0.8rem;
	}

	.no-data {
		text-align: center;
		color: #9ca3af;
		padding: 1.5rem;
		font-size: 1rem;
		margin: 0;
	}

	@media (max-width: 768px) {
		.breakdown-item {
			grid-template-columns: 1fr;
			gap: 0.4rem;
		}

		.score-value {
			text-align: left;
		}
	}
</style>
