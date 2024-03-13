export function currency(value: number | null | undefined): string {
	if (value === 0 || value === undefined || value === null) return '$0.00';

	if (value > 0) {
		const formattedValue = value.toLocaleString('en-US', {
			minimumFractionDigits: 2,
			useGrouping: true
		});
		return `$${formattedValue}`;
	} else {
		const formattedValue = (-value).toLocaleString('en-US', {
			minimumFractionDigits: 2,
			useGrouping: true
		});
		return `-$${formattedValue}`;
	}
}
