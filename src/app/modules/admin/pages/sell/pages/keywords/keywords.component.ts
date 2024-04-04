import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	OnDestroy,
	OnInit,
	Signal,
	ViewChild,
	inject
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, debounceTime, filter, take, takeUntil } from 'rxjs';

// * CDK.
import { COMMA, ENTER } from '@angular/cdk/keycodes';

// * Forms.
import { FormsModule, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

// * Components.
import { ButtonComponent } from '@components/button/button.component';
import { LoadingComponent } from '@components/loading/loading.component';

// * Consts.
import { INITIAL } from '@consts/load.const';

// * Functions.
import { id } from '@functions/id.function';

// * Interfaces.
import { IState } from '@interfaces/state.interface';
import { IArticle } from '@sell/interfaces/sell-article.interface';
import { ILogin } from '@user/interfaces/user.interface';

// * Services.
import { CoreService } from '@services/core.service';

// * Sorts.
import { ILoading } from '@sorts/loading.sort';

// * Selectors.
import { selectAdminSellArticleInfo } from '@sell/state/sell.selectors';
import { selectLogin } from '@user/state/user.selectors';

// * GraphQl.
import { WATCH_ADMIN_SELL_ARTICLE_KEYWORDS } from '@sell/state/sell.graphql';

// * Response.
import { IKeywordsWatchResponse } from '@sell/state/sell.response';

// * Material.
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-admin-sell-keywords',
	standalone: true,
	imports: [FormsModule, MatFormFieldModule, MatChipsModule, MatAutocompleteModule, ReactiveFormsModule, ButtonComponent, LoadingComponent],
	templateUrl: './keywords.component.html',
	styleUrl: './keywords.component.scss'
})
export class KeywordsComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('input') public readonly input?: ElementRef<HTMLInputElement>;

	public readonly form: UntypedFormGroup = this._setForm();
	public readonly keys: number[] = [ENTER, COMMA];
	public readonly core: CoreService = inject(CoreService);

	public keywords: string[] = [];
	public loading: boolean = false;
	public suggestions: string[] = [];

	// eslint-disable-next-line @ngrx/use-consistent-global-store-name
	private readonly _store: Store<IState> = inject(Store);
	private readonly _route: ActivatedRoute = inject(ActivatedRoute);
	private readonly _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
	private readonly _destroy$: Subject<void> = new Subject<void>();
	private readonly _id: (id: string | undefined) => number = id;
	private readonly _initial: ILoading = INITIAL;
	private readonly _user: Signal<ILogin> = this._store.selectSignal(selectLogin);

	private _value: string | undefined;

	public ngOnInit(): void {
		if (this._id(this._route.snapshot.params['id']) === 0) return;

		if (this._id(this._route.snapshot.params['id']) > 0) {
			// * LOAD KEYWORDS.

			this.form
				.get('keywords')
				?.valueChanges.pipe(
					takeUntil(this._destroy$),
					debounceTime(300),
					filter((value) => value !== null && value !== undefined && value !== this._value)
				)
				.subscribe((value: string) => {
					this._value = value;
					this.loading = true;
					this._cdr.markForCheck();
					this.core
						.query<IKeywordsWatchResponse['data']>(WATCH_ADMIN_SELL_ARTICLE_KEYWORDS, { user: 15, keyword: value })
						.pipe(takeUntil(this._destroy$))
						.subscribe({
							next: (res) => {
								this.suggestions = res.wAdminSellKeyWords.map((keyword: string) => keyword);
								this.loading = false;
								this._cdr.markForCheck();
							},
							error: () => {
								this.loading = false;
								this._cdr.markForCheck();
							},
							complete: () => {
								this.loading = false;
								this._cdr.markForCheck();
							}
						});
				});
		}

		this._store
			.select(selectAdminSellArticleInfo({ id: this._id(this._route.snapshot.params['id']), prop: 'keywords' }))
			.pipe(
				take(1),
				filter((keywords) => keywords !== null && keywords.status !== this._initial)
			)
			.subscribe((keywords: IArticle['keywords'] | null) => {
				if (keywords) this.keywords = [...keywords.items];
			});
	}

	public ngAfterViewInit(): void {
		if (this.input) this.input.nativeElement.focus();
	}

	public add(event: MatChipInputEvent): void {
		const value: string = (event.value || '').trim();
		if (value) this.keywords.push(value);
		event.chipInput.clear();
		this.form.get('keywords')?.setValue(null);
	}

	public remove(fruit: string): void {
		const index: number = this.keywords.indexOf(fruit);
		if (index === -1) return;
		this.keywords.splice(index, 1);
	}

	public selected(event: MatAutocompleteSelectedEvent): void {
		if (this.input) {
			this.keywords.push(event.option.viewValue);
			this.input.nativeElement.value = '';
			this.form.get('keywords')?.setValue(null);
			this._cdr.markForCheck();
		}
	}

	public ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
	}

	private _setForm(): UntypedFormGroup {
		return new UntypedFormGroup({
			keywords: new UntypedFormControl(null)
		});
	}
}
