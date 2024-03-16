import { Routes } from '@angular/router';

export const SELL_ROUTES: Routes = [
	{
		path: '',
		loadComponent: async () => import('./sell.component').then((c) => c.SellComponent),
		children: [
			{
				path: '',
				loadComponent: async () => import('./pages/home/home.component').then((c) => c.HomeComponent)
			},
			{
				path: 'article',
				loadComponent: async () => import('./pages/article/article.component').then((c) => c.ArticleComponent)
			},
			{
				path: 'article/:id',
				loadComponent: async () => import('./pages/article/article.component').then((c) => c.ArticleComponent)
			},
			{
				path: 'articles',
				loadComponent: async () => import('./pages/articles/articles.component').then((c) => c.ArticlesComponent)
			},
			{
				path: 'incentive',
				loadComponent: async () => import('./pages/incentive/incentive.component').then((c) => c.IncentiveComponent)
			},
			{
				path: 'profile',
				loadComponent: async () => import('./pages/profile/profile.component').then((c) => c.ProfileComponent)
			},
			{
				path: 'segment',
				loadComponent: async () => import('./pages/segment/segment.component').then((c) => c.SegmentComponent)
			},
			{
				path: 'entpr-sale',
				loadComponent: async () => import('./pages/entpr-sale/entpr-sale.component').then((c) => c.EntprSaleComponent)
			},
			{
				path: 'delivery-time',
				loadComponent: async () => import('./pages/del-time/del-time.component').then((c) => c.DeliveryTimeComponent)
			},
			{
				path: 'delivery-location',
				loadComponent: async () => import('./pages/del-location/del-location.component').then((c) => c.DeliveryLocationComponent)
			},
			{
				path: 'wire-transfer',
				loadComponent: async () => import('./pages/wire-transfer/wire-transfer.component').then((c) => c.WireTransferComponent)
			},
			{
				path: 'credit-days',
				loadComponent: async () => import('./pages/credit-days/credit-days.component').then((c) => c.CreditDaysComponent)
			},
			{
				path: 'paypal',
				loadComponent: async () => import('./pages/paypal/paypal.component').then((c) => c.PaypalComponent)
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
