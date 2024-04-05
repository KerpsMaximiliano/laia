// * Interfaces.
import { IResponse } from '@interfaces/response.interface';

// ! Change this.
export type IKeywordsWatchResponse = IResponse<{ wAdminSellKeyWords: string[] }>;

export interface IgAdminSellLibraryResponse {
	id: number;
	collections: {
		id: number;
		title: string;
		miniatureHeader: string[];
		miniatureTitle: string[];
		miniatureSubtitle: string[];
		items: {
			id: number | null;
			media: string | null;
			phone: string | null;
			surname: string | null;
			name: string | null;
			email: string | null;
		}[];
		count: number;
	}[];
	multimedia: number;
	title: string;
	type: number;
	count: number;
}
