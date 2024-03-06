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
		loadComponent: () => import('./pages/home/home.component').then((c) => c.HomeComponent)
	},
	{
		path: 'article',
		// eslint-disable-next-line @typescript-eslint/promise-function-async
		loadComponent: () => import('./pages/article/article.component').then((c) => c.ArticleComponent)
	},
	{
		path: '**',
		redirectTo: '',
		pathMatch: 'full'
	}
];
