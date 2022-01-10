import { Component, OnDestroy, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Subject, switchMap, takeUntil, timer } from 'rxjs';
import { NotificationsService } from '../../core/services/notifications.service';

@Component({
	selector: 'pref-notifications-bar',
	templateUrl: './notifications-bar.component.html',
	styleUrls: ['./notifications-bar.component.scss'],
	animations: [
		trigger('notif', [
			transition('void => *', [
				style({
					transform: 'translateY(20px)',
					opacity: '0'
				}),
				animate('250ms ease-out', style({
					transform: '*',
					opacity: '1'
				}))
			]),
			transition('* => void', [
				style({
					transform: '*',
					opacity: '1'
				}),
				animate('250ms ease-out', style({
					transform: 'translateY(20px)',
					opacity: '0'
				}))
			]),
		])
	]
})
export class NotificationsBarComponent implements OnInit, OnDestroy {

	private _unsub$: Subject<void>;
	public notification: string;

	constructor(
		private _notificationsService: NotificationsService
	) {
		this.notification = '';
		this._unsub$ = new Subject();
	}

	ngOnInit(): void {
		this._notificationsService.notifications$
			.pipe(
				takeUntil(this._unsub$),
				switchMap((notifications) => {
					this.notification = notifications;
					return timer(2000)
				})
			)
			.subscribe(() => {
				this.notification = '';
			})
	}

	public ngOnDestroy() {
		this._unsub$.next();
		this._unsub$.complete();
	}

}
