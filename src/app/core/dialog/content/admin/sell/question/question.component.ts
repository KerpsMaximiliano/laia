import { AfterViewInit, ChangeDetectionStrategy, Component, NgZone, ViewChild, inject } from '@angular/core';
import { take } from 'rxjs';

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
export class QuestionComponent implements AfterViewInit {
	@ViewChild('autosize') public autosize?: CdkTextareaAutosize;

	public readonly getErrorMessage: (control: AbstractControl<unknown, unknown>) => string = getErrorMessage;
	public readonly form: UntypedFormGroup = this._setForm();

	public index: number = 1;
	public required: boolean = false;

	private readonly _zone: NgZone = inject(NgZone);
	private readonly _core: CoreService = inject(CoreService);

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

	private _setForm(): UntypedFormGroup {
		return new UntypedFormGroup({
			question: new UntypedFormControl(null, notOnlySpaces())
		});
	}

	private _resize(): void {
		this.form.controls['question'].valueChanges.subscribe(() => {
			this._zone.onStable.pipe(take(1)).subscribe(() => this.autosize?.resizeToFitContent(true));
		});
	}
}
