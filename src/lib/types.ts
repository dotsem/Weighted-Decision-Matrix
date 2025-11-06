export interface Criterion {
	id: string;
	name: string;
	weight: number;
}

export interface Option {
	id: string;
	name: string;
	scores: Record<string, number>;
}

export interface Result {
	optionId: string;
	optionName: string;
	totalScore: number;
	weightedScores: Array<{ criterionName: string; score: number; weighted: number }>;
}

export interface MatrixState {
	criteria: Criterion[];
	options: Option[];
	nextCriterionId: number;
	nextOptionId: number;
}
