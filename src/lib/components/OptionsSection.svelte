<script lang="ts">
	import type { Option, Criterion } from '$lib/types';

	interface Props {
		options: Option[];
		criteria: Criterion[];
		onAdd: () => void;
		onRemove: (id: string) => void;
		onChange: () => void;
	}

	let { options, criteria, onAdd, onRemove, onChange }: Props = $props();
</script>

<section class="card">
	<div class="header">
		<h2>🎯 Options</h2>
		<button onclick={onAdd} class="btn btn-primary">+ Add</button>
	</div>
	<div class="list">
		{#each options as option (option.id)}
			<div class="option-card">
				<div class="option-header">
					<input
						type="text"
						bind:value={option.name}
						onchange={onChange}
						class="input-text option-name"
						placeholder="Option name"
					/>
					<button
						onclick={() => onRemove(option.id)}
						class="btn btn-danger"
						disabled={options.length <= 1}
						title="Remove option"
					>
						🗑️
					</button>
				</div>
				<div class="scores-grid">
					{#each criteria as criterion (criterion.id)}
						<div class="score-item">
							<label for="score-{option.id}-{criterion.id}">{criterion.name}:</label>
							<input
								id="score-{option.id}-{criterion.id}"
								type="number"
								bind:value={option.scores[criterion.id]}
								onchange={onChange}
								min="0"
								max="10"
								class="input-number"
							/>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.card {
		background: white;
		border-radius: 12px;
		padding: 1.2rem;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
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

	.btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.btn-primary {
		background: #667eea;
		color: white;
	}

	.btn-primary:hover:not(:disabled) {
		background: #5568d3;
		transform: translateY(-1px);
	}

	.btn-danger {
		background: #ef4444;
		color: white;
		padding: 0.3rem 0.6rem;
		font-size: 0.9rem;
	}

	.btn-danger:hover:not(:disabled) {
		background: #dc2626;
	}

	.list {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	.option-card {
		padding: 0.8rem;
		background: #f9fafb;
		border-radius: 6px;
	}

	.option-header {
		display: flex;
		gap: 0.8rem;
		margin-bottom: 0.8rem;
	}

	.input-text {
		padding: 0.5rem;
		border: 2px solid #e5e7eb;
		border-radius: 6px;
		font-size: 0.9rem;
		transition: border-color 0.2s;
		flex: 1;
	}

	.input-text:focus {
		outline: none;
		border-color: #667eea;
	}

	.option-name {
		font-weight: 600;
	}

	.scores-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		gap: 0.6rem;
	}

	.score-item {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.score-item label {
		font-size: 0.8rem;
		color: #666;
		font-weight: 500;
	}

	.input-number {
		padding: 0.4rem;
		border: 2px solid #e5e7eb;
		border-radius: 6px;
		font-size: 0.9rem;
		text-align: center;
	}

	.input-number:focus {
		outline: none;
		border-color: #667eea;
	}
</style>
