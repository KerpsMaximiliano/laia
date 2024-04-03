import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-component-img',
	standalone: true,
	templateUrl: './img.component.html',
	styleUrl: './img.component.scss'
})
export class ImgComponent {
	@Input() public src?: string;
	@Input() public width?: string;
	@Input() public height?: string;

	public loadImage(value: HTMLDivElement, img: HTMLImageElement): void {
		img.style.display = 'block';
		value.style.background = 'none';
	}
}
