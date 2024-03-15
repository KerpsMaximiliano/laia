import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

// * Forms.
import { AbstractControl, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

// * Components.
import { ButtonComponent } from '@components/button/button.component';
import { LoadingComponent } from '@components/loading/loading.component';

// * Consts.

// * Functions.
import { id } from '@functions/id.function';

// * Interfaces.
import { IState } from '@interfaces/state.interface';

// * Sorts.

// * Validators.
import { getErrorMessage, isAlpha } from '@validators/character.validators';

// * Material.
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-dialog-content-hashtag',
	standalone: true,
	imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, ButtonComponent, LoadingComponent],
	templateUrl: './hashtag.component.html',
	styleUrl: './hashtag.component.scss'
})
export class HashtagComponent implements OnInit, OnDestroy {
	public readonly getErrorMessage: (control: AbstractControl<unknown, unknown>) => string = getErrorMessage;
	public readonly form: UntypedFormGroup = this._setForm();
	public err: boolean = false;

	// eslint-disable-next-line @ngrx/use-consistent-global-store-name
	private readonly _store: Store<IState> = inject(Store);
	private readonly _route: ActivatedRoute = inject(ActivatedRoute);

	private readonly _id: (id: string | undefined) => number = id;
	private readonly _destroy$: Subject<void> = new Subject<void>();

	// eslint-disable-next-line @typescript-eslint/member-ordering
	// public readonly hashtag: Signal<ILoadableEntity<string | null>> = this._store.selectSignal(
	// 	selectAdminSellArticleHashtag(this._id(this._route.snapshot.params['id']))
	// );

	public ngOnInit(): void {
		console.log('hola');

		// if (this.hashtag().status === LOADING) {
		// 	this._store.dispatch(ADMIN_SELL_ARTICLE_HASHTAG_LOAD({ id: this._id(this._route.snapshot.params['id']) }));
		// }

		// this._store
		// 	.select(selectAdminSellArticleHashtag(this._id(this._route.snapshot.params['id'])))
		// 	.pipe(takeUntil(this._destroy$))
		// 	.subscribe((hashtag: { status: ILoading; data: string | null }) => {
		// 		if (hashtag.status === FAILED) return;
		// 		this.form.get('hashtag')?.setValue(hashtag.data);
		// 	});
	}

	public ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
		// const id: number = this._id(this._route.snapshot.params['id']);
		// const hashtag: string | null = this.form.get('hashtag')?.value ?? null;
		// if (id === 0 || this.hashtag().data === hashtag || this.form.invalid) return;
		// this._store.dispatch(
		// 	ADMIN_SELL_ARTICLE_HASHTAG_UPDATE({
		// 		id,
		// 		hashtag
		// 	})
		// );
	}

	private _setForm(): UntypedFormGroup {
		return new UntypedFormGroup({
			hashtag: new UntypedFormControl(null, [Validators.maxLength(20), isAlpha()])
		});
	}
}
