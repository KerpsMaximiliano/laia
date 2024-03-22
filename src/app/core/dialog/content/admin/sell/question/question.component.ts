import { AfterViewInit, ChangeDetectionStrategy, Component, NgZone, OnDestroy, OnInit, Signal, ViewChild, inject } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';

// * CDK.
import { COMMA, ENTER } from '@angular/cdk/keycodes';
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
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ILogin } from '../../../../../../modules/user/interfaces/user.interface';
import { selectLogin } from '../../../../../../modules/user/state/user.selectors';
import { INITIAL } from '../../../../../constants/load.const';
import { id } from '../../../../../functions/id.function';
import { IState } from '../../../../../interfaces/state.interface';
import { ILoading } from '../../../../../sorts/loading.sort';

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
		MatChipsModule,
		ButtonComponent
	],
	templateUrl: './question.component.html',
	styleUrl: './question.component.scss'
})
export class QuestionComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('autosize') public autosize?: CdkTextareaAutosize;

	public readonly getErrorMessage: (control: AbstractControl<unknown, unknown>) => string = getErrorMessage;
	public readonly form: UntypedFormGroup = this._setForm();
	public readonly keys: number[] = [ENTER, COMMA];

	public index: number = 1;
	public required: boolean = false;
	public options: string[] = [];

	// eslint-disable-next-line @ngrx/use-consistent-global-store-name
	private readonly _store: Store<IState> = inject(Store);
	private readonly _zone: NgZone = inject(NgZone);
	private readonly _core: CoreService = inject(CoreService);
	private readonly _route: ActivatedRoute = inject(ActivatedRoute);
	private readonly _destroy$: Subject<void> = new Subject<void>();
	private readonly _id: (id: string | undefined) => number = id;
	private readonly _initial: ILoading = INITIAL;
	private readonly _user: Signal<ILogin> = this._store.selectSignal(selectLogin);
	private _height: number = 362;

	public ngOnInit(): void {
		if (this._id(this._route.snapshot.params['id']) === 0) return;

		// this._store
		// 	.select(selectAdminSellArticleInfo({ id: this._id(this._route.snapshot.params['id']), prop: 'questions' }))
		// 	.pipe(
		// 		take(1),
		// 		filter((options) => options !== null && options.status !== this._initial)
		// 	)
		// 	.subscribe((question: IArticle['questions'] | null) => {
		// 		if (question) this.keywords = [...keywords.items];
		// 	});
	}

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
			if (this._height !== 510) {
				this._core.height = 510;
				this._height = 510;
				return;
			}
		}
	}

	public add(event: MatChipInputEvent): void {
		const value: string = (event.value || '').trim();
		if (value) this.options.push(value);
		event.chipInput.clear();
		this.form.get('keywords')?.setValue(null);
	}

	public remove(fruit: string): void {
		const index: number = this.options.indexOf(fruit);
		if (index === -1) return;
		this.options.splice(index, 1);
	}

	public edit(option: string, event: MatChipEditedEvent): void {
		const value = event.value.trim();
		if (!value) {
			this.remove(option);
			return;
		}
		const index = this.options.indexOf(option);
		if (index >= 0) this.options[index] = value;
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
