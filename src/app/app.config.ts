import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';

// * Animations.
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// * Routing.
import { provideRouter, withViewTransitions } from '@angular/router';

// * Service worker.
import { provideServiceWorker } from '@angular/service-worker';

// * Routes.
import { APP_ROUTES } from '@app/app.routes';

// * NgRx.
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

// * NgRx - Consts.
import { ROOT_EFFECTS } from '@app/app.effects';
import { ROOT_REDUCERS } from '@app/app.reducers';

// * Google Auth.
import { provideOAuthClient } from 'angular-oauth2-oidc';

// * Apollo.
import { GRAPHQL_PROVIDER } from '@app/app.graphql';

export const appConfig: ApplicationConfig = {
	providers: [
		provideAnimationsAsync(),
		provideRouter(APP_ROUTES, withViewTransitions()),
		provideHttpClient(),
		provideOAuthClient(),
		GRAPHQL_PROVIDER,
		provideStore(ROOT_REDUCERS),
		provideEffects(ROOT_EFFECTS),
		provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
		provideServiceWorker('ngsw-worker.js', {
			enabled: !isDevMode(),
			registrationStrategy: 'registerWhenStable:30000'
		})
	]
};
