import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';

// * CDK.
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Consts.
import { COMPLETE, LOADING } from '@consts/load.const';

// * Interfaces.
import { IState } from '@interfaces/state.interface';

// * Services.
import { CollectionsService } from '@common/services/collections.service';

// * Sorts.
import { ILoading } from '@sorts/loading.sort';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-library-collection-ordering',
	standalone: true,
	imports: [ButtonComponent, DragDropModule],
	templateUrl: './collection-ordering.component.html',
	styleUrl: './collection-ordering.component.scss'
})
export class OrderingComponent implements OnInit {
	// ? 0: desc
	// ? 1:	asc

	public readonly loading: ILoading = LOADING;
	public readonly complete: ILoading = COMPLETE;

	// Datos configurados en el back.
	public items: string = 'Por Tiempo, Estado del pago, Status, Ventas por mes, Tandas de tiempo, Coordenadas, Catálogo, Vendendores';

	// eslint-disable-next-line @ngrx/use-consistent-global-store-name
	private readonly _store: Store<IState> = inject(Store);

	// * selectCollectionOrder(tLibrary, collection)
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public order = {
		status: this.complete,
		props: [
			'Nombre',
			'Apellido',
			'Correo electrónico',
			'Teléfono',
			'Fecha de compra',
			'Cantidad de articulos',
			'Cantidad de compras',
			'Precio de la compra',
			'Precio total de compras'
		],
		type: 0
	};

	private readonly _collections: CollectionsService = inject(CollectionsService);

	public ngOnInit(): void {
		console.log('hola');
	}

	public ordering(): void {
		console.log('order');
	}

	public drop(event: CdkDragDrop<string[]>): void {
		moveItemInArray(this.order.props, event.previousIndex, event.currentIndex);
	}
}
