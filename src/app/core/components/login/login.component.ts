import { ChangeDetectionStrategy, Component, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';

// * Components.
import { ButtonComponent } from '@components/button/button.component';
import { LoadingComponent } from '@components/loading/loading.component';

// * Consts.
import { COMPLETE, LOADED } from '@consts/load.const';

// * Interfaces.
import { ILoadableEntity } from '@interfaces/load.interface';
import { IState } from '@interfaces/state.interface';
import { IUser } from '@user/interfaces/user.interface';

// * Services.
import { CoreService } from '@services/core.service';

// * Sorts.
import { ILoading } from '@sorts/loading.sort';

// * Selectors.
import { selectUser } from '@user/state/user.selectors';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-component-login',
	standalone: true,
	imports: [ButtonComponent, LoadingComponent],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent {
	public readonly loaded: ILoading = LOADED;
	public readonly complete: ILoading = COMPLETE;

	// eslint-disable-next-line @ngrx/use-consistent-global-store-name
	private readonly _store: Store<IState> = inject(Store);
	private readonly _core: CoreService = inject(CoreService);

	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly user: Signal<ILoadableEntity<IUser>> = this._store.selectSignal(selectUser);

	public login(): void {
		this._core.redirect('auth');
	}

	public profile(): void {
		this._core.redirect('auth/profile');
	}
}
