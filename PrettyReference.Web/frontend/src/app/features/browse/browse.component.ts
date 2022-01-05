import { Component, OnDestroy, OnInit } from '@angular/core';
import { BrowseDataService } from './services/browse-data.service';
import { IReference } from './interfaces/requests/get-url-list/url-list.interface';
import { combineLatest, debounceTime, Subject, switchMap, takeUntil, timer } from 'rxjs';
import { ProcessService } from '../../core/services/process.service';

@Component({
	selector: 'pref-browse',
	templateUrl: './browse.component.html',
	styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit, OnDestroy {

	public urlList: IReference[];
	private _unsub$: Subject<void>;
	public firstLoading: boolean;

	constructor(
		private _dataService: BrowseDataService,
		private _processService: ProcessService
	) {
		this.urlList = [];
		this._unsub$ = new Subject<void>();
		this.firstLoading = true;
	}

	public ngOnInit(): void {
		this._subscribeOnUrlWasAdded();
		combineLatest([this._dataService.getUrlList(), timer(1000)])
			.subscribe(([x, y]) => {
				this.urlList = x;
				this.firstLoading = false;
			})
	}

	private _subscribeOnUrlWasAdded(): void {
		this._processService.newUrlWasAdded$
			.pipe(
				takeUntil(this._unsub$),
				switchMap(() => {
					return this._dataService.getUrlList();
				})
			)
			.subscribe(x => {
				this.urlList = x;
			});
	}

	public ngOnDestroy() {
		this._unsub$.next()
		this._unsub$.complete();
	}

	public deleteReference(id: string): void {
		this.urlList = this.urlList.filter(x => x.id !== id);
		this._dataService.deleteReference(id).subscribe();
	}
}
