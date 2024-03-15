import { ChangeDetectionStrategy, Component } from '@angular/core';

// * Material.
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// * Pipes.
import { formatDate } from '@pipes/calendar-date.pipe';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-dialog-content-payment',
	standalone: true,
	providers: [provideNativeDateAdapter()],
	imports: [MatDatepickerModule, MatFormFieldModule, MatInputModule],
	templateUrl: './mat-calendar.component.html',
	styleUrl: './mat-calendar.component.scss'
})
export class MatCalendarComponent {
	public readonly formatDate = formatDate;
	public selected: Date | null = null;
}
