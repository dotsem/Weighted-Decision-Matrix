import type { Criterion, Option, Result } from '$lib/types';

export function convertToMarkdown(
	criteria: Criterion[],
	options: Option[],
	results: Result[]
): string {
	let markdown = '# Weighted Decision Matrix\n\n';

	markdown += '## Criteria\n\n';
	markdown += '| Criterion | Weight |\n';
	markdown += '|-----------|--------|\n';
	criteria.forEach((c) => {
		markdown += `| ${c.name} | ${c.weight} |\n`;
	});

	markdown += '\n## Options and Scores\n\n';
	markdown += '| | ' + options.map((o) => o.name).join(' | ') + ' |\n';
	markdown += '|--------|' + options.map(() => '--------').join('|') + '|\n';
	criteria.forEach((criterion) => {
		const scores = options.map((o) => o.scores[criterion.id] || 0).join(' | ');
		markdown += `| ${criterion.name} | ${scores} |\n`;
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

	return markdown;
}

export async function copyMarkdownToClipboard(markdown: string): Promise<void> {
	try {
		if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
			await navigator.clipboard.writeText(markdown);
		} else if (typeof document !== 'undefined') {
			const textarea = document.createElement('textarea');
			textarea.value = markdown;
			document.body.appendChild(textarea);
			textarea.select();
			document.execCommand('copy');
			textarea.remove();
		}
	} catch (e) {
		console.error('Failed to copy markdown to clipboard', e);
	}
}

export function downloadMarkdown(markdown: string, filename = 'decision-matrix.md'): void {
	if (typeof document === 'undefined') return;
	const blob = new Blob([markdown], { type: 'text/markdown' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(url);
}

// Backwards-compatible convenience wrapper
export async function exportToMarkdown(
	criteria: Criterion[],
	options: Option[],
	results: Result[],
	opts?: { copy?: boolean; download?: boolean; filename?: string }
): Promise<void> {
	const { copy = false, download = true, filename = 'decision-matrix.md' } = opts || {};
	const md = convertToMarkdown(criteria, options, results);
	if (copy) await copyMarkdownToClipboard(md);
	if (download) downloadMarkdown(md, filename);
}
