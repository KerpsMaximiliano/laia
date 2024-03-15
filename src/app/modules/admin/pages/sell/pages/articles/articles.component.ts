import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../../../../core/components/button/button.component';
import { CoreService } from '../../../../../../core/services/core.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-admin-sell-articles',
	standalone: true,
	imports: [ButtonComponent],
	templateUrl: './articles.component.html',
	styleUrl: './articles.component.scss'
})
export class ArticlesComponent {
	public readonly core: CoreService = inject(CoreService);
}
