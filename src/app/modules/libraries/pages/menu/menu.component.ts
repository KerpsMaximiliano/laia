import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Services.
import { CoreService } from '@services/core.service';

// * Material.
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-admin-sell-menu',
	standalone: true,
	imports: [MatExpansionModule, ButtonComponent],
	templateUrl: './menu.component.html',
	styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
	public readonly core: CoreService = inject(CoreService);
	public stars: number[] = [1, 2, 3, 4, 5]; // Cantidad de estrellas que se pueden asignar.
	public rating: number = 0; // Calificacion del usuario, por defecto 0(No califico la app).
	//! AUX
	public edit: boolean = false;

	// Si ya viene con una calificacion previa, se setea esa y se puede modificar.
	public config: { disminutive: string; name: string; order: string; asc: number; rating?: number } = {
		disminutive: 'Comprador',
		name: 'Compradores',
		order: 'Fecha Reciente',
		asc: 0
	};

	public ngOnInit(): void {
		this.rating = this.config.rating ? this.config.rating : 0;
	}

	public change(): void {
		this.config.asc = this.config.asc === 0 ? 1 : 0;
	}
}
