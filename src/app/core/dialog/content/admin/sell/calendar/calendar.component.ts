import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';

// * Pipes.
import { formatDate } from '@pipes/calendar-date.pipe';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Material.
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-dialog-content-calendar',
	standalone: true,
	imports: [MatDatepickerModule, MatFormFieldModule, ReactiveFormsModule, ButtonComponent],
	templateUrl: './calendar.component.html',
	styleUrl: './calendar.component.scss',
	providers: [provideNativeDateAdapter()]
})
export class MatCalendarComponent implements OnInit {
	public readonly ref: MatDialogRef<MatCalendarComponent> = inject(MatDialogRef);
	public readonly formatDate = formatDate;
	public minDate: Date = new Date();
	public maxDate: Date = new Date();
	public selected: Date | null = null;

	public ngOnInit(): void {
		this.minDate.setHours(0, 0, 0, 0);
		this.maxDate.setFullYear(this.maxDate.getFullYear() + 1);
	}
}
