import { ApplicationRef } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

// eslint-disable-next-line @typescript-eslint/promise-function-async, @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
const bootstrap: () => Promise<ApplicationRef> = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
