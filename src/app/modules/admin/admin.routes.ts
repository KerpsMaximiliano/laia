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

export const ADMIN_ROUTES: Routes = [
	{
		path: 'buy',
		// eslint-disable-next-line @typescript-eslint/promise-function-async
		loadChildren: () => import('./buy/buy.routes').then((r) => r.BUY_ROUTES)
	},
	{
		path: 'sell',
		// eslint-disable-next-line @typescript-eslint/promise-function-async
		loadChildren: () => import('./sell/sell.routes').then((r) => r.SELL_ROUTES)
	},
	{
		path: 'negotation',
		// eslint-disable-next-line @typescript-eslint/promise-function-async
		loadChildren: () => import('./negotation/negotation.routes').then((r) => r.NEGOTATION_ROUTES)
	},
	{
		path: '**',
		redirectTo: '',
		pathMatch: 'full'
	}
];
