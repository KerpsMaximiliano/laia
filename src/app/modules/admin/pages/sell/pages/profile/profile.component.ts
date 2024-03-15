import { AfterViewInit, ChangeDetectionStrategy, Component, NgZone, OnDestroy, ViewChild, inject } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';

// * CDK.
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';

// * Forms.
import { AbstractControl, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Services.
import { CoreService } from '@services/core.service';

// * Validators.
import { getErrorMessage, isNumeric, notOnlySpaces } from '@validators/character.validators';

// * Material.
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-admin-sellprofile',
	standalone: true,
	imports: [
		TextFieldModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatSlideToggleModule,
		MatSelectModule,
		ButtonComponent
	],
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.scss'
})
export class ProfileComponent implements AfterViewInit, OnDestroy {
	@ViewChild('autosize') public autosize?: CdkTextareaAutosize;

	public readonly core: CoreService = inject(CoreService);
	public readonly getErrorMessage: (control: AbstractControl<unknown, unknown>) => string = getErrorMessage;
	public readonly form: UntypedFormGroup = this._setForm();

	public image: string | undefined = undefined;
	public address: string | undefined = 'Franciscco de Aparicio 2048';

	private readonly _zone: NgZone = inject(NgZone);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private _blob: any;
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
			title: new UntypedFormControl(null, [
				Validators.required,
				Validators.minLength(1),
				Validators.maxLength(30),
				notOnlySpaces()
			]),
			// * Address.
			phone: new UntypedFormControl(null, [
				Validators.required,
				Validators.minLength(5),
				Validators.maxLength(15),
				isNumeric()
			]),
			promotions: new UntypedFormControl(null, [Validators.required]),
			web: new UntypedFormControl(null, [Validators.maxLength(255), notOnlySpaces()]),
			description: new UntypedFormControl(null, [Validators.maxLength(500), notOnlySpaces()])
		});
	}

	private _resize(): void {
		this.form.controls['note'].valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
			this._zone.onStable.pipe(take(1)).subscribe(() => this.autosize?.resizeToFitContent(true));
		});
	}
}
