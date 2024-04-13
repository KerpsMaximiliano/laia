import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Services.

// * Material.
import { MatExpansionModule } from '@angular/material/expansion';
import { ILanding, data } from './landing.interface';
@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-admin-sell-landing',
	standalone: true,
	imports: [MatExpansionModule, ButtonComponent],
	templateUrl: './landing.component.html',
	styleUrl: './landing.component.scss'
})
export class LandingComponent {
	public data: ILanding = data;
	public muted: boolean = true;
	public selected: number = 0;

	public touchStartX: number = 0;

	@HostListener('touchstart', ['$event'])
	public onTouchStart(event: TouchEvent): void {
		this.touchStartX = event.touches[0].clientX;
	}

	@HostListener('touchend', ['$event'])
	public onTouchEnd(event: TouchEvent): void {
		const touchEndX = event.changedTouches[0].clientX;
		const distance = touchEndX - this.touchStartX;

		if (distance < -100 && this.data.item.length !== this.selected + 1) {
			this.selected++;
		} else if (distance > 100 && this.selected > 0) {
			this.selected--;
		}
	}
}
