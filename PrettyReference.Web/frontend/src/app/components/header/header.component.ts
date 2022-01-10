import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProcessService } from '../../core/services/process.service';
import { HeaderDataService } from './services/header-data.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { NotificationsService } from '../../core/services/notifications.service';

@Component({
	selector: 'pref-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
	public url: string;
	public process: boolean;
	private _unsub$: Subject<void>;
	private _tagId: string | null;

	constructor(
		private _processService: ProcessService,
		private _dataService: HeaderDataService,
		private _route: ActivatedRoute,
		private _notificationsService: NotificationsService
	) {
		this._tagId = null;
		this.url = '';
		this.process = false;
		this._unsub$ = new Subject<void>();
	}

	ngOnInit(): void {
		this._processService.currentTagHasChanged
			.pipe(
				takeUntil(this._unsub$),
			)
			.subscribe(tagId => {
				this._tagId = tagId;
			})
	}

	public ngOnDestroy() {
		this._unsub$.next();
		this._unsub$.complete();
	}

	public addUrl(): void {
		if (!this.url || this.process) {
			return ;
		}
		const url = this.url;
		this.process = true;
		this.url = '';
		this._dataService.addUrl({ url, tagId: this._tagId })
			.subscribe(() => {
				this._processService.referencesWasChanged$.next();
				this.process = false;
				this._notificationsService.notifications$.next('Ссылка успешно добавлена');
			})
	}
}
