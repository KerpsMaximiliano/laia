import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	NgZone,
	OnDestroy,
	OnInit,
	Signal,
	ViewChild,
	inject
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, take, takeUntil } from 'rxjs';

// * CDK.
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';

// * Forms.
import { AbstractControl, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Consts.
import { INITIAL } from '@app/core/constants/load.const';

// * Functions.
import { id } from '@functions/id.function';

// * Interfaces.
import { ILoadableEntity } from '@interfaces/load.interface';
import { IState } from '@interfaces/state.interface';
import { IArticle } from '@sell/interfaces/sell.interface';
import { ILogin } from '@user/interfaces/user.interface';

// * Pipes.
import { currency } from '@pipes/currency.pipe';

// * Services.
import { SellService } from '@sell/services/sell.service';
import { CoreService } from '@services/core.service';

// * Sorts.
import { ILoading } from '@app/core/sorts/loading.sort';
import { IDialog } from '@sorts/dialog.sort';

// * Actions.

// * Validators.
import { getErrorMessage, notOnlySpaces } from '@validators/character.validators';

// * Selectors.
import { selectAdminSellArt } from '@sell/state/sell.selectors';
import { selectLogin } from '@user/state/user.selectors';

// * Material.
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-admin-sell-article',
	standalone: true,
	imports: [TextFieldModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, ButtonComponent],
	templateUrl: './article.component.html',
	styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('autosize') public autosize?: CdkTextareaAutosize;
	@ViewChild('carousel', { static: false }) public carousel?: ElementRef;

	// eslint-disable-next-line @typescript-eslint/naming-convention
	public readonly INITIAL: ILoading = INITIAL;
	public readonly getErrorMessage: (control: AbstractControl<unknown, unknown>) => string = getErrorMessage;
	public readonly currency: (value: number | null | undefined) => string = currency;
	public readonly core: CoreService = inject(CoreService);
	public readonly sell: SellService = inject(SellService);
	public readonly form: UntypedFormGroup = this._setForm();

	public article?: Signal<ILoadableEntity<IArticle>>;
	public index: number = 0;
	public options: {
		title: string;
		description: string;
		status: boolean;
		action: 'OPEN' | 'REDIRECT' | undefined;
		redirect?: string;
		dialog?: IDialog;
	}[] = [
		{
			title: 'Hashtag',
			description: 'Lo adicionas en tus redes sociales y al entrar a tu tienda lo buscan y lo encuentran directamente.',
			status: true,
			action: 'OPEN',
			dialog: 'HASHTAG'
		},
		{
			title: 'Tiempo de Fabricación',
			description:
				'Ej: Florista tarde 45 minutos en armar el arreglo floral. Esto afecta la tanda de entrega que verá el comprador (si lo activas).',
			status: true,
			action: 'OPEN',
			dialog: 'DELAY'
		},
		{
			title: 'Información adicional',
			description:
				'Escribe más del artículo, si quieres incluye hasta imágenes para una descrpción más clara o una buena historia.',
			status: true,
			action: 'REDIRECT',
			redirect: 'segment'
		},
		{
			title: 'Palabras claves para búsquedas',
			description: 'Para que tus compradores y LAIA lo encuentren con palabras referentes.',
			status: true,
			action: 'OPEN',
			dialog: 'KEYWORDS'
		},
		{
			title: 'Preguntas a Compradores',
			description:
				'Generalmente usado cuando necesitas saber respuestas del comprador antes de hacer la venta del servicio o el artículo que ofreces.',
			status: true,
			action: 'OPEN',
			dialog: 'QUESTION'
		},
		{
			title: 'Categorias',
			description: 'Agrupa y presenta artículos en tu tienda.',
			status: true,
			action: undefined
		},
		{
			title: 'Incentivos',
			description: 'Incentiva a tu personal interno a vender para que vendas más de cualquiera de tus artículos.',
			status: false,
			action: undefined
		},
		{
			title: 'Catálogos',
			description:
				'Creálos con precios ajustables como playlists para aumentar tu alcance y visibilidad a cambio de comisiones.',
			status: false,
			action: undefined
		},
		{
			title: 'Premia a Compradores',
			description: 'Asigna la cantidad de puntos que se ganan los compradores y premiálos cuando alcancen tu meta.',
			status: false,
			action: undefined
		},
		{
			title: 'Reservas',
			description:
				'Destina un tiempo específico para brindar el servicio de este Artículo. Conecta su propio Google Calendar para la gestión.',
			status: false,
			action: undefined
		}
	];

	// eslint-disable-next-line @ngrx/use-consistent-global-store-name
	private readonly _store: Store<IState> = inject(Store);
	private readonly _zone: NgZone = inject(NgZone);
	private readonly _route: ActivatedRoute = inject(ActivatedRoute);
	private readonly _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly user: Signal<ILogin> = this._store.selectSignal(selectLogin);
	private readonly _id: number = id(this._route.snapshot.params['id']);
	private readonly _destroy$: Subject<void> = new Subject<void>();

	private _elements: NodeListOf<HTMLElement> | undefined = undefined;
	private _listener: (() => void) | undefined;
	private _rendered: boolean = false;

	public ngOnInit(): void {
		if (this._id !== this._route.snapshot.params['id'])
			this.article = this._store.selectSignal(selectAdminSellArt(this._id));

		// if (this.user().logged) {
		// 	const id: number = this._id(this._route.snapshot.params['id']);
		// 	if (id !== 0 && this.art().status === this.INITIAL) {
		// 		this._store.dispatch(ADMIN_SELL_ARTICLE_LOAD({ id }));
		// 	}
		// }

		// this.form.get('title')?.setValue(this.art().data.title);
		// this.form.get('price')?.setValue(this.art().data.price.amount);
		// this.form.get('stock')?.setValue(this.art().data.stock.quantity);
		// this.form.get('tStock')?.setValue(this.art().data.stock.type);
	}

	public ngAfterViewInit(): void {
		this._resize();
		this._listen();
	}

	public save(): void {
		console.log('save');
	}

	public scrollToImage(index: number): void {
		if (!this._elements) return;
		if (!this._rendered) this._listen();
		this._elements[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
	}

	public create(): void {
		if (this.form.valid) {
			console.log('create');
		} else {
			this.form.markAllAsTouched();
		}
	}

	public ngOnDestroy(): void {
		if (this._listener) this.carousel?.nativeElement.removeEventListener('scroll', this._listener);
		this._destroy$.next();
		this._destroy$.complete();
	}

	private _scroll(): void {
		const scrollLeft = this.carousel?.nativeElement.scrollLeft || 0;
		const itemWidth = this._elements?.[0]?.offsetWidth || 0;
		if (this.index !== Math.round(scrollLeft / itemWidth)) this.index = Math.round(scrollLeft / itemWidth);
		this._cdr.markForCheck();
	}

	private _listen(): void {
		if (this._rendered) return;
		if (!this.carousel) return;
		if (this._listener) {
			this.carousel.nativeElement.removeEventListener('scroll', this._listener);
		}
		this._elements = this.carousel.nativeElement.children;
		if (this._elements?.length === 1) return;
		this._listener = this._scroll.bind(this);
		this.carousel.nativeElement.addEventListener('scroll', this._listener);
		this._rendered = true;
	}

	private _setForm(): UntypedFormGroup {
		return new UntypedFormGroup({
			title: new UntypedFormControl(null, [Validators.maxLength(120), notOnlySpaces()]),
			price: new UntypedFormControl(null, Validators.max(9999999999)),
			stock: new UntypedFormControl(null, Validators.max(9999999999)),
			tStock: new UntypedFormControl(1)
		});
	}

	private _resize(): void {
		this.form.controls['title'].valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
			this._zone.onStable.pipe(take(1)).subscribe(() => this.autosize?.resizeToFitContent(true));
		});
	}
}