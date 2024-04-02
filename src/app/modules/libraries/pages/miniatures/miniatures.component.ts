import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Services.
import { CoreService } from '@services/core.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-shared-miniatures',
	standalone: true,
	imports: [ButtonComponent],
	templateUrl: './miniatures.component.html',
	styleUrl: './miniatures.component.scss'
})
export class MiniaturesComponent implements OnInit {
	public readonly core: CoreService = inject(CoreService);
	/**
	 * En caso que no tenga por ejemplo subtitulo la configuracion deberia coneter el guion igual:
	 * 'Fecha, Comprador - Monto, Zona - '
	 * 		 HEADER					  TITLE		   SUBTITLE
	 * Sin configuracion: conf = ' -  - ' (Lo espacios son indiferentes)
	 */
	public readonly conf: string = 'Fecha, Comprador - Monto, Zona - Catalogo'; // Datos como vienen el '-' representa cambio a otro array y la ',' otro elemento del array

	public readonly items: string[] = [
		'Fecha',
		'Comprador',
		'Vendedor',
		'Numero de factura',
		'Status',
		'Monto',
		'Costo',
		'Tipo de entrega',
		'Zona',
		'Catalogo'
	];

	public options: string[] = ['Cabecera', 'Title', 'Subtitle'];
	public selectionEdit: number = 1; // Variable para determinar que seleccionamos para editar
	public selectedItems: number[][] = [[], [], []]; // 0: Cabecera; 1: Title; 2: Subtitle;
	public initialItems: number[][] = [[], [], []];
	public change: boolean = false;

	public ngOnInit(): void {
		this.initialItems = this._getIndexOfItems(this.conf, this.items);
		this.selectedItems = this._getIndexOfItems(this.conf, this.items);
	}

	public selection(index: number): void {
		if (this.selectionEdit) {
			// Valida que no exista en el arreglo. Default: Elimina el elemento del arreglo.
			if (this.selectedItems[this.selectionEdit - 1].includes(index)) {
				this.selectedItems[this.selectionEdit - 1] = this.selectedItems[this.selectionEdit - 1].filter((i) => i !== index);
			} else {
				this.selectedItems[this.selectionEdit - 1].push(index);
			}
			this.change = !this.changes();
		}
	}

	public changes(): boolean {
		// Si tienen la misma longitud evaluamos
		if (this.initialItems.length !== this.selectedItems.length) {
			return false;
		}
		for (let i = 0; i < this.initialItems.length; i++) {
			if (this.initialItems[i].length !== this.selectedItems[i].length) {
				return false;
			}

			for (let j = 0; j < this.initialItems[i].length; j++) {
				if (this.initialItems[i][j] !== this.selectedItems[i][j]) {
					return false;
				}
			}
		}
		return true;
	}

	public check(index: number): boolean {
		return this.selectedItems[this.selectionEdit - 1].includes(index);
	}

	public save(): void {
		this.change = false;
		this.initialItems = this._getIndexOfItems(this._getConfigOfIndex(), this.items).slice();

		console.log(this._getConfigOfIndex()); // Muestra como queda el string para ser enviado al servicio
	}

	/**
	 * * Método para transformar el string a indices y poder representarlo en los elementos seleccionados
	 * @param conf string
	 * @param items string[]
	 * @returns number[][]
	 */
	private _getIndexOfItems(conf: string, items: string[]): number[][] {
		const parts: string[] = conf.split('-'); // [[], [], []] Separamos la config
		const arr: number[][] = []; // Array para almacenar los índices de cada parte de la configuración

		for (const part of parts) {
			const elements: string[] = part.split(',');
			const indexed: number[] = [];

			for (const element of elements) {
				const index: number = items.indexOf(element.trim()); // Obtenemos el indice del elemento
				if (index !== -1) {
					indexed.push(index);
				}
			}

			arr.push(indexed);
		}

		return arr;
	}

	/**
	 * * Método para transformar los indices en un string, para que sea almacenado en el back
	 * @returns string
	 */
	private _getConfigOfIndex(): string {
		let conf: string = '';

		for (const indexed of this.selectedItems) {
			const options: string[] = [];
			for (const index of indexed) {
				if (index >= 0 && index < this.items.length) {
					options.push(this.items[index]);
				}
			}

			const part: string = options.join(', ');
			conf += (conf.length > 0 ? ' - ' : '') + part;
		}

		return conf;
	}
}
