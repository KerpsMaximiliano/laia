/**
 * Retorna un valor numerico.
 * -1: No existe el parametro ID.
 * 0: No existe el ID.
 * x: Existe el parametro ID y es valido.
 * @private
 * @returns Number;
 */
export function id(id: string | undefined): number {
	if (!id) return -1; // No existe el parametro ID.
	if (isNaN(Number(id))) return 0; // No es un valor numerico.
	return Number(id); // Es un valor numerico.
}
