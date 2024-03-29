import { ComponentType } from '@angular/cdk/portal';
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	ViewChild,
	ViewContainerRef,
	afterNextRender,
	inject
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

// * Services.
import { CoreService } from '@services/core.service';

// * Sorts.
import { IDialog } from '@sorts/dialog.sort';

// * Material.
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	selector: 'app-dialog-container',
	styleUrl: './container-dialog.component.scss',
	template: `
		<div class="dialog">
			<button type="button" class="dialog--btn" aria-label="Cerrar dialogo" (click)="close()"></button>
			<div class="dialog--content" [class.slide-out]="cAnimation">
				<div #content></div>
			</div>
		</div>
	`
})
export class ContainerDialogComponent implements OnDestroy {
	@ViewChild('content', { read: ViewContainerRef }) public readonly content?: ViewContainerRef;

	public cAnimation: boolean = false;

	private readonly _ref: MatDialogRef<ContainerDialogComponent> = inject(MatDialogRef);
	private readonly _data: { dialog: IDialog; conf?: { option: number; logged?: boolean } } = inject(MAT_DIALOG_DATA);
	private readonly _core: CoreService = inject(CoreService);
	private readonly _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
	private readonly _destroy$: Subject<void> = new Subject<void>();

	public constructor() {
		afterNextRender(() => {
			this._core
				.component(this._data.dialog)
				.pipe(takeUntil(this._destroy$))
				.subscribe({
					next: (res: ComponentType<unknown>) => {
						if (this.content) {
							this.content.createComponent(res);
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							// const componentRef: any = this.content.createComponent(res);
							this._cdr.markForCheck();
							// if ('close' in componentRef.instance) {
							// 	componentRef.instance.close.subscribe(() => {
							// 		this.close();
							// 	});
							// }
						}
					}
				});
		});
	}

	public close(): void {
		this.cAnimation = true;
		setTimeout(() => {
			this._ref.close();
		}, 300);
	}

	public ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
		this.cAnimation = false;
	}
}
