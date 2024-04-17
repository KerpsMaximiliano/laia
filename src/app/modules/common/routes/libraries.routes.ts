import { Routes } from '@angular/router';

export const LIBRARIES_ROUTES: Routes = [
	{
		path: ':tLibrary/:library',
		loadComponent: async () => import('@common/views/libraries.component').then((c) => c.LibrariesComponent),
		children: [
			{
				path: 'home',
				loadComponent: async () => import('@common/pages/libraries/library/library.component').then((c) => c.LibraryComponent)
			},
			{
				path: 'menu',
				loadComponent: async () => import('@common/pages/libraries/menu/library-menu.component').then((c) => c.LibraryMenuComponent)
			},
			{
				path: 'miniatures',
				loadComponent: async () =>
					import('@common/pages/libraries/library-miniatures/library-miniatures.component').then((c) => c.LibraryMiniaturesComponent)
			},
			{
				path: 'collection',
				loadChildren: async () => import('./collections.routes').then((m) => m.COLLECTIONS_ROUTES)
			},
			{
				path: '**',
				pathMatch: 'full',
				redirectTo: 'home'
			}
		]
	}
];
