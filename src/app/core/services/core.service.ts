import { ComponentType } from '@angular/cdk/portal';
import { Location } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';

// * Routing.
import { ActivatedRoute, Router } from '@angular/router';

// * Sorts.
import { IDialog } from '@sorts/dialog.sort';

// * Material.
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({ providedIn: 'root' })
export class CoreService {
	private readonly _location: Location = inject(Location);
	private readonly _router: Router = inject(Router);
	private readonly _route: ActivatedRoute = inject(ActivatedRoute);
	private readonly _dialog: MatDialog = inject(MatDialog);

	private _height: BehaviorSubject<number> = new BehaviorSubject<number>(0);

	// eslint-disable-next-line @typescript-eslint/member-ordering
	public gHeight: Observable<number> = this._height.asObservable();

	public get height(): BehaviorSubject<number> {
		return this._height;
	}

	public set height(height: number) {
		this._height.next(height);
	}

	public back(): void {
		this._location.back();
	}

	public redirect(url: string, id?: number | string): void {
		if (id) {
			void this._router.navigate([`${url}/${id}`], { relativeTo: this._route });
			return;
		} else {
			void this._router.navigate([url], { relativeTo: this._route });
			return;
		}
	}

	public open(dialog: IDialog, conf?: { option?: number; logged: boolean }): Observable<MatDialogRef<unknown>> {
		return from(
			(async (): Promise<MatDialogRef<unknown>> => {
				const chunk = await import('@dialogs/resize/resize-dialog.component');
				const dialogComponent = Object.values(chunk)[0] as ComponentType<unknown>;
				return this._dialog.open(dialogComponent, {
					position: { bottom: '0%' },
					width: '100%',
					maxWidth: '450px',
					height: '100%',
					maxHeight: '950px',
					data: {
						dialog,
						conf
					}
				});
			})()
		);
	}

	public component(content: IDialog): Observable<ComponentType<unknown>> {
		return from(
			(async (): Promise<ComponentType<unknown>> => {
				// eslint-disable-next-line @typescript-eslint/init-declarations, @typescript-eslint/no-explicit-any
				let chunk: any;
				switch (content) {
					case 'INVEST':
						chunk = await import('@dialogs/content/admin/sell/invest/invest.component');
						break;
					case 'HASHTAG':
						chunk = await import('@dialogs/content/admin/sell/hashtag/hashtag.component');
						break;
					case 'DELAY':
						chunk = await import('@dialogs/content/admin/sell/delay/delay.component');
						break;
					case 'KEYWORDS':
						chunk = await import('@dialogs/content/admin/sell/keywords/keywords.component');
						break;
					case 'QUESTION':
						chunk = await import('@dialogs/content/admin/sell/question/question.component');
						break;
					case 'TAG':
						chunk = await import('@dialogs/content/admin/sell/tags/tag.component');
						break;
					case 'SHARE':
						chunk = await import('@dialogs/content/shared/share/share.component');
						break;
				}
				const dialogComponent = Object.values(chunk)[0] as ComponentType<unknown>;
				return dialogComponent;
			})()
		);
	}
}
