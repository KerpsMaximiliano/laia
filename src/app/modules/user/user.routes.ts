import { Routes } from '@angular/router';

export const USER_ROUTES: Routes = [
	{
		path: '',
		loadComponent: async () => import('./user.component').then((c) => c.UserComponent),
		children: [
			{
				path: 'login',
				loadComponent: async () => import('./pages/login/login.component').then((c) => c.LoginComponent)
			},
			{
				path: 'first',
				loadComponent: async () => import('./pages/first/first.component').then((c) => c.FirstComponent)
			},
			{
				path: 'redirect',
				loadComponent: async () => import('./pages/redirect/redirect.component').then((c) => c.RedirectComponent)
			},
			{
				path: '**',
				redirectTo: 'login',
				pathMatch: 'full'
			}
		]
	},
	{
		path: '**',
		redirectTo: 'login',
		pathMatch: 'full'
	}
];
