// * Interfaces.
import { IResponse } from '@interfaces/response.interface';

interface IArticles {
	id: number;
	title: string | null;
	price: number | null;
	stock: number | null;
	frontPage: string | null;
	typeOfSale: 'PACKAGE' | 'UNIT';
	typeOfPrice: 'USD';
}

export type IKeywordsWatchResponse = IResponse<{ wAdminSellKeyWords: string[] }>;
export type IArticlesResponse = IResponse<{ products: IArticles[] }>;

// * Interface type response.
export interface ICreateArticle {
	productId: number;
	medias: { url: string; type: 'IMAGE' }[];
	segmentMedia: { url: string; type: 'IMAGE' } | null;
}
