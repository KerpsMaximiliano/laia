import { ComponentType } from '@angular/cdk/portal';
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	OnDestroy,
	OnInit,
	ViewChild,
	ViewContainerRef,
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
	selector: 'app-dialog-resizable',
	templateUrl: './resize-dialog.component.html',
	styleUrl: './resize-dialog.component.scss'
})
export class ResizeDialogComponent implements OnInit, OnDestroy {
	@ViewChild('content', { read: ViewContainerRef }) public readonly content?: ViewContainerRef;
	@ViewChild('resizable', { static: false }) public readonly resizable?: ElementRef;

	public y: number = 0;
	public dy: number = 0;
	public canimation: boolean = false;
	public animation: boolean = false;

	private readonly _ref: MatDialogRef<ResizeDialogComponent> = inject(MatDialogRef);
	private readonly _data: { dialog: IDialog; conf?: { option: number; logged?: boolean } } = inject(MAT_DIALOG_DATA);
	private readonly _core: CoreService = inject(CoreService);
	private readonly _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
	private readonly _destroy$: Subject<void> = new Subject<void>();

	// eslint-disable-next-line @typescript-eslint/member-ordering
	public height: number = this._height();
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public cHeight: number = this._height();

	public ngOnInit(): void {
		this._core
			.component(this._data.dialog)
			.pipe(takeUntil(this._destroy$))
			.subscribe({
				next: (res: ComponentType<unknown>) => {
					if (this.content) {
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						const componentRef: any = this.content.createComponent(res);
						this._cdr.markForCheck();
						if ('close' in componentRef.instance) {
							componentRef.instance.close.subscribe(() => {
								this.close();
							});
						}
					}
				}
			});

		this._core.gHeight.pipe(takeUntil(this._destroy$)).subscribe((res) => {
			if (res !== 0) {
				this.resizable?.nativeElement.style.setProperty('--ht', `${this.height}px`);
				this.resizable?.nativeElement.style.setProperty('--nw', `${res}px`);
				this.animation = true;
				this.height = res;
				this._cdr.markForCheck();
			}
		});
	}

	public touchstart(event: TouchEvent): void {
		this.y = event.changedTouches[0].screenY;
	}

	public touchmove(event: TouchEvent): void {
		this.dy = event.changedTouches[0].screenY - this.y;
		this.y = event.changedTouches[0].screenY;
		this.height -= this.dy;
		if (this.height < this.cHeight - 40) {
			this.close();
		}
	}

	public close(): void {
		this.canimation = true;
		setTimeout(() => {
			this._ref.close();
		}, 400);
	}

	public ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
		this._core.height = 0;
		this.canimation = false;
	}

	private _height(): number {
		switch (this._data.dialog) {
			case 'INVEST':
				return 665;
			case 'HASHTAG':
				return 200;
			case 'DELAY':
				return 300;
			case 'MAT-CALENDAR':
				return 620;
			case 'PAYMENT':
				return 530;
			case 'QUESTION':
				return 362;
			case 'TAG':
				return 190;
			case 'SHARE':
				return 210;
			case 'SORT':
				return 260;
			default:
				return window.innerHeight - 2;
		}
	}
}
