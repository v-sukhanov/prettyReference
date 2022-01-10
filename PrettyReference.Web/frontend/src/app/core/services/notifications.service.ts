import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable()
export class NotificationsService {
	public notifications$: Subject<string>;

	constructor() {
		this.notifications$ = new Subject<string>();
	}
}
