import { ComponentType } from '@angular/cdk/portal';
import { Location } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, filter, from, map } from 'rxjs';

// * Env.
import { environment } from '@env/environment';

// * Apollo.
import { Apollo, gql } from 'apollo-angular';

// * Routing.
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

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
	private readonly _apollo: Apollo = inject(Apollo);
	private readonly _height: BehaviorSubject<number> = new BehaviorSubject<number>(0);
	private readonly _http: HttpClient = inject(HttpClient);
	private readonly _api: string = environment.api;

	private _previous: string = '';
	private _current: string = '';

	public constructor() {
		this._router.events
			.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
			.subscribe((event: NavigationEnd) => {
				this._previous = this._current;
				this._current = event.urlAfterRedirects;
			});
	}

	public get previous(): string {
		return this._previous;
	}

	public set height(height: number) {
		this._height.next(height);
	}

	/**
	 * localStorage.getItem(key);
	 * @param key string;
	 * @returns string | undefined.
	 */
	public gLocal(key: string): string | undefined {
		return localStorage.getItem(key) ?? undefined;
	}

	/**
	 * localStorage.setItem(key, value);
	 * @param key string;
	 * @param value number | string;
	 */
	public uLocal(key: string, value: number | string): void {
		localStorage.setItem(key, `${value}`);
	}

	public back(): void {
		this._location.back();
	}

	public origin(): void {
		if (this.gLocal('origin')) {
			void this._router.navigate([this.gLocal('origin')]);
			return;
		} else {
			void this._router.navigate(['']);
			return;
		}
	}

	public redirect(url: string, id?: number | string): void {
		console.log('redirect');

		if (url === 'auth') this.uLocal('origin', window.location.pathname);

		if (id) {
			void this._router.navigate([`${url}/${id}`], { relativeTo: this._route });
			return;
		} else {
			void this._router.navigate([url], { relativeTo: this._route });
			return;
		}
	}

	public query<T>(request: string, variables?: Record<string, unknown>, cache?: boolean): Observable<T> {
		return this._apollo
			.query<T>({
				query: gql(`query ${request}`),
				variables,
				fetchPolicy: !cache ? 'cache-first' : 'no-cache'
			})
			.pipe(map((res) => res.data as T));
	}

	public mutation<T>(request: string, variables?: Record<string, unknown>): Observable<T> {
		return this._apollo
			.mutate<T>({
				mutation: gql(`mutation ${request}`),
				variables
			})
			.pipe(map((res) => res.data as T));
	}

	public get<T, R extends object>(point: string, params: R): Observable<T> {
		let httpParams = new HttpParams();
		for (const key in params) {
			if (Object.prototype.hasOwnProperty.call(params, key)) {
				httpParams = httpParams.append(key, String(params[key]));
			}
		}
		return this._http.get<T>(`${this._api}${point}`, { params: httpParams });
	}

	public post<T, R extends object>(point: string, body: R): Observable<T> {
		return this._http.post<T>(`${this._api}${point}`, body, { headers: { accept: '*/*' } });
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public open(dialog: IDialog, conf?: { option?: any; logged: boolean }): Observable<MatDialogRef<unknown>> {
		return from(
			(async (): Promise<MatDialogRef<unknown>> => {
				const chunk = await import('@app/core/dialog/container-dialog.component');
				const component = Object.values(chunk)[0] as ComponentType<unknown>;
				return this._dialog.open(component, {
					position: { bottom: '0' },
					minWidth: '100vw',
					autoFocus: true,
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
					case 'CALENDAR':
						chunk = await import('@app/core/dialog/content/admin/sell/calendar/calendar.component');
						break;
					case 'HASHTAG':
						chunk = await import('@dialogs/content/admin/sell/hashtag/hashtag.component');
						break;
					case 'DATE-RANGE':
						chunk = await import('@app/core/dialog/content/admin/sell/date-range/date-range.component');
						break;
					case 'DELAY':
						chunk = await import('@dialogs/content/admin/sell/delay/delay.component');
						break;
					case 'PAYMENT':
						chunk = await import('@dialogs/content/admin/sell/payment/payment.component');
						break;
					case 'TAG':
						chunk = await import('@dialogs/content/admin/sell/tags/tag.component');
						break;
					case 'SHARE':
						chunk = await import('@dialogs/content/shared/share/share.component');
						break;
					case 'SORT':
						chunk = await import('@dialogs/content/admin/sell/sort/sort.component');
						break;
					case 'TIME':
						chunk = await import('@app/core/dialog/content/admin/sell/time/time.component');
						break;
					case 'ADD':
						chunk = await import('@dialogs/content/admin/sell/add/add.component');
						break;
				}
				const component = Object.values(chunk)[0] as ComponentType<unknown>;
				return component;
			})()
		);
	}
}
