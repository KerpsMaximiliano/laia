import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// * Material.
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-calendar-header',
	standalone: true,
	imports: [MatButtonModule, MatIconModule],
	template: `
		<div style="display: flex; align-items: center; padding: 0.5em;">
			<button mat-icon-button (click)="onClick('BEFORE')">
				<mat-icon>keyboard_arrow_left</mat-icon>
			</button>

			<div style="min-width: 48px"></div>

			<span style="flex: 1; height: 1em; font-weight: 500; text-align: center;">{{ label }}</span>

			<button mat-icon-button (click)="onClick('AFTER')">
				<mat-icon>keyboard_arrow_right</mat-icon>
			</button>
		</div>
	`
})
export class CalendarHeaderComponent<D> implements OnDestroy {
	// eslint-disable-next-line @ngrx/use-consistent-global-store-name
	private _destroyed: Subject<void> = new Subject<void>();

	public constructor(
		@Inject(MAT_DATE_FORMATS) private readonly _formats: MatDateFormats,
		private readonly _calendar: MatCalendar<D>,
		private readonly _adapter: DateAdapter<D>,
		private readonly _cdr: ChangeDetectorRef
	) {
		this._calendar.stateChanges.pipe(takeUntil(this._destroyed)).subscribe(() => {
			this._cdr.markForCheck();
		});
	}

	public get label(): string {
		return this._adapter.format(this._calendar.activeDate, this._formats.display.monthYearLabel).toLocaleUpperCase();
	}

	public onClick(mode: 'AFTER' | 'BEFORE'): void {
		this._calendar.activeDate =
			mode === 'BEFORE'
				? this._adapter.addCalendarMonths(this._calendar.activeDate, -1)
				: this._adapter.addCalendarMonths(this._calendar.activeDate, 1);
	}

	public ngOnDestroy(): void {
		this._destroyed.next();
		this._destroyed.complete();
	}
}
