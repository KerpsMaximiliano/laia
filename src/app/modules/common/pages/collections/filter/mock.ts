interface IData {
	name: string;
	items: IItem[];
	config: IConfig;
}

interface IItem {
	id: string;
	sales: number;
	check: number;
}

interface IConfig {
	openState: number;
	multiple: number;
}

export const data: IData[] = [
	{
		name: 'Estado del pago',
		items: [
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
		config: {
			openState: 0,
			multiple: 0
		}
	},
	{
		name: 'Vendedores',
		items: [
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
		config: {
			openState: 0,
			multiple: 1
		}
	},
	{
		name: 'Status',
		items: [
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
		config: {
			openState: 0,
			multiple: 1
		}
	},
	{
		name: 'Batches',
		items: [
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
		config: {
			openState: 0,
			multiple: 0
		}
	},
	{
		name: 'Coordenadas',
		items: [
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
		config: {
			openState: 0,
			multiple: 0
		}
	},
	{
		name: 'Catalogos',
		items: [
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
		config: {
			openState: 0,
			multiple: 0
		}
	}
];
