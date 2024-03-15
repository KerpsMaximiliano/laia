import { AfterViewInit, ChangeDetectionStrategy, Component, NgZone, OnDestroy, ViewChild, inject } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';

// * CDK.
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';

// * Forms.
import { AbstractControl, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Services.
import { CoreService } from '@services/core.service';

// * Validators.
import { getErrorMessage, notOnlySpaces } from '@validators/character.validators';

// * Material.
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-dialog-content-question',
	standalone: true,
	imports: [
		TextFieldModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatSlideToggleModule,
		ButtonComponent
	],
	templateUrl: './question.component.html',
	styleUrl: './question.component.scss'
})
export class QuestionComponent implements AfterViewInit, OnDestroy {
	@ViewChild('autosize') public autosize?: CdkTextareaAutosize;

	public readonly getErrorMessage: (control: AbstractControl<unknown, unknown>) => string = getErrorMessage;
	public readonly form: UntypedFormGroup = this._setForm();

	public index: number = 1;
	public required: boolean = false;

	private readonly _zone: NgZone = inject(NgZone);
	private readonly _core: CoreService = inject(CoreService);
	private readonly _destroy$: Subject<void> = new Subject<void>();
	private _height: number = 362;

	public ngAfterViewInit(): void {
		this._resize();
	}

	public resize(change: boolean): void {
		if (change) {
			if (this._height !== 362) {
				this._core.height = 362;
				this._height = 362;
				return;
			}
		} else {
			if (this._height !== 412) {
				this._core.height = 412;
				this._height = 412;
				return;
			}
		}
	}

	public ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
	}

	private _setForm(): UntypedFormGroup {
		return new UntypedFormGroup({
			question: new UntypedFormControl(null, notOnlySpaces())
		});
	}

	private _resize(): void {
		this.form.controls['question'].valueChanges.subscribe(() => {
			this._zone.onStable
				.pipe(take(1))
				.pipe(takeUntil(this._destroy$))
				.subscribe(() => this.autosize?.resizeToFitContent(true));
		});
	}
}
