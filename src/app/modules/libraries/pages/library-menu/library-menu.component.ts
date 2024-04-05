import { ChangeDetectionStrategy, Component, OnInit, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';

// * Forms.
import { AbstractControl, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

// * Components.
import { ButtonComponent } from '@components/button/button.component';
import { LoadingComponent } from '@components/loading/loading.component';

// * Consts.
import { COMPLETE } from '@consts/load.const';

// * Interfaces.
import { IState } from '@interfaces/state.interface';
import { ILibraryConf } from '@libraries/interfaces/libraries.interface';

// * Services.
import { LibrariesService } from '@libraries/services/libraries.service';
import { CoreService } from '@services/core.service';

// * Sorts.
import { ILoading } from '@sorts/loading.sort';

// * Validators.
import { getErrorMessage, notOnlySpaces } from '@validators/character.validators';

// * Actions.
import { LIBRARY_CONF_LOAD } from '@libraries/state/libraries.actions';

// * Selectors.
import { selectLibraryConf } from '@libraries/state/libraries.selectors';

// * Material.
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-library-menu',
	standalone: true,
	imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, ButtonComponent, LoadingComponent],
	templateUrl: './library-menu.component.html',
	styleUrl: './library-menu.component.scss'
})
export class LibraryMenuComponent implements OnInit {
	public readonly core: CoreService = inject(CoreService);
	public readonly libraries: LibrariesService = inject(LibrariesService);

	public readonly getErrorMessage: (control: AbstractControl<unknown, unknown>) => string = getErrorMessage;
	public readonly form: UntypedFormGroup = this._setForm();

	public readonly complete: ILoading = COMPLETE;

	// eslint-disable-next-line @ngrx/use-consistent-global-store-name
	private readonly _store: Store<IState> = inject(Store);

	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly conf: Signal<ILibraryConf> = this._store.selectSignal(selectLibraryConf(this.libraries.id('library')));

	public ngOnInit(): void {
		if (this.conf().default === null) {
			const TITLE: boolean = this.conf().title === '';
			this._store.dispatch(LIBRARY_CONF_LOAD({ library: this.libraries.id('library'), title: TITLE }));
		}
	}

	public back(): void {
		this.libraries.redirect(`${this.libraries.id('library')}`);
	}

	private _setForm(): UntypedFormGroup {
		return new UntypedFormGroup({
			title: new UntypedFormControl(null, [Validators.required, Validators.maxLength(20), notOnlySpaces()])
		});
	}
}
