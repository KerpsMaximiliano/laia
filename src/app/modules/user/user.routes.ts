import { Routes } from '@angular/router';

export const USER_ROUTES: Routes = [
	{
		path: 'login',
		loadComponent: async () => import('./pages/login/login.component').then((c) => c.LoginComponent)
	},
	{
		path: 'first',
		loadComponent: async () => import('./pages/first/first.component').then((c) => c.FirstComponent)
	},
	{
		path: '**',
		redirectTo: 'login',
		pathMatch: 'full'
	}
];
