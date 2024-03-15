/**
 * Retorna un valor numerico.
 * 0: No existe el parametro ID o no es valido.
 * x: Existe el parametro ID y es valido.
 * @private
 * @returns Number;
 */
export function id(id: string | undefined): number {
	if (id) {
		if (isNaN(Number(id))) return 0;
		return Number(id);
	} else {
		return 0;
	}
}
