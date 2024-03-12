// * Interfaces.
import { ILoadableEntities, ILoadableEntity } from '@interfaces/load.interface';

export interface ISell {
	articles: ILoadableEntities<ILoadableEntity<IArticle>>;
}

export interface IArticle {
	id: number;
	medias: {
		url: string;
		type: 'IMAGE' | 'VIDEO';
	}[];
	title: string | null;
	price: {
		amount: number | null;
		type: 'USD';
	};
	stock: {
		quantity: number | null;
		type: 'PACKAGE' | 'UNIT';
	};
	investments: number;
	commissions: number;
	hashtag: ILoadableEntity<string | null>;
	segments: ILoadableEntities<ISegment>;
	manufacturing: ILoadableEntity<IManufacturing>;
	keywords: ILoadableEntities<{ id: number; keyword: string }>;
	questions: ILoadableEntities<IQuestion>;
	tags: ILoadableEntities<{ id: number; tag: string }>;
	categories: ILoadableEntities<{ id: number; category: string }>;
}

export interface IInvest {
	id: number | null;
	amount: number;
	title: string | null;
	note: string | null;
}

export interface IManufacturing {
	time: number;
	type: 'DAY' | 'HOUR' | 'MINUTE' | 'MONTH';
}

export interface ISegment {
	id: number;
	title: string | null;
	description: string | null;
	media: string | null;
}

export interface IQuestion {
	question: string | null;
	type: 'CALENDAR' | 'MULTIPLE' | 'TEXT' | 'TIME';
	limit: number;
	required: boolean;
}

// ! AUX.
export interface IArt {
	id: number;
	medias: {
		url: string;
		type: 'IMAGE' | 'VIDEO';
	}[];
	title: string | null;
	price: {
		amount: number | null;
		type: 'USD';
	};
	stock: {
		quantity: number | null;
		type: 'PACKAGE' | 'UNIT';
	};
	investments: number;
	commissions: number;
}
