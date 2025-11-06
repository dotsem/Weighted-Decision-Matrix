<script lang="ts">
	import type { Criterion } from '$lib/types';

	interface Props {
		criteria: Criterion[];
		onAdd: () => void;
		onRemove: (id: string) => void;
		onChange: () => void;
	}

    $effect(() => {
        criteria.sort((a, b) => b.weight - a.weight);
    })

	let { criteria, onAdd, onRemove, onChange }: Props = $props();
</script>

<section class="card">
	<div class="header">
		<h2>📊 Criteria</h2>
		<button onclick={onAdd} class="btn btn-primary">+ Add</button>
	</div>
	<div class="list">
		{#each criteria as criterion (criterion.id)}
			<div class="criterion-item">
				<input
					type="text"
					bind:value={criterion.name}
					onchange={onChange}
					class="input-text"
					placeholder="Criterion name"
				/>
				<div class="weight-input">
					<label for="weight-{criterion.id}">Weight:</label>
					<input
						id="weight-{criterion.id}"
						type="number"
						bind:value={criterion.weight}
						onchange={onChange}
						min="0"
						max="10"
						class="input-number"
					/>
				</div>
				<button
					onclick={() => onRemove(criterion.id)}
					class="btn btn-danger"
					disabled={criteria.length <= 1}
					title="Remove criterion"
				>
					🗑️
				</button>
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

	.criterion-item {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		padding: 0.8rem;
		background: #f9fafb;
		border-radius: 6px;
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

	.weight-input {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		white-space: nowrap;
	}

	.weight-input label {
		font-weight: 500;
		color: #666;
		font-size: 0.85rem;
	}

	.input-number {
		padding: 0.4rem;
		border: 2px solid #e5e7eb;
		border-radius: 6px;
		font-size: 0.9rem;
		width: 60px;
		text-align: center;
	}

	.input-number:focus {
		outline: none;
		border-color: #667eea;
	}

	@media (max-width: 768px) {
		.criterion-item {
			flex-wrap: wrap;
		}
	}
</style>
