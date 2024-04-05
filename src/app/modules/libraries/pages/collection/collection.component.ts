import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Observable, map, startWith } from 'rxjs';

// * Animations.
import { animate, state, style, transition, trigger } from '@angular/animations';

// * Forms.
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Material.
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// * Interfaces.
import { IConfig, data } from './collection.interface';

// * Services
import { CoreService } from '@services/core.service';
import { ImgComponent } from '../../../../core/components/img/img.component';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-library-collection',
	standalone: true,
	animations: [
		trigger('fadeInOut', [
			state(
				'void',
				style({
					opacity: 0,
					transform: 'translateY(-10px)'
				})
			),
			transition('void <=> *', animate('300ms ease-in-out'))
		])
	],
	imports: [ButtonComponent, MatFormFieldModule, MatInputModule, AsyncPipe, MatAutocompleteModule, ReactiveFormsModule, ImgComponent],
	templateUrl: './collection.component.html',
	styleUrl: './collection.component.scss'
})
export class CollectionComponent implements OnInit {
	@ViewChild('input') public input?: ElementRef<HTMLInputElement>;

	public core: CoreService = inject(CoreService);
	public control = new UntypedFormControl('');
	public filtered?: Observable<string[]>;
	public animation: boolean = false;
	public id?: string;

	// !AUX
	public options: string[] = ['One', 'Two', 'Three', 'Three', 'Three', 'Three', 'Three'];
	public data?: IConfig;
	public initialData?: IConfig;
	public laia: boolean = false;
	public asd: boolean = true;
	public change: boolean = false;
	private _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

	public ngOnInit(): void {
		this.data = JSON.parse(JSON.stringify(data));
		this.initialData = JSON.parse(JSON.stringify(data));

		this.filtered = this.control.valueChanges.pipe(
			startWith(''),
			map((value) => this._filter(value || ''))
		);
	}

	public check(index: number): void {
		if (!this.data?.items) return;
		this.data.items[index].check = this.data.items[index].check === 1 ? 0 : 1;

		this.data.items.forEach((item, i) => {
			if (i !== index) {
				item.check = 0;
			}
		});
		this.id = this.data.items[index].id;
		this.change = this.changeCheck();
	}

	public changeCheck(): boolean {
		if (!this.data || !this.initialData) return false;
		for (let i = 0; i < this.data.items.length; i++) {
			const data = this.data.items[i];
			const initial = this.initialData.items[i];

			if (data.check !== initial.check) {
				return true;
			}
		}

		return false;
	}

	public changeLaia(): void {
		this.laia = !this.laia;
		if (!this.laia) {
			this.animation = true;
		} else {
			this.animation = false;
			this.asd = false;
		}
		setTimeout(() => {
			if (!this.laia) {
				this.asd = true;
			} else {
				this.input?.nativeElement.focus();
			}
			this._cdr.detectChanges();
		}, 300);
	}

	public save(): void {
		this.initialData = this.data;
		this.id = undefined;
	}

	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();

		return this.options.filter((option) => option.toLowerCase().includes(filterValue));
	}
}
