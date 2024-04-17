import { Routes } from '@angular/router';

export const COLLECTIONS_ROUTES: Routes = [
	{
		path: ':collection',
		loadComponent: async () => import('@common/views/collections.component').then((c) => c.CollectionsComponent),
		children: [
			{
				path: 'home',
				loadComponent: async () => import('@common/pages/collections/collection/collection.component').then((c) => c.CollectionComponent)
			},
			{
				path: 'menu',
				loadComponent: async () =>
					import('@common/pages/collections/collection-menu/collection-menu.component').then((c) => c.CollectionMenuComponent)
			},
			{
				path: 'filter',
				loadComponent: async () => import('@common/pages/collections/filter/filter.component').then((c) => c.ReportFilterComponent)
			},
			{
				path: 'miniatures',
				loadComponent: async () =>
					import('@common/pages/collections/collection-miniatures/collection-miniatures.component').then(
						(c) => c.CollectionMiniaturesComponent
					)
			},
			{
				path: 'ordering',
				loadComponent: async () =>
					import('@common/pages/collections/collection-ordering/collection-ordering.component').then((c) => c.OrderingComponent)
			},
			{
				path: 'not-found',
				loadComponent: async () =>
					import('@common/pages/collections/collection-not-found/collection-not-found.component').then((c) => c.CollectionNotFoundComponent)
			},
			{
				path: '**',
				pathMatch: 'full',
				redirectTo: 'home'
			}
		]
	}
];
