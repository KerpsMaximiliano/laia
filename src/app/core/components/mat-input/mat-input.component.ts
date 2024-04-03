import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Sorts.
import { Icon } from '@sorts/icon.sort';

/**
 * Button input component.
 * LABEL (string): valor del input.
 * PLACEHOLDER (string): valor del placeholder.
 * ICON (Icon): icono del input.
 * COLOR (string): color del input.
 * DISABLED (boolean): estado del input.
 */
@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-component-btn-input',
	standalone: true,
	imports: [ButtonComponent],
	templateUrl: './mat-input.component.html',
	styleUrl: './mat-input.component.scss'
})
export class BtnInputComponent implements OnInit {
	@Input() public label?: string;
	@Input() public icon?: Icon;
	@Input() public placeholder?: string;
	@Input() public color: string = '#9e9e9e';
	@Input() public disabled: boolean = false;

	public ngOnInit(): void {
		if (this.label) {
			this.color = '#000';
		}
	}
}
