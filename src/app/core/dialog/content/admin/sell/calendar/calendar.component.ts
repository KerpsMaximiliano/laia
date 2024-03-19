import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';

// * Pipes.
import { formatDate } from '@pipes/calendar-date.pipe';

// * Material.
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-dialog-content-calendar',
	standalone: true,
	imports: [MatDatepickerModule, MatFormFieldModule, ReactiveFormsModule],
	templateUrl: './calendar.component.html',
	styleUrl: './calendar.component.scss',
	providers: [provideNativeDateAdapter()]
})
export class MatCalendarComponent implements OnInit {
	public readonly formatDate = formatDate;
	public minDate: Date = new Date();
	public maxDate: Date = new Date();
	public selected: Date | null = null;

	public ngOnInit(): void {
		this.minDate.setHours(0, 0, 0, 0);
		this.maxDate.setFullYear(this.maxDate.getFullYear() + 1);
	}
}
