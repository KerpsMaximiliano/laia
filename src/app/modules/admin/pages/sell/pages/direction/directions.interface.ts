export interface IDirection {
	address: string | null;
	postalCode: string | null;
	country: string | null;
	state: string | null;
	city: string | null;
	street: string | null;
	streetNumber: number | null;
	ref: string | null;
	note: string | null;
}

export const data: IDirection = {
	address: null,
	postalCode: null,
	country: null,
	state: null,
	city: null,
	street: null,
	streetNumber: null,
	ref: null,
	note: null
};
