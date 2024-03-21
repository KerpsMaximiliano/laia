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

interface IKeyword {
	id: number;
	word: string;
}

export type IKeywordsWatchResponse = IResponse<{ wAdminSellKeyWords: IKeyword[] }>;
export type IArticlesResponse = IResponse<{ products: IArticles[] }>;
