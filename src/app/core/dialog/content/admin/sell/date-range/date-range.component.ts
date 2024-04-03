import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';

// * Forms.
import { ReactiveFormsModule } from '@angular/forms';

// * Material.
import { provideNativeDateAdapter } from '@angular/material/core';
import {
	DateRange,
	DefaultMatCalendarRangeStrategy,
	MAT_DATE_RANGE_SELECTION_STRATEGY,
	MatDatepickerModule
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

// * Components.
import { ButtonComponent } from '@components/button/button.component';
import { CalendarHeaderComponent } from './calendar-header';

// * Pipes.
import { MatDialogRef } from '@angular/material/dialog';
import { dateTransform } from '@pipes/date.pipe';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-dialog-content-date-range',
	standalone: true,
	imports: [MatDatepickerModule, MatFormFieldModule, ReactiveFormsModule, ButtonComponent],
	templateUrl: './date-range.component.html',
	styleUrl: './date-range.component.scss',
	providers: [
		provideNativeDateAdapter(),
		{
			provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
			useClass: DefaultMatCalendarRangeStrategy
		}
	]
})
export class DateRangeComponent implements OnInit, OnDestroy {
	public readonly ref: MatDialogRef<DateRangeComponent> = inject(MatDialogRef);
	public calendarHeader = CalendarHeaderComponent;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public datePipe: any = dateTransform;
	public maxDate: Date = new Date();

	public selectedDateRange?: DateRange<Date>;

	public ngOnInit(): void {
		this.maxDate.setFullYear(this.maxDate.getFullYear());
	}

	public onSelectedChange(date: Date): void {
		if (this.selectedDateRange?.start && date > this.selectedDateRange.start && !this.selectedDateRange.end) {
			// Range days para determinar los dias que hay entre start y end date.
			const rangeDays = Math.abs((date.getTime() - this.selectedDateRange.start.getTime()) / (1000 * 3600 * 24));
			if (rangeDays > 13) {
				console.log('El rango seleccionado no puede exceder dos semanas.');
				return;
			}

			this.selectedDateRange = new DateRange(this.selectedDateRange.start, date);
		} else {
			this.selectedDateRange = new DateRange(date, null);
		}
	}

	public ngOnDestroy(): void {
		console.log(this.selectedDateRange, 'Fecha');
		console.log(this.datePipe(this.selectedDateRange?.start), 'start');
		console.log(this.datePipe(this.selectedDateRange?.end), 'end');
	}
}
