import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';

// * Material.
import { ReactiveFormsModule } from '@angular/forms';
import {
	DateRange,
	DefaultMatCalendarRangeStrategy,
	MAT_DATE_RANGE_SELECTION_STRATEGY,
	MatDatepickerModule
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CalendarHeaderComponent } from './calendar-header';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-dialog-content-date-range',
	standalone: true,

	imports: [MatDatepickerModule, MatFormFieldModule, ReactiveFormsModule],
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
export class DateRangeComponent implements OnInit {
	public calendarHeader = CalendarHeaderComponent;
	public maxDate: Date = new Date();
	// public selected: Date | null = null;
	// public ngOnInit(): void {
	// 	this.minDate.setHours(0, 0, 0, 0);
	// 	this.maxDate.setFullYear(this.maxDate.getFullYear() + 1);
	// }

	public selectedDateRange?: DateRange<Date>;

	public ngOnInit(): void {
		this.maxDate.setFullYear(this.maxDate.getFullYear());
	}

	public onSelectedChange(date: Date): void {
		if (this.selectedDateRange && this.selectedDateRange.start && date > this.selectedDateRange.start && !this.selectedDateRange.end) {
			this.selectedDateRange = new DateRange(this.selectedDateRange.start, date);
		} else {
			this.selectedDateRange = new DateRange(date, null);
		}
		console.log(this.selectedDateRange);
	}
}
