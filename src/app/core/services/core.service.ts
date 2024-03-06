import { ComponentType } from '@angular/cdk/portal';
import { Location } from '@angular/common';
import { Injectable, inject } from '@angular/core';

// * Routing.
import { ActivatedRoute, Router } from '@angular/router';

// * RxJS.
import { BehaviorSubject, Observable, from } from 'rxjs';

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

	public open(dialog: string, conf?: { option?: number; logged: boolean }): Observable<MatDialogRef<unknown>> {
		return from(
			(async (): Promise<MatDialogRef<unknown>> => {
				const chunk = await import('@core/dialog/resize/resize-dialog.component');
				const dialogComponent = Object.values(chunk)[0] as ComponentType<unknown>;
				return this._dialog.open(dialogComponent, {
					position: { bottom: '0' },
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

	// public component(component: string): Observable<ComponentType<unknown>> {
	// 	return from(
	// 		(async (): Promise<ComponentType<unknown>> => {
	// 			// eslint-disable-next-line @typescript-eslint/init-declarations, @typescript-eslint/no-explicit-any
	// 			let chunk: any;
	// 			switch (component) {
	// 				case 'cart':
	// 					chunk = await import('@core/dialogs/components/cart/cart.component');
	// 					break;
	// 				case 'maps':
	// 					chunk = await import('@app/core/dialogs/components/maps/maps.component');
	// 					break;
	// 				case 'share':
	// 					chunk = await import('@core/dialogs/components/share/share.component');
	// 					break;
	// 				case 'map':
	// 					chunk = await import('@core/dialogs/components/map/map.component');
	// 					break;
	// 				case 'voucher':
	// 					chunk = await import('@core/dialogs/components/voucher/voucher.component');
	// 					break;
	// 			}
	// 			const dialogComponent = Object.values(chunk)[0] as ComponentType<unknown>;
	// 			return dialogComponent;
	// 		})()
	// 	);
	// }
}
