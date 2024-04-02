import { Routes } from '@angular/router';

export const LIBRARIES_ROUTES: Routes = [
	{
		path: '',
		loadComponent: async () => import('./libraries.component').then((c) => c.LibrariesComponent),
		children: [
			{
				path: '',
				loadComponent: async () => import('./pages/library/library.component').then((c) => c.LibraryComponent)
			},
			{
				path: 'menu',
				loadComponent: async () => import('./pages/menu/menu.component').then((c) => c.MenuComponent)
			},
			{
				path: 'filter',
				loadComponent: async () => import('./pages/filter/filter.component').then((c) => c.ReportFilterComponent)
			},
			{
				path: 'miniatures',
				loadComponent: async () => import('./pages/miniatures/miniatures.component').then((c) => c.MiniaturesComponent)
			},
			{
				path: 'collection/:id', // ! <= La ruta de la COLECCIÓN dentro de las BIBLIOTECAS.
				children: [
					// ! <= Vista de la COLECCIÓN.
					// ! <= Vista del MENÚ de la COLECCIÓN.
					{
						path: 'filter',
						loadComponent: async () => import('./pages/filter/filter.component').then((c) => c.ReportFilterComponent)
					},
					{
						path: 'miniatures',
						loadComponent: async () => import('./pages/miniatures/miniatures.component').then((c) => c.MiniaturesComponent)
					},
					{
						path: 'ordering',
						loadComponent: async () => import('./pages/ordering/ordering.component').then((c) => c.OrderingComponent)
					},
					{
						path: '**',
						redirectTo: '',
						pathMatch: 'full'
					}
				]
			},
			{
				path: '**',
				redirectTo: '',
				pathMatch: 'full'
			}
		]
	},
	{
		path: '**',
		redirectTo: '',
		pathMatch: 'full'
	}
];
