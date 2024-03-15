import { AfterViewInit, ChangeDetectionStrategy, Component, NgZone, OnDestroy, ViewChild, inject } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';

// * CDK.
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';

// * Forms.
import { AbstractControl, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Validators.
import { getErrorMessage, notOnlySpaces } from '@validators/character.validators';

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
export class InvestComponent implements AfterViewInit, OnDestroy {
	@ViewChild('autosize') public autosize?: CdkTextareaAutosize;

	public readonly getErrorMessage: (control: AbstractControl<unknown, unknown>) => string = getErrorMessage;
	public readonly form: UntypedFormGroup = this._setForm();

	private readonly _zone: NgZone = inject(NgZone);
	private readonly _destroy$: Subject<void> = new Subject<void>();

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
