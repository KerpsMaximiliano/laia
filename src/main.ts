import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '@app/app.component';
import { appConfig } from '@app/app.config';

import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/ V1NAaF1cXmhKYVJ+ WmFZfVpgdVdMYFtbRXRPIiBoS35Rck VgWH5fcnRSR2JUVkJ/');

bootstrapApplication(AppComponent, appConfig).catch((err: Error) => {
	console.error('main.ts => boostrapApplication() => ', err);
});
