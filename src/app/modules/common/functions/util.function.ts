// * Sorts.
import { TMiniature } from '@common/sorts/common.sort';

export function transformStyle(header: TMiniature[], title: TMiniature[], subtitle: TMiniature[]): string {
	let style: string = '';

	if (
		(Array.isArray(header) && header.length > 0) ||
		(Array.isArray(title) && title.length > 0) ||
		(Array.isArray(subtitle) && subtitle.length > 0)
	)
		style = 'grid-template-rows: 1fr';

	if (
		(Array.isArray(header) && header.length > 0 && Array.isArray(title) && title.length > 0) ||
		(Array.isArray(header) && header.length > 0 && Array.isArray(subtitle) && subtitle.length > 0) ||
		(Array.isArray(title) && title.length > 0 && Array.isArray(subtitle) && subtitle.length > 0)
	)
		style = 'grid-template-rows: 2fr';

	if (
		Array.isArray(header) &&
		header.length > 0 &&
		Array.isArray(title) &&
		title.length > 0 &&
		Array.isArray(subtitle) &&
		subtitle.length > 0
	)
		style = 'grid-template-rows: max-content 1fr max-content';

	return style;
}
