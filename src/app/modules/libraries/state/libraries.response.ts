// * Interfaces.
import { IResponse } from '@interfaces/response.interface';

// ! Change this.
export type IKeywordsWatchResponse = IResponse<{ wAdminSellKeyWords: string[] }>;

export interface IgAdminSellLibraryResponse {
	collections: {
		id: number;
		title: string;
		miniature: string;
		// ! Puede ser un string o un string[]. Ambas son válidas.
		// miniatureHeaderboard: string; // ! <= MEJORA.
		// miniatureTitle: string; // ! <= MEJORA.
		// miniatureSubtitle: string; // ! <= MEJORA.
		items: {
			id: number | null;
			media: string | null; // ! <= Falta en el servicio.
			phone: string | null;
			surname: string | null;
			name: string | null;
			email: string | null;
		}[];
	}[];
	conf: number;
	title: string;
	type: number;
	// ! MULTIMEDIA.
	// ! ID.
}
