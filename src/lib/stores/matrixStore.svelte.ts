import type { Criterion, Option, Result, MatrixState } from '$lib/types';

const STORAGE_KEY = 'weighted-decision-matrix';

function loadFromStorage(): MatrixState | null {
	if (typeof window === 'undefined') return null;
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored ? JSON.parse(stored) : null;
	} catch {
		return null;
	}
}

function saveToStorage(state: MatrixState) {
	if (typeof window === 'undefined') return;
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	} catch (e) {
		console.error('Failed to save to localStorage:', e);
	}
}

function getInitialState(): MatrixState {
	const stored = loadFromStorage();
	if (stored) return stored;

	return {
		criteria: [
			{ id: '1', name: 'Cost', weight: 3 },
			{ id: '2', name: 'Quality', weight: 5 },
			{ id: '3', name: 'Speed', weight: 4 }
		],
		options: [
			{ id: '1', name: 'Option A', scores: { '1': 7, '2': 8, '3': 6 } },
			{ id: '2', name: 'Option B', scores: { '1': 9, '2': 6, '3': 7 } },
			{ id: '3', name: 'Option C', scores: { '1': 6, '2': 9, '3': 8 } }
		],
		nextCriterionId: 4,
		nextOptionId: 4
	};
}

class MatrixStore {
	criteria = $state<Criterion[]>([]);
	options = $state<Option[]>([]);
	nextCriterionId = $state(4);
	nextOptionId = $state(4);

	constructor() {
		const initial = getInitialState();
		this.criteria = initial.criteria;
		this.options = initial.options;
		this.nextCriterionId = initial.nextCriterionId;
		this.nextOptionId = initial.nextOptionId;
	}

	results = $derived.by(() => {
		const totalWeight = this.criteria.reduce((sum, c) => sum + c.weight, 0);
		if (totalWeight === 0) return [];

		return this.options
			.map((option) => {
				const weightedScores = this.criteria.map((criterion) => {
					const score = option.scores[criterion.id] || 0;
					const weighted = (score * criterion.weight) / totalWeight;
					return {
						criterionName: criterion.name,
						score,
						weighted
					};
				});

				const totalScore = weightedScores.reduce((sum, ws) => sum + ws.weighted, 0);

				return {
					optionId: option.id,
					optionName: option.name,
					totalScore,
					weightedScores
				};
			})
			.sort((a, b) => b.totalScore - a.totalScore);
	});

	private save() {
		saveToStorage({
			criteria: this.criteria,
			options: this.options,
			nextCriterionId: this.nextCriterionId,
			nextOptionId: this.nextOptionId
		});
	}

	addCriterion() {
		const newId = String(this.nextCriterionId++);
		this.criteria.push({ id: newId, name: `Criterion ${newId}`, weight: 1 });
		this.options.forEach((option) => {
			option.scores[newId] = 5;
		});
		this.save();
	}

	removeCriterion(id: string) {
		this.criteria = this.criteria.filter((c) => c.id !== id);
		this.options.forEach((option) => {
			delete option.scores[id];
		});
		this.save();
	}

	updateCriterion() {
		this.save();
	}

	addOption() {
		const newId = String(this.nextOptionId++);
		const scores: Record<string, number> = {};
		this.criteria.forEach((criterion) => {
			scores[criterion.id] = 5;
		});
		this.options.push({ id: newId, name: `Option ${newId}`, scores });
		this.save();
	}

	removeOption(id: string) {
		this.options = this.options.filter((o) => o.id !== id);
		this.save();
	}

	updateOption() {
		this.save();
	}

	clear() {
		this.criteria = [{ id: '1', name: 'Criterion 1', weight: 1 }];
		this.options = [{ id: '1', name: 'Option 1', scores: { '1': 5 } }];
		this.nextCriterionId = 2;
		this.nextOptionId = 2;
		this.save();
	}
}

export const matrixStore = new MatrixStore();
