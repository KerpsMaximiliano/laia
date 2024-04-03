// * Sorts.
import { ILoading } from '@sorts/loading.sort';

export interface IArticle {
	id: number;
	medias: { url: string; type: 'IMAGE' | 'VIDEO' }[] | null;
	title: string | null;
	price: { amount: number | null; type: 'USD' };
	stock: { quantity: number | null; type: 'PACKAGE' | 'UNIT' };
	investments: { status: ILoading; items: IInvest[]; total: number };
	commissions: { status: ILoading; items: ICommission[]; total: number };
	hashtag: string | null;
	manufacturing: { time: number | null; type: 'DAY' | 'HOUR' | 'MINUTE' | 'MONTH' };
	segments: { status: ILoading; items: ISegment[]; count: number };
	keywords: { status: ILoading; items: string[]; count: number };
	questions: { status: ILoading; items: IQuestion[]; count: number };
}

interface IInvest {
	id: number;
	amount: number | null;
	title: string | null;
	note: string | null;
}

interface ICommission {
	id: number;
	amount: number | null;
	type: 'AMOUNT' | 'PERCENT';
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
	required: number;
	options: string[];
}

// ! AUX.
export interface IArt {
	id: number;
	title: string | null;
	media: { url: string; type: 'IMAGE' | 'VIDEO' } | null;
	price: { amount: number | null; type: 'USD' };
	stock: { quantity: number | null; type: 'PACKAGE' | 'UNIT' };
}
