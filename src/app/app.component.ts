import { ChangeDetectionStrategy, Component, afterNextRender } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet],
	template: '<router-outlet />'
})
export class AppComponent {
	public constructor() {
		afterNextRender(() => {
			window.addEventListener('resize', () => {
				document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
			});
			document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
		});
	}
}
