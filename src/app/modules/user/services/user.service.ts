import { Injectable, inject } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

// * View.
import { UserComponent } from '@user/user.component';

@Injectable({ providedIn: UserComponent })
export class UserService {
	private readonly _auth: OAuthService = inject(OAuthService);

	public init(): void {
		const conf: AuthConfig = {
			issuer: 'https://accounts.google.com',
			strictDiscoveryDocumentValidation: false,
			clientId: '70333651002-suraqvkrj18f9hiqh446ufiutrfb3ofs.apps.googleusercontent.com',
			redirectUri: window.location.origin,
			// redirectUri: 'http://localhost:4200/admin/sell/article',
			scope: 'openid profile email'
		};

		this._auth.configure(conf);
		this._auth.setupAutomaticSilentRefresh();
		void this._auth.loadDiscoveryDocumentAndTryLogin();
	}

	public login(): void {
		this._auth.initImplicitFlow();
	}

	public logout(): void {
		this._auth.logOut();
	}

	public estaLogeado(): boolean {
		return this._auth.hasValidAccessToken();
	}

	public get(): Record<string, unknown> {
		return this._auth.getIdentityClaims();
	}
}
