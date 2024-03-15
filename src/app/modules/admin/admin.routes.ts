import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
	{
		path: 'buy',
		loadChildren: async () => import('./pages/buy/buy.routes').then((r) => r.BUY_ROUTES)
	},
	{
		path: 'sell',
		loadChildren: async () => import('./pages/sell/sell.routes').then((r) => r.SELL_ROUTES)
	},
	{
		path: 'negotiation',
		loadChildren: async () => import('./pages/negotiation/negotiation.routes').then((r) => r.NEGOTIATION_ROUTES)
	},
	{
		path: '**',
		redirectTo: '',
		pathMatch: 'full'
	}
];
