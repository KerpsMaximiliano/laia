import { Routes } from '@angular/router';

export const ECOMMERCE_ROUTES: Routes = [
	{
		path: '**',
		redirectTo: '',
		pathMatch: 'full'
	}
];
