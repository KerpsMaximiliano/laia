import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';

// * App config.
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
	providers: [provideServerRendering()]
};

export const config: ApplicationConfig = mergeApplicationConfig(appConfig, serverConfig);
