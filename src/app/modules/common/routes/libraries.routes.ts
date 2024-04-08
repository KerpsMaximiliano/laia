import { Routes } from '@angular/router';

export const LIBRARIES_ROUTES: Routes = [
	{
		path: ':library',
		loadComponent: async () => import('@common/views/libraries.component').then((c) => c.LibrariesComponent),
		children: [
			{
				path: '',
				loadComponent: async () => import('@common/pages/libraries/library/library.component').then((c) => c.LibraryComponent)
			},
			{
				path: 'menu',
				loadComponent: async () => import('@common/pages/libraries/menu/menu.component').then((c) => c.MenuComponent)
			},
			{
				path: 'miniatures',
				loadComponent: async () => import('@common/pages/collections/miniatures/miniatures.component').then((c) => c.MiniaturesComponent)
			},
			{
				path: 'collection',
				loadChildren: async () => import('./collections.routes').then((m) => m.COLLECTIONS_ROUTES)
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
