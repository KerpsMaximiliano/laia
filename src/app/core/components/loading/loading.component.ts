import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-component-loading',
	standalone: true,
	imports: [],
	templateUrl: './loading.component.html',
	styleUrl: './loading.component.scss'
})
export class LoadingComponent {
	@Input() public transform?: string = '1';
}
