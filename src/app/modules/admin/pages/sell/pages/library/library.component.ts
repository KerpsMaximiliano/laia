import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Interfaces.
import { IItems, ILibrary, data } from '@sell/interfaces/sell.interface';

// * Services.
import { SellService } from '@sell/services/sell.service';
import { CoreService } from '@services/core.service';

// * Material.
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-admin-sell-library',
	standalone: true,
	imports: [MatExpansionModule, ButtonComponent],
	templateUrl: './library.component.html',
	styleUrl: './library.component.scss'
})
export class LibraryComponent implements OnInit, OnDestroy {
	public readonly sell: SellService = inject(SellService);
	public readonly core: CoreService = inject(CoreService);

	public library?: ILibrary;

	public ngOnInit(): void {
		this.library = data;
	}

	public check(value: IItems[], index: number, multiple: number): void {
		value[index].check = value[index].check === 1 ? 0 : 1;
		if (multiple === 1) {
			value.forEach((item, i) => {
				if (i !== index) {
					item.check = 0;
				}
			});
		}
	}

	public loadImage(value: HTMLDivElement, img: HTMLImageElement): void {
		img.style.display = 'block';
		value.style.background = 'none';
	}

	public ngOnDestroy(): void {
		console.log(this.library);
	}
}
