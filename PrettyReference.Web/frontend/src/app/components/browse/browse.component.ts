import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { BrowseDataService } from './services/browse-data.service';
import { combineLatest, debounceTime, EMPTY, Subject, switchMap, takeUntil, timer } from 'rxjs';
import { ProcessService } from '../../core/services/process.service';
import { ReferenceModel } from './models/reference.model';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from '../../core/services/notifications.service';
import { ApplyDialogComponent } from '../../shared/components/apply-dialog/apply-dialog.component';
import { DialogConfig } from '../../shared/components/dialog/dialog-config.model';
import { DialogService } from '../../shared/components/dialog/dialog.service';

@Component({
	selector: 'pref-browse',
	templateUrl: './browse.component.html',
	styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit, OnDestroy {

	public urlList: ReferenceModel[];
	private _unsub$: Subject<void>;
	public firstLoading: boolean;
	public groupId: string | null;

	constructor(
		private _dataService: BrowseDataService,
		private _processService: ProcessService,
		private _route: ActivatedRoute,
		private _notificationsService: NotificationsService,
		private _dialogService: DialogService
	) {
		this.groupId = null;
		this.urlList = [];
		this._unsub$ = new Subject<void>();
		this.firstLoading = true;
	}

	public ngOnInit(): void {
		this._subscribeOnUrlWasAdded();
		this._route.params
			.pipe(
				takeUntil(this._unsub$),
				switchMap((params) => {
					this.firstLoading = true;
					if (!params['groupId'] || params['groupId'] === 'all') {
						this.groupId = null;
						this._processService.currentTagHasChanged.next(this.groupId)
						return combineLatest([this._dataService.getUrlList(null), timer(1000)])
					}
					this.groupId = params['groupId'];
					this._processService.currentTagHasChanged.next(this.groupId)
					return combineLatest([this._dataService.getUrlList(params['groupId']), timer(1000)])
				})
			)
			.subscribe(([x, y]) => {
				this.urlList = x.map(v => new ReferenceModel(v));
				this.firstLoading = false;
			})
	}

	private _subscribeOnUrlWasAdded(): void {
		this._processService.referencesWasChanged$
			.pipe(
				takeUntil(this._unsub$),
				switchMap(() => {
					return this._dataService.getUrlList(this.groupId);
				})
			)
			.subscribe(x => {
				this.urlList = x.map(v => new ReferenceModel(v));
			});
	}

	public ngOnDestroy() {
		this._unsub$.next()
		this._unsub$.complete();
	}

	public deleteReference(id: string): void {
		const applyEvent = new EventEmitter();
		this._dialogService.open(ApplyDialogComponent, new DialogConfig<ApplyDialogComponent>({
			data: {
				text: 'Вы действительно хотите удалить текущую группу?',
				applyText: 'Удалить',
				applyEvent
			}
		}));
		const unsub = applyEvent.subscribe(() => {
			unsub.unsubscribe();
			this.urlList = this.urlList.filter(x => x.id !== id);
			this._dataService.deleteReference(id).subscribe(() => {
				this._notificationsService.notifications$.next('Ссылка успешно удалена');
			});
		})

	}
}
