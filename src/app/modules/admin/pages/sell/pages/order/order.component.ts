import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Services.
import { CoreService } from '@services/core.service';

// * Material.
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-admin-sell-order',
	standalone: true,
	imports: [ButtonComponent, DragDropModule],
	templateUrl: './order.component.html',
	styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
	public readonly core: CoreService = inject(CoreService);

	// Variable para saber si hubo cambios y habilitar el boton "Ver"
	public change: boolean = false;

	public order: number = 0;

	// Datos configurados en el back.
	public items: string = 'Por Tiempo, Estado del pago, Status, Ventas por mes, Tandas de tiempo, Coordenadas, Catálogo, Vendendores';

	// Lista para recorrer
	public initialOptions: string[] = [];

	public ngOnInit(): void {
		//Configuracion recibida la pasamos a un array.
		this.initialOptions = this.items.split(',').map((item) => item.trim());
	}

	public drop(event: CdkDragDrop<string[]>): void {
		moveItemInArray(this.initialOptions, event.previousIndex, event.currentIndex);
		this.compare();
		console.log(this._format(), 'FORMATO PARA ENVIAR, METODO _format()');
		console.log(this.initialOptions, 'ARRAY CAMBIANDOSE');
	}

	public compare(): void {
		if (this.items === this.initialOptions.join(', ')) {
			this.change = false;
		} else {
			this.change = true;
		}
	}

	// Retora un string con el formato para ser almacenado(ordenado)
	private _format(): string {
		return this.initialOptions.join(', ');
	}
}
