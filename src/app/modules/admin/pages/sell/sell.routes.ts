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
