import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-admin-buy-article',
	standalone: true,
	imports: [],
	templateUrl: './article.component.html',
	styleUrl: './article.component.scss'
})
export class ArticleComponent {}
