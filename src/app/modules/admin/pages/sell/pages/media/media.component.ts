import { ChangeDetectionStrategy, Component } from '@angular/core';

// CDK
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';

// Material
import { MatIconModule } from '@angular/material/icon';

// * Components
import { ButtonComponent } from '@components/button/button.component';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-admin-article-media',
	standalone: true,
	imports: [DragDropModule, MatIconModule, ButtonComponent],
	templateUrl: './media.component.html',
	styleUrl: './media.component.scss'
})
export class MediaComponent {
	public items = [
		'https://firebasestorage.googleapis.com/v0/b/laia-c5d59.appspot.com/o/images%2Fprod_1.png?alt=media&token=388cefde-efc9-495f-81de-ba935b304132',
		'https://firebasestorage.googleapis.com/v0/b/laia-c5d59.appspot.com/o/images%2Fprod_2.png?alt=media&token=b05649dd-8270-4a96-b332-da15261d19a0',
		'https://firebasestorage.googleapis.com/v0/b/laia-c5d59.appspot.com/o/images%2Fprod_3.png?alt=media&token=c06be23a-a579-4e9b-a693-7477d7a832b4',
		'https://firebasestorage.googleapis.com/v0/b/laia-c5d59.appspot.com/o/images%2Fprod_4.png?alt=media&token=a2c4cc03-e85d-4be5-afff-c111a3e0a8fc',
		'https://firebasestorage.googleapis.com/v0/b/laia-c5d59.appspot.com/o/images%2Fprod_5.png?alt=media&token=6231b843-86c7-422e-8c81-79b3907cecad',
		'https://firebasestorage.googleapis.com/v0/b/laia-c5d59.appspot.com/o/images%2Fprod_6.png?alt=media&token=67c5231a-8919-4e09-b1d5-43237c2ae91e',
		'https://firebasestorage.googleapis.com/v0/b/laia-c5d59.appspot.com/o/images%2Fprod_2.png?alt=media&token=b05649dd-8270-4a96-b332-da15261d19a0'
	];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public drop(event: CdkDragDrop<any>): void {
		this.items[event.previousContainer.data.index] = event.container.data.item;
		this.items[event.container.data.index] = event.previousContainer.data.item;
	}
}
