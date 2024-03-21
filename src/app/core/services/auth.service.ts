import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// * Env.
import { environment } from '@env/environment';

// * Auth2.
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

@Injectable({ providedIn: 'root' })
export class AuthService {
	private readonly _auth: OAuthService = inject(OAuthService);
	private readonly _client: string = environment.client;
	private readonly _redirect: string = environment.redirect;
	private readonly _isLoggedIn = new BehaviorSubject<boolean>(false);

	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();

	public init(): void {
		const conf: AuthConfig = {
			issuer: 'https://accounts.google.com',
			strictDiscoveryDocumentValidation: false,
			clientId: this._client,
			redirectUri: this._redirect,
			scope: 'openid profile email'
		};
		this._auth.configure(conf);
		this._auth.setupAutomaticSilentRefresh();
		void this._auth.loadDiscoveryDocumentAndTryLogin().then(() => {
			this._isLoggedIn.next(this._auth.hasValidAccessToken());
		});
	}

	public login(): void {
		this._auth.initImplicitFlow();
	}

	public logout(): void {
		this._auth.logOut();
	}

	public status(): boolean {
		return this._auth.hasValidAccessToken();
	}

	public get(): Record<string, unknown> {
		return this._auth.getIdentityClaims();
	}
}
