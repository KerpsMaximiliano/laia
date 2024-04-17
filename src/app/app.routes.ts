import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
	{
		path: 'admin',
		loadChildren: async () => import('./modules/admin/admin.routes').then((r) => r.ADMIN_ROUTES)
	},
	{
		path: 'auth',
		loadChildren: async () => import('./modules/user/user.routes').then((r) => r.USER_ROUTES)
	},
	{
		path: 'libraries',
		loadChildren: async () => import('./modules/common/routes/libraries.routes').then((r) => r.LIBRARIES_ROUTES)
	},
	{
		path: ':slug',
		loadChildren: async () => import('./modules/ecommerce/ecommerce.routes').then((r) => r.ECOMMERCE_ROUTES)
	},
	{
		path: '**',
		redirectTo: '',
		pathMatch: 'full'
	}
];
