import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

// * Services.
import { CoreService } from '@services/core.service';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Material.
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-admin-sell-miniatures',
	standalone: true,
	imports: [ButtonComponent, MatCheckboxModule],
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

	public items: string[] = [
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
	public selectionEdit: number | undefined = undefined; // Variable para determinar que seleccionamos para editar
	public selectedItems: number[][] = [[], [], []]; // 0 => Cabecera, 1 => Title, 2 => Subtitle
	public initialItems: number[][] = [[], [], []];
	public change: boolean = false;

	public ngOnInit(): void {
		this.initialItems = this._getIndexOfItems(this.conf, this.items);
		this.selectedItems = this._getIndexOfItems(this.conf, this.items);
	}

	public selection(index: number): void {
		if (this.selectionEdit) {
			this.change = true;
			// Primer if valida que no este agregado, si lo esta lo quita
			if (this.selectedItems[this.selectionEdit - 1].includes(index)) {
				this.selectedItems[this.selectionEdit - 1] = this.selectedItems[this.selectionEdit - 1].filter((i) => i !== index);
			} else {
				this.selectedItems[this.selectionEdit - 1].push(index);
			}
		}
	}

	public save(): void {
		this.change = false;
		console.log(this._getConfigOfIndex()); // Muestra como queda el string para ser enviado al servicio
	}

	public check(index: number): boolean {
		return this.selectionEdit !== undefined && this.selectedItems[this.selectionEdit - 1].includes(index);
	}

	// Metodo para transformar el string a indices y poder representarlo en los elementos seleccionados
	private _getIndexOfItems(conf: string, items: string[]): number[][] {
		const confParts = conf.split('-'); // [[], [], []] Separamos la config
		const indexesArray: number[][] = []; // Array para almacenar los índices de cada parte de la configuración

		for (const part of confParts) {
			const elements = part.split(',');
			const indexes: number[] = [];

			for (const element of elements) {
				const index = items.indexOf(element.trim()); // Obtenemos el indice del elemento
				if (index !== -1) {
					indexes.push(index);
				}
			}

			indexesArray.push(indexes);
		}
		return indexesArray;
	}

	// Metodo para transformar los indices en un string, para que sea almacenado en el back
	private _getConfigOfIndex(): string {
		let conf = '';
		for (const indexes of this.selectedItems) {
			const options: string[] = [];
			for (const index of indexes) {
				if (index >= 0 && index < this.items.length) {
					options.push(this.items[index]);
				}
			}
			const partString = options.join(', ');
			conf += (conf.length > 0 ? ' - ' : '') + partString;
		}
		return conf;
	}
}
