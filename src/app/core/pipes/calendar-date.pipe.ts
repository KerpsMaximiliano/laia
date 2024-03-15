export function formatDate(selected: Date | null | undefined): string {
	if (!selected) return '';

	const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
	const months = [
		'Enero',
		'Febrero',
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		'Julio',
		'Agosto',
		'Septiembre',
		'Octubre',
		'Noviembre',
		'Diciembre'
	];

	const dayOfWeek = days[selected.getDay()];
	const dayOfMonth = selected.getDate();
	const month = months[selected.getMonth()];

	return `${dayOfWeek}, ${dayOfMonth} ${month}`;
}
