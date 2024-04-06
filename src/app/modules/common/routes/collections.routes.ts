import { Routes } from '@angular/router';

export const COLLECTIONS_ROUTES: Routes = [
	{
		path: ':collection',
		loadComponent: async () => import('@common/views/collections.component').then((c) => c.CollectionsComponent),
		children: [
			{
				path: '',
				loadComponent: async () => import('@common/pages/collections/collection/collection.component').then((c) => c.CollectionComponent)
			},
			{
				path: 'menu',
				loadComponent: async () => import('@common/pages/collections/menu/menu.component').then((c) => c.MenuComponent)
			},
			{
				path: 'filter',
				loadComponent: async () => import('@common/pages/collections/filter/filter.component').then((c) => c.ReportFilterComponent)
			},
			{
				path: 'miniatures',
				loadComponent: async () => import('@common/pages/collections/miniatures/miniatures.component').then((c) => c.MiniaturesComponent)
			},
			{
				path: 'ordering',
				loadComponent: async () => import('@common/pages/collections/ordering/ordering.component').then((c) => c.OrderingComponent)
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
