import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment/moment';
import { NotificationsService } from './core/services/notifications.service';
import { Subject, takeUntil } from 'rxjs';
import { ProcessService } from './core/services/process.service';

@Component({
	selector: 'pref-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
	public groupBarOpen: boolean;
	private _unsub$: Subject<void>;

	constructor(
		public _processService: ProcessService
	) {
		moment.locale('ru');
		this.groupBarOpen = false;
		this._unsub$ = new Subject();
	}

	public ngOnInit() {
		this._processService.groupBarActionOpen$
			.pipe(
				takeUntil(this._unsub$)
			)
			.subscribe(x => {
				this.groupBarOpen = x;
			})
	}

	public ngOnDestroy() {
		this._unsub$.next();
		this._unsub$.complete();
	}
}
