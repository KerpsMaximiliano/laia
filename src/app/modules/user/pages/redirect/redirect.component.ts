import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, filter, takeUntil } from 'rxjs';

// * Components.
import { LoadingComponent } from '@components/loading/loading.component';

// * Interfaces.
import { IState } from '@interfaces/state.interface';

// * Services.
import { AuthService } from '@services/auth.service';
import { CoreService } from '@services/core.service';

// * Actions.
import { SQQ_CHECK } from '@user/state/user.actions';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-auth-redirect',
	standalone: true,
	imports: [LoadingComponent],
	templateUrl: './redirect.component.html',
	styleUrl: './redirect.component.scss'
})
export class RedirectComponent implements OnInit, OnDestroy {
	// eslint-disable-next-line @ngrx/use-consistent-global-store-name
	private readonly _store: Store<IState> = inject(Store);
	private readonly _auth: AuthService = inject(AuthService);
	private readonly _core: CoreService = inject(CoreService);
	private readonly _destroy$: Subject<void> = new Subject<void>();

	public ngOnInit(): void {
		if (this._core.gLocal('user')) {
			this._core.back();
			return;
		}

		this._auth.init();

		this._auth.isLoggedIn$
			.pipe(
				takeUntil(this._destroy$),
				filter((status) => status)
			)
			.subscribe((status) => {
				if (status) {
					if (this._auth.status() && this._auth.get()['email']) {
						this._store.dispatch(SQQ_CHECK({ email: String(this._auth.get()['email']), google: true }));
						return;
					}

					if (this._auth.status()) {
						this._core.origin();
					}
				}
			});
	}

	public ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
