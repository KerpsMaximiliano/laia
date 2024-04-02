import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

// * CDK.
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Services.
import { CoreService } from '@services/core.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-library-collection-ordering',
	standalone: true,
	imports: [ButtonComponent, DragDropModule],
	templateUrl: './ordering.component.html',
	styleUrl: './ordering.component.scss'
})
export class OrderingComponent implements OnInit {
	public readonly core: CoreService = inject(CoreService);

	// Variable para saber si hubo cambios y habilitar el boton "Ver"
	public change: boolean = false;

	// InitialOrder = Como viene del servicio, lo que ya estaba configurado.
	public initialOrder: number = 0;
	public order: number = 0;

	// Datos configurados en el back.
	public items: string = 'Por Tiempo, Estado del pago, Status, Ventas por mes, Tandas de tiempo, Coordenadas, Catálogo, Vendendores';

	// Lista para recorrer
	public initialOptions: string[] = [];
	public selectedOptions: string[] = [];

	public ngOnInit(): void {
		//Configuracion recibida la pasamos a un array.
		this.initialOptions = this.items.split(',').map((item) => item.trim());
		this.selectedOptions = this.items.split(',').map((item) => item.trim());
	}

	public drop(event: CdkDragDrop<string[]>): void {
		moveItemInArray(this.selectedOptions, event.previousIndex, event.currentIndex);
		this.compare(this.order);
	}

	public compare(order: number): void {
		this.order = order;

		if (this.selectedOptions.join(', ') === this.initialOptions.join(', ') && order === this.initialOrder) {
			this.change = false;
		} else {
			this.change = true;
		}
	}

	public save(): void {
		this.initialOptions = this.selectedOptions.slice();
		this.initialOrder = this.order;
		this.change = false;
	}

	// Retora un string con el formato para ser almacenado(ordenado)
	private _format(arr: string[]): string {
		return arr.join(', ');
	}
}
