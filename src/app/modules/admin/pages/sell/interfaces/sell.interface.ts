// * Interfaces.
import { ILoadableEntities, ILoadableEntity } from '@interfaces/load.interface';

// * Sorts.
import { ILoading } from '@sorts/loading.sort';

export interface ISell {
	articles: ILoadableEntities<ILoadableEntity<IArticle>>;
}

export interface IArticle {
	id: number;
	medias: { url: string; type: 'IMAGE' | 'VIDEO' }[] | null;
	title: string | null;
	price: { amount: number | null; type: 'USD' };
	stock: { quantity: number | null; type: 'PACKAGE' | 'UNIT' };
	investments: number;
	commissions: number;
	hashtag: string | null;
	manufacturing: { time: number | null; type: 'DAY' | 'HOUR' | 'MINUTE' | 'MONTH' };
	segments: { status: ILoading; items: ISegment[]; count: number };
	keywords: { status: ILoading; items: { id: number; keyword: string }[]; count: number };
	questions: { status: ILoading; items: IQuestion[]; count: number };
	categories: { status: ILoading; items: { id: number; category: string }[]; count: number };
}

interface ISegment {
	id: number;
	title: string | null;
	description: string | null;
	media: string | null;
}

interface IQuestion {
	id: number;
	question: string | null;
	type: 'CALENDAR' | 'MULTIPLE' | 'TEXT' | 'TIME';
	limit: number;
	required: boolean;
}

// ! AUX.
export interface IArt {
	id: number;
	title: string | null;
	media: { url: string; type: 'IMAGE' | 'VIDEO' } | null;
	price: { amount: number | null; type: 'USD' };
	stock: { quantity: number | null; type: 'PACKAGE' | 'UNIT' };
}
