import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Services.
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
export class LibraryComponent implements OnInit {
	public readonly core: CoreService = inject(CoreService);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public library: any = [
		[
			{
				header: 'Recientes',
				check: true,
				multiple: true
			},
			{
				headboard: 'Pagos confirmados',
				title: 'Hola',
				subtitle: 'dsds',
				image:
					'https://firebasestorage.googleapis.com/v0/b/laia-c5d59.appspot.com/o/imageProducts%2Fimage-product-106-2d7b215b-223b-4632-a43a-c3f9568cd0af?alt=media&token=e624b685-1eab-4381-a1a2-552ffd57e99c'
			},
			{
				headboard: 'Pagos confirmados',
				title: 'Hola',
				subtitle: 'dsds',
				image:
					'https://firebasestorage.googleapis.com/v0/b/laia-c5d59.appspot.com/o/imageProducts%2Fimage-product-106-2d7b215b-223b-4632-a43a-c3f9568cd0af?alt=media&token=e624b685-1eab-4381-a1a2-552ffd57e99c'
			}
		],
		[
			{
				header: 'sdasd',
				check: true,
				multiple: true
			},
			{
				headboard: 'Pagos confirmados',
				title: 'Hola',
				subtitle: 'dsds',
				image:
					'https://firebasestorage.googleapis.com/v0/b/laia-c5d59.appspot.com/o/imageProducts%2Fimage-product-106-2d7b215b-223b-4632-a43a-c3f9568cd0af?alt=media&token=e624b685-1eab-4381-a1a2-552ffd57e99c'
			},
			{
				headboard: 'Pagos confirmados',
				title: 'Hola',
				subtitle: 'dsds',
				image:
					'https://firebasestorage.googleapis.com/v0/b/laia-c5d59.appspot.com/o/imageProducts%2Fimage-product-106-2d7b215b-223b-4632-a43a-c3f9568cd0af?alt=media&token=e624b685-1eab-4381-a1a2-552ffd57e99c'
			}
		]
	];

	public ngOnInit(): void {
		console.log('ss');
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public log(asd: any): void {
		console.log(asd);
	}

	public loadImage(value: HTMLDivElement, img: HTMLImageElement): void {
		img.style.display = 'block';
		value.style.background = 'none';
	}
}
