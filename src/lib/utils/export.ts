import type { Criterion, Option, Result } from '$lib/types';

export function exportToMarkdown(
	criteria: Criterion[],
	options: Option[],
	results: Result[]
): void {
	let markdown = '# Weighted Decision Matrix\n\n';

	markdown += '## Criteria\n\n';
	markdown += '| Criterion | Weight |\n';
	markdown += '|-----------|--------|\n';
	criteria.forEach((c) => {
		markdown += `| ${c.name} | ${c.weight} |\n`;
	});

	markdown += '\n## Options and Scores\n\n';
	markdown += '| Option | ' + criteria.map((c) => c.name).join(' | ') + ' |\n';
	markdown += '|--------|' + criteria.map(() => '--------').join('|') + '|\n';
	options.forEach((option) => {
		const scores = criteria.map((c) => option.scores[c.id] || 0).join(' | ');
		markdown += `| ${option.name} | ${scores} |\n`;
	});

	markdown += '\n## Results (Ranked)\n\n';
	markdown += '| Rank | Option | Total Score |\n';
	markdown += '|------|--------|-------------|\n';
	results.forEach((result, index) => {
		markdown += `| ${index + 1} | ${result.optionName} | ${result.totalScore.toFixed(2)} |\n`;
	});

	markdown += '\n## Detailed Breakdown\n\n';
	results.forEach((result) => {
		markdown += `### ${result.optionName} (Total: ${result.totalScore.toFixed(2)})\n\n`;
		result.weightedScores.forEach((ws) => {
			markdown += `- **${ws.criterionName}**: ${ws.score} × weight = ${ws.weighted.toFixed(2)}\n`;
		});
		markdown += '\n';
	});

	// Download the markdown file
	const blob = new Blob([markdown], { type: 'text/markdown' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = 'decision-matrix.md';
	a.click();
	URL.revokeObjectURL(url);
}
