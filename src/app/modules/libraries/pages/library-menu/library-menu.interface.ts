export interface IConfig {
	name: string;
	items: IItems[];
	footer: IFooter;
}

interface IAction {
	type: 'ORDER' | 'REDIRECT' | null;
	value: string | null;
}

interface IFooter {
	text: string;
	action: IAction;
}

interface IItems {
	headerboard: string | null;
	title: string | null;
	subtitle: string | null;
	icon: 'add' | 'edit' | 'filter_alt' | 'unfold_more';
	action: IAction;
}

export const data: IConfig = {
	name: 'Compradores',
	items: [
		{
			headerboard: null,
			title: null,
			subtitle: 'ID',
			icon: 'edit',
			action: {
				type: null,
				value: null
			}
		},
		{
			headerboard: null,
			title: null,
			subtitle: 'Nuevo Comprador',
			icon: 'add',
			action: {
				type: null,
				value: null
			}
		},
		{
			headerboard: null,
			title: null,
			subtitle: 'Enlace directo de acceso rápido',
			//! COLOCAR ICONO CORRECTO
			icon: 'edit',
			action: {
				type: 'REDIRECT',
				value: null
			}
		},
		{
			headerboard: null,
			title: null,
			subtitle: 'Descargar PDF',
			//! COLOCAR ICONO CORRECTO
			icon: 'edit',
			action: {
				type: null,
				value: null
			}
		},
		{
			headerboard: 'Filtro',
			title: 'Compradores Recientes',
			subtitle: null,
			icon: 'filter_alt',
			action: {
				type: null,
				value: null
			}
		},
		{
			headerboard: 'Ordenamiento',
			title: null,
			subtitle: null,
			icon: 'unfold_more',
			action: {
				type: 'ORDER',
				value: 'desc'
			}
		},
		{
			headerboard: 'Vista de Miniatura',
			title: 'Clásica',
			subtitle: null,
			icon: 'edit',
			action: {
				type: null,
				value: null
			}
		}
	],
	footer: {
		text: 'Déjanos saber si necesitas algo',
		action: {
			type: 'REDIRECT', // Accion que se realiza al clickear el footer
			value: '' // Valor al cual se redirecciona, o se realiza otra accion
		}
	}
};
