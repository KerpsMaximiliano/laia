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
				loadComponent: async () => import('./pages/library-menu/library-menu.component').then((c) => c.LibraryMenuComponent)
			},
			{
				path: 'miniatures',
				loadComponent: async () => import('./pages/miniatures/miniatures.component').then((c) => c.MiniaturesComponent)
			},
			{
				path: 'collection/:id',
				children: [
					{
						path: '',
						loadComponent: async () => import('./pages/collection/collection.component').then((c) => c.CollectionComponent)
					},
					{
						path: 'menu',
						loadComponent: async () => import('./pages/collection-menu/collection-menu.component').then((c) => c.CollectionMenuComponent)
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
