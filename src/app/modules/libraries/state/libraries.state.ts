// * Consts.
import { LOADING } from '@consts/load.const';

// * Interfaces.
import { ILibraries } from '@libraries/interfaces/libraries.interface';

// * LIBRARIES.
export const LIBRARIES_STATE: ILibraries = {
	buyers: {
		title: 'Compradores', // ! TÍTULO de la LIBRERÍA.
		conf: 0, // ! ¿LIBRERÍA MODIFICADA? 0: No. 1: Si.
		miniature: ' email - name surname - phone ', // ! CONFIGURACIÓN de la VISTA de la LIBRERÍA.
		status: LOADING, // ! ESTADO de CARGA de la LIBRERÍA.
		collections: [
			// ! COLECCIONES de la LIBRERÍA.
			{
				status: LOADING, // ! ESTADO de CARGA de la COLECCIÓN.
				data: {
					id: 1, // ! ID de la COLECCIÓN.
					title: 'Compradores Recientes', // ! TÍTULO de la COLECCIÓN.
					miniature: 'email - name surname - phone', // ! CONFIGURACIÓN de la VISTA de la COLECCIÓN.
					elements: [
						// ! ELEMENTOS de la COLECCIÓN.
						{
							id: 1, // ! ID del ELEMENTO.
							avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50', // ! AVATAR del ELEMENTO.
							name: 'John' // ! NOMBRE del ELEMENTO.
						}
					]
				}
			}
		]
	}
};
