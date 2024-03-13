import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// * Services.
import { UserService } from '@user/services/user.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-user',
	standalone: true,
	imports: [RouterOutlet],
	template: '<router-outlet />'
})
export class UserComponent implements OnInit {
	private readonly _user: UserService = inject(UserService);

	public ngOnInit(): void {
		this._user.init();
	}
}
