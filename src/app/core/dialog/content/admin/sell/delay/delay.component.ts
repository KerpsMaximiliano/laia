import { ChangeDetectionStrategy, Component, OnInit, Signal, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

// * Forms.
import { AbstractControl, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Interfaces.
import { IState } from '@interfaces/state.interface';
import { IArticle } from '@sell/interfaces/sell.interface';

// * Functions.
import { id } from '@functions/id.function';

// * Validators.
import { getErrorMessage, isNumeric } from '@validators/character.validators';

// * Selectors.
import { selectAdminSellArticleInfo } from '@sell/state/sell.selectors';

// * Material.
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-dialog-content-delay',
	standalone: true,
	imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, ButtonComponent],
	templateUrl: './delay.component.html',
	styleUrl: './delay.component.scss'
})
export class DelayComponent implements OnInit {
	public readonly form: UntypedFormGroup = this._setForm();
	public readonly getErrorMessage: (control: AbstractControl<unknown, unknown>) => string = getErrorMessage;
	public manufacturing?: Signal<IArticle['manufacturing'] | null>;
	public type: IArticle['manufacturing']['type'] = 'MINUTE';

	// eslint-disable-next-line @ngrx/use-consistent-global-store-name
	private readonly _store: Store<IState> = inject(Store);
	private readonly _route: ActivatedRoute = inject(ActivatedRoute);

	private readonly _id: (id: string | undefined) => number = id;
	private readonly _destroy$: Subject<void> = new Subject<void>();

	public ngOnInit(): void {
		if (this._id(this._route.snapshot.params['id']) === 0) return;

		this.manufacturing = this._store.selectSignal(
			selectAdminSellArticleInfo({ id: this._id(this._route.snapshot.params['id']), prop: 'manufacturing' })
		);

		this.form.get('delay')?.setValue(this.manufacturing()?.time);
		this.type = this.manufacturing()?.type ?? 'MINUTE';
	}

	public change(): void {
		switch (this.type) {
			case 'MINUTE':
				this.type = 'HOUR';
				return;
			case 'HOUR':
				this.type = 'DAY';
				return;
			case 'DAY':
				this.type = 'MONTH';
				return;
			case 'MONTH':
				this.type = 'MINUTE';
				return;
		}
	}

	public transform(value: number | null): string {
		switch (this.type) {
			case 'MINUTE':
				return value && value > 1 ? 'Minutos' : 'Minuto';
			case 'HOUR':
				return value && value > 1 ? 'Horas' : 'Hora';
			case 'DAY':
				return value && value > 1 ? 'Días' : 'Día';
			case 'MONTH':
				return value && value > 1 ? 'Meses' : 'Mes';
		}
	}

	private _setForm(): UntypedFormGroup {
		return new UntypedFormGroup({ delay: new UntypedFormControl(null, isNumeric()) });
	}
}
