import { Routes } from '@angular/router';

// ! IMPORTANT: Always include this comment before the loadComponent line.
// It serves to disable specific ESLint rules for the next line of code, preventing any ESLint errors that may occur during code execution.
// eslint-disable-next-line @typescript-eslint/promise-function-async
// ! EXAMPLE:
// {
// 	path: 'example',
// 	// eslint-disable-next-line @typescript-eslint/promise-function-async
// 	loadComponent: () => import('./example/example.component').then((m) => m.ExampleComponent)
// },

export const APP_ROUTES: Routes = [
	{
		path: 'admin',
		// eslint-disable-next-line @typescript-eslint/promise-function-async
		loadChildren: () => import('./modules/admin/admin.routes').then((r) => r.ADMIN_ROUTES)
	},
	{
		path: 'auth',
		// eslint-disable-next-line @typescript-eslint/promise-function-async
		loadChildren: () => import('./modules/auth/auth.routes').then((r) => r.AUTH_ROUTES)
	},
	{
		path: ':slug',
		// eslint-disable-next-line @typescript-eslint/promise-function-async
		loadChildren: () => import('./modules/ecommerce/ecommerce.routes').then((r) => r.ECOMMERCE_ROUTES)
	},
	{
		path: '**',
		redirectTo: '',
		pathMatch: 'full'
	}
];
