import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: '[appContentView]', standalone: true })
export class ContentViewDirective implements AfterViewInit {
	@Output() public readonly elementVisible = new EventEmitter<boolean>();
	@Input() public isTargetElement: boolean = false;

	private _hasBeenVisible: boolean = false;
	private _intersectionOptions: {
		root: null;
		rootMargin: string;
		threshold: number[];
	} = {
		root: null,
		rootMargin: '0px',
		threshold: [0, 0.5, 1]
	};

	public constructor(private _element: ElementRef) {}

	public ngAfterViewInit(): void {
		const observer = new IntersectionObserver(this._intersectionCallback.bind(this), this._intersectionOptions);
		if (this.isTargetElement) observer.observe(this._element.nativeElement);
	}

	private _intersectionCallback(entries: IntersectionObserverEntry[]): void {
		entries.forEach((entry: IntersectionObserverEntry) => {
			if (entry.isIntersecting && !this._hasBeenVisible) {
				this.elementVisible.emit(true);
				this._hasBeenVisible = true;
			}
		});
	}
}
