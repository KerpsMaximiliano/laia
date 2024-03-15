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

export const SELL_ROUTES: Routes = [
	{
		path: '',
		// eslint-disable-next-line @typescript-eslint/promise-function-async
		loadComponent: () => import('./sell.component').then((c) => c.SellComponent),
		children: [
			{
				path: '',
				// eslint-disable-next-line @typescript-eslint/promise-function-async
				loadComponent: () => import('./pages/home/home.component').then((c) => c.HomeComponent)
			},
			{
				path: 'article',
				// eslint-disable-next-line @typescript-eslint/promise-function-async
				loadComponent: () => import('./pages/article/article.component').then((c) => c.ArticleComponent)
			},
			{
				path: 'incentive',
				// eslint-disable-next-line @typescript-eslint/promise-function-async
				loadComponent: () => import('./pages/incentive/incentive.component').then((c) => c.IncentiveComponent)
			},
			{
				path: 'segment',
				// eslint-disable-next-line @typescript-eslint/promise-function-async
				loadComponent: () => import('./pages/segment/segment.component').then((c) => c.SegmentComponent)
			},
			{
				path: 'entpr-sale',
				// eslint-disable-next-line @typescript-eslint/promise-function-async
				loadComponent: () => import('./pages/entpr-sale/entpr-sale.component').then((c) => c.EntprSaleComponent)
			},
			{
				path: 'delivery-time',
				// eslint-disable-next-line @typescript-eslint/promise-function-async
				loadComponent: () => import('./pages/del-time/del-time.component').then((c) => c.DeliveryTimeComponent)
			},
			{
				path: 'delivery-location',
				// eslint-disable-next-line @typescript-eslint/promise-function-async
				loadComponent: () =>
					import('./pages/del-location/del-location.component').then((c) => c.DeliveryLocationComponent)
			},
			{
				path: 'wire-transfer',
				// eslint-disable-next-line @typescript-eslint/promise-function-async
				loadComponent: () =>
					import('./pages/wire-transfer/wire-transfer.component').then((c) => c.WireTransferComponent)
			},
			{
				path: 'credit-days',
				// eslint-disable-next-line @typescript-eslint/promise-function-async
				loadComponent: () => import('./pages/credit-days/credit-days.component').then((c) => c.CreditDaysComponent)
			},
			{
				path: 'paypal',
				// eslint-disable-next-line @typescript-eslint/promise-function-async
				loadComponent: () => import('./pages/paypal/paypal.component').then((c) => c.PaypalComponent)
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
