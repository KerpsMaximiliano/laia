import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	NgZone,
	OnDestroy,
	ViewChild,
	ViewEncapsulation,
	inject
} from '@angular/core';
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
import { getErrorMessage, notOnlySpaces } from '@validators/character.validators';

// * Material.
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ImageEditorCommand, ImageEditorComponent, ImageEditorModule } from '@syncfusion/ej2-angular-image-editor';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-admin-sell-segment',
	standalone: true,
	imports: [ImageEditorModule, TextFieldModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, ButtonComponent],
	templateUrl: './segment.component.html',
	styleUrl: './segment.component.scss',
	// eslint-disable-next-line @angular-eslint/use-component-view-encapsulation
	encapsulation: ViewEncapsulation.None
})
export class SegmentComponent implements AfterViewInit, OnDestroy {
	@ViewChild('fileInput') public input?: ElementRef<HTMLInputElement>;
	@ViewChild('autosize') public autosize?: CdkTextareaAutosize;

	@ViewChild('imageEditor') public imageEditorObj?: ImageEditorComponent;

	// Crop ,
	// Transform ,
	// Annotate ,
	// ZoomIn ,
	// ZoomOut ,
	// Open ,
	// Reset ,
	// Save ,
	// Pan ,
	// Move ,
	// Pen ,
	// Line ,
	// Arrow ,
	// Path ,
	// Rectangle ,
	// Image ,
	// Ellipse ,
	// Text ,
	// CustomSelection ,
	// CircleSelection ,
	// SquareSelection ,
	// RatioSelection ,
	// RotateLeft ,
	// RotateRight ,
	// FlipHorizontal ,
	// FlipVertical ,
	// Undo ,
	// Redo ,
	// None ,
	// Mat ,
	// Bevel ,
	// Inset ,
	// Hook ,
	// Finetune ,
	// Filter ,
	// Frame ,
	// Resize ,
	// HorizontalFlip ,
	// VerticalFlip ,
	// Brightness ,
	// Contrast ,
	// Hue ,
	// Saturation ,
	// Opacity ,
	// Blur ,
	// Exposure ,
	// Default ,
	// Chrome ,
	// Cold ,
	// Warm ,
	// Grayscale ,
	// Sepia ,
	// Invert ,
	// Straightening ,
	public toolbar: ImageEditorCommand[] = [
		ImageEditorCommand.Crop,
		ImageEditorCommand.Transform,
		ImageEditorCommand.Annotate,
		ImageEditorCommand.ZoomIn,
		ImageEditorCommand.ZoomOut,
		ImageEditorCommand.Open,
		ImageEditorCommand.Reset,
		ImageEditorCommand.Save,
		ImageEditorCommand.Pan,
		ImageEditorCommand.Move,
		ImageEditorCommand.Pen,
		ImageEditorCommand.Line,
		ImageEditorCommand.Arrow,
		ImageEditorCommand.Path,
		ImageEditorCommand.Rectangle,
		ImageEditorCommand.Image,
		ImageEditorCommand.Ellipse,
		ImageEditorCommand.Text,
		// ImageEditorCommand.CustomSelection,
		// ImageEditorCommand.CircleSelection,
		ImageEditorCommand.SquareSelection,
		ImageEditorCommand.RatioSelection,
		ImageEditorCommand.RotateLeft,
		ImageEditorCommand.RotateRight,
		ImageEditorCommand.FlipHorizontal,
		ImageEditorCommand.FlipVertical,
		ImageEditorCommand.Undo,
		ImageEditorCommand.Redo,
		ImageEditorCommand.None,
		ImageEditorCommand.Mat,
		ImageEditorCommand.Bevel,
		ImageEditorCommand.Inset,
		ImageEditorCommand.Hook,
		ImageEditorCommand.Finetune,
		ImageEditorCommand.Filter,
		ImageEditorCommand.Frame,
		// ImageEditorCommand.Resize,
		ImageEditorCommand.HorizontalFlip,
		ImageEditorCommand.VerticalFlip,
		ImageEditorCommand.Brightness,
		ImageEditorCommand.Contrast,
		ImageEditorCommand.Hue,
		ImageEditorCommand.Saturation,
		ImageEditorCommand.Opacity,
		ImageEditorCommand.Blur,
		ImageEditorCommand.Exposure,
		ImageEditorCommand.Default,
		ImageEditorCommand.Chrome,
		ImageEditorCommand.Cold,
		ImageEditorCommand.Warm,
		ImageEditorCommand.Grayscale,
		ImageEditorCommand.Sepia,
		ImageEditorCommand.Invert,
		ImageEditorCommand.Straightening
	];

	public readonly getErrorMessage: (control: AbstractControl<unknown, unknown>) => string = getErrorMessage;
	public readonly form: UntypedFormGroup = this._setForm();
	public image: string | undefined = undefined;

	public request: boolean = false;

	private readonly _core: CoreService = inject(CoreService);
	private readonly _zone: NgZone = inject(NgZone);
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	private _blob: any;
	private readonly _destroy$: Subject<void> = new Subject<void>();

	public ngAfterViewInit(): void {
		this._resize();
		// this.imageEditorObj?.select('16:9');
	}

	public onClickInput(): void {
		if (this.request) return;
		this.input?.nativeElement.click();
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	public onFileSelected(event: any): void {
		console.log(event);

		// if (this.request) return;
		// const input = event.target;
		// if (input.files && input.files.length > 0) {
		// 	const file: File = input.files[0];
		// 	if (file.type.match('image.*')) {
		// 		this.image = URL.createObjectURL(file);
		// 		this._blob = file;
		// 	} else {
		// 		alert('Por favor selecciona una imagen.');
		// 	}
		// }
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
	public onSelectionChange(args: any): void {
		if (args.width !== args.height) {
			this.imageEditorObj?.select('16:9');
			this.imageEditorObj?.crop();
			// this.imageEditorObj?.resizing.aspectRation = 16 / 9;
			// this.imageEditorObj?.select
		}
	}

	public reset(): void {
		if (this.request) return;
		this.image = undefined;
		this._blob = undefined;
		if (this.input) this.input.nativeElement.value = '';
	}

	public back(): void {
		this._core.back();
	}

	public ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
	}

	private _setForm(): UntypedFormGroup {
		return new UntypedFormGroup({
			title: new UntypedFormControl(null, [Validators.maxLength(120), notOnlySpaces()]),
			description: new UntypedFormControl(null, [Validators.maxLength(500), notOnlySpaces()])
		});
	}

	private _resize(): void {
		this.form.controls['description'].valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
			this._zone.onStable.pipe(take(1)).subscribe(() => this.autosize?.resizeToFitContent(true));
		});
	}
}
