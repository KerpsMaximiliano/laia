export function currency(value: number | undefined): string {
	if (value === 0 || !value) return '$0.00';

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
