export function dateTransform(value: Date): string {
	const day = value.getDate();
	const month = value.getMonth() + 1;
	const year = value.getFullYear();

	const formattedDay = day < 10 ? `0${day}` : `${day}`;
	const formattedMonth = month < 10 ? `0${month}` : `${month}`;

	return `${formattedDay}/${formattedMonth}/${year}`;
}
