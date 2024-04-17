export interface IBuyer {
	id: number | null;
	media: string | null;
	name: string | null;
	surname: string | null;
	email: string | null;
	phone: string | null;
	date: string | null;
	count: number | null;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	count_article: number | null;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	count_article_total: number | null;
	total: number | null;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	total_max: number | null;
}
