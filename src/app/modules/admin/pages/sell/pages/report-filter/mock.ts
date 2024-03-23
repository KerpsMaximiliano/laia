export interface DataResponse {
	statusPayment: { id: string; sales: number; check: number }[];
	sellers: { id: string; sales: number; check: number }[];
	status: { id: string; sales: number; check: number }[];
	batches: { id: string; sales: number; check: number }[];
	coords: { id: string; sales: number; check: number }[];
	catalogs: { id: string; sales: number; check: number }[];
}

export const data: DataResponse = {
	statusPayment: [
		{
			id: 'Pagos confirmados',
			sales: 21,
			check: 0
		},
		{
			id: 'Pagos sin confirmar',
			sales: 41,
			check: 1
		}
	],
	sellers: [
		{
			id: 'emicargnello@gmail.com',
			sales: 1,
			check: 0
		},
		{
			id: 'Sebastian',
			sales: 81,
			check: 0
		},
		{
			id: 'Lorenzo',
			sales: 5555,
			check: 1
		}
	],
	status: [
		{
			id: 'sfasf@gmail.com',
			sales: 2561,
			check: 0
		},
		{
			id: 'fff',
			sales: 52,
			check: 1
		},
		{
			id: 'sss',
			sales: 215,
			check: 1
		}
	],
	batches: [
		{
			id: 'sfasf@gmail.com',
			sales: 2561,
			check: 0
		},
		{
			id: 'fff',
			sales: 52,
			check: 1
		},
		{
			id: 'sda',
			sales: 215,
			check: 1
		}
	],
	coords: [
		{
			id: 'sfasf@gmail.com',
			sales: 2561,
			check: 0
		},
		{
			id: 'fff',
			sales: 52,
			check: 1
		},
		{
			id: 'sda',
			sales: 215,
			check: 1
		}
	],
	catalogs: [
		{
			id: 'sfasf@gmail.com',
			sales: 2561,
			check: 0
		},
		{
			id: 'fff',
			sales: 52,
			check: 1
		},
		{
			id: 'sda',
			sales: 215,
			check: 1
		}
	]
};
