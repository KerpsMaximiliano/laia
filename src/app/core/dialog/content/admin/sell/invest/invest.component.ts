import { AfterViewInit, ChangeDetectionStrategy, Component, NgZone, OnDestroy, OnInit, Signal, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, take, takeUntil } from 'rxjs';

// * CDK.
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';

// * Forms.
import { AbstractControl, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Functions.
import { id } from '@functions/id.function';

// * Interfaces.
import { IState } from '@interfaces/state.interface';
import { IArticle } from '@sell/interfaces/sell.interface';

// * Validators.
import { getErrorMessage, notOnlySpaces } from '@validators/character.validators';

// * Selectors.
import { selectAdminSellArticleInfo } from '@sell/state/sell.selectors';

// * Material.
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-dialog-content-invest',
	standalone: true,
	imports: [TextFieldModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, ButtonComponent],
	templateUrl: './invest.component.html',
	styleUrl: './invest.component.scss'
})
export class InvestComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('autosize') public autosize?: CdkTextareaAutosize;

	public readonly getErrorMessage: (control: AbstractControl<unknown, unknown>) => string = getErrorMessage;
	public readonly form: UntypedFormGroup = this._setForm();

	public invest?: Signal<IArticle['investments'] | null>;

	// eslint-disable-next-line @ngrx/use-consistent-global-store-name
	private readonly _store: Store<IState> = inject(Store);
	private readonly _route: ActivatedRoute = inject(ActivatedRoute);
	private readonly _zone: NgZone = inject(NgZone);

	private readonly _destroy$: Subject<void> = new Subject<void>();
	private readonly _id: (id: string | undefined) => number = id;

	public ngOnInit(): void {
		if (this._id(this._route.snapshot.params['id']) === 0) return;

		this.invest = this._store.selectSignal(
			selectAdminSellArticleInfo({ id: this._id(this._route.snapshot.params['id']), prop: 'investments' })
		);

		this.form.get('amount')?.setValue(this.invest()?.items[0].amount);
		this.form.get('title')?.setValue(this.invest()?.items[0].title);
		this.form.get('note')?.setValue(this.invest()?.items[0].note);
	}

	public ngAfterViewInit(): void {
		this._resize();
	}

	public ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
	}

	private _setForm(): UntypedFormGroup {
		return new UntypedFormGroup({
			amount: new UntypedFormControl(null, Validators.max(9999999999)),
			title: new UntypedFormControl(null, [Validators.maxLength(60), notOnlySpaces()]),
			note: new UntypedFormControl(null, [Validators.maxLength(500), notOnlySpaces()])
		});
	}

	private _resize(): void {
		this.form.controls['note'].valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
			this._zone.onStable.pipe(take(1)).subscribe(() => this.autosize?.resizeToFitContent(true));
		});
	}
}
