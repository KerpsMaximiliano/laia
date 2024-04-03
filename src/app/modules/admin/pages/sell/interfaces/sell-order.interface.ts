export interface IOrder {
	user: IUser;
	articles: IArticle[];
	address: IAddress;
	calendar: ICalendar;
	message: string | null;
	payment: IPayment;
	merchant: IMerchant;
}

interface IUser {
	id: number | null;
	image: string | null;
	email: string | null;
	phone: string | null;
	name: string | null;
	surname: string | null;
}

interface IArticle {
	id: number;
	media: string | null;
	title: string | null;
	price: number | null;
	count: {
		quantity: number;
		type: 'PACKAGE' | 'UNIT';
	};
	manufacturing: {
		time: number | null;
		type: 'DAY' | 'HOUR' | 'MINUTE' | 'MONTH';
	};
}

interface IAddress {
	id: number | null;
	code: string | null;
	country: string | null;
	state: string | null;
	city: string | null;
	street: string | null;
	number: string | null;
	ref: string | null;
	note: string | null;
	lat: string | null;
	lng: string | null;
}

interface ICalendar {
	id: number;
	from: string;
	to: string;
	reservation: string;
	type: 'DELIVERY' | 'PICK-UP';
}

interface IMerchant {
	id: number;
	email: string;
	phone: string | null;
	title: string | null;
}

interface IPayment {
	id: number;
}
