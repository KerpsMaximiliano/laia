import { ChangeDetectionStrategy, Component, OnInit, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';

// * Components.
import { ButtonComponent } from '@components/button/button.component';
import { LoadingComponent } from '@components/loading/loading.component';

// * Consts.
import { INITIAL, LOADING } from '@consts/load.const';

// * Interfaces.
import { ILoadableEntities } from '@interfaces/load.interface';
import { IState } from '@interfaces/state.interface';
import { IArt } from '@sell/interfaces/sell-article.interface';

// * Pipes.
import { currency } from '@pipes/currency.pipe';

// * Services.
import { CoreService } from '@services/core.service';

// * Sorts.
import { ILoading } from '@sorts/loading.sort';

// * Actions.
import { ADMIN_SELL_ARTICLES_LOAD } from '@sell/state/sell.actions';

// * Selectors.
import { selectAdminSellArticles } from '@sell/state/sell.selectors';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-admin-sell-articles',
	standalone: true,
	imports: [ButtonComponent, LoadingComponent],
	templateUrl: './articles.component.html',
	styleUrl: './articles.component.scss'
})
export class ArticlesComponent implements OnInit {
	public readonly currency: (value: number | null | undefined) => string = currency;
	public readonly core: CoreService = inject(CoreService);
	public readonly loading: ILoading = LOADING;
	public readonly initial: ILoading = INITIAL;

	// eslint-disable-next-line @ngrx/use-consistent-global-store-name
	private readonly _store: Store<IState> = inject(Store);

	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly articles: Signal<ILoadableEntities<IArt>> = this._store.selectSignal(selectAdminSellArticles);

	public ngOnInit(): void {
		this._store.dispatch(ADMIN_SELL_ARTICLES_LOAD({ merchant: 1 }));
	}

	public loadImage(value: HTMLDivElement, img: HTMLImageElement): void {
		img.style.display = 'block';
		value.style.background = 'none';
	}
}
