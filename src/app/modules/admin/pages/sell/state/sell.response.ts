// * Interfaces.
import { IResponse } from '@interfaces/response.interface';

interface IArticles {
	id: number;
	title: string | null;
	price: number | null;
	stock: number;
	frontPage: string | null;
	typeOfSale: 'PACKAGE' | 'UNIT';
	typeOfPrice: 'USD';
}

export type IArticlesResponse = IResponse<{ products: IArticles[] }>;
