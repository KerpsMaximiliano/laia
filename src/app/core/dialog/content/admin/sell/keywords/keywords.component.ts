import { AfterViewInit, ChangeDetectionStrategy, Component, NgZone, ViewChild, inject } from '@angular/core';
import { take } from 'rxjs';

// * CDK.
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';

// * Forms.
import { AbstractControl, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Validators.
import { getErrorMessage, notOnlySpaces } from '@validators/character.validators';

// * Material.
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-dialog-content-keywords',
	standalone: true,
	imports: [TextFieldModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, ButtonComponent],
	templateUrl: './keywords.component.html',
	styleUrl: './keywords.component.scss'
})
export class KeywordsComponent implements AfterViewInit {
	@ViewChild('autosize') public autosize?: CdkTextareaAutosize;

	public readonly getErrorMessage: (control: AbstractControl<unknown, unknown>) => string = getErrorMessage;
	public readonly form: UntypedFormGroup = this._setForm();

	private readonly _zone: NgZone = inject(NgZone);

	public ngAfterViewInit(): void {
		this._resize();
	}

	private _setForm(): UntypedFormGroup {
		return new UntypedFormGroup({
			keywords: new UntypedFormControl(null, notOnlySpaces())
		});
	}

	private _resize(): void {
		this.form.controls['keywords'].valueChanges.subscribe(() => {
			this._zone.onStable.pipe(take(1)).subscribe(() => this.autosize?.resizeToFitContent(true));
		});
	}
}
