import { ChangeDetectionStrategy, Component } from '@angular/core';

// CDK
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

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
	public items: string[] = [
		'https://placehold.co/130x101',
		'https://placehold.co/630x302',
		'https://placehold.co/230x603',
		'https://placehold.co/130x104',
		'https://placehold.co/530x505',
		'https://placehold.co/130x106',
		'https://placehold.co/130x107',
		'https://placehold.co/130x108',
		'https://placehold.co/130x109'
	];
	public drag: boolean = false;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	private itemDeleted: string[] = []; // ACA SE VA GUARDANDO TODO LO QUE ELIMINAS

	public drop(event: CdkDragDrop<{ item: string; index: number }>): void {
		moveItemInArray(this.items, event.previousContainer.data.index, event.container.data.index);
		this.drag = false;
	}

	public deleteDrop(event: CdkDragDrop<{ item: string; index: number }>): void {
		const index = event.previousContainer.data.index;
		const deletedItem = this.items.splice(index, 1)[0];
		this.itemDeleted.push(deletedItem);
		this.drag = false;
	}

	public onDragStarted(): void {
		this.drag = true;
	}
}
