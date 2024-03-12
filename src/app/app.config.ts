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
import { ROOT_REDUCERS } from '@app/app.reducers';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
	providers: [
		provideAnimationsAsync(),
		provideRouter(APP_ROUTES, withViewTransitions()),
		provideServiceWorker('ngsw-worker.js', {
			enabled: !isDevMode(),
			registrationStrategy: 'registerWhenStable:30000'
		}),
		provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
		provideStore(ROOT_REDUCERS)
	]
};
