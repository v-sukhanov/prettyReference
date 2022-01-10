import { Component, OnDestroy, OnInit } from '@angular/core';
import { SideBarDataService } from './services/side-bar-data.service';
import { IGroup } from './interfaces/group.interface';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { ProcessService } from '../../core/services/process.service';

@Component({
	selector: 'pref-side-bar',
	templateUrl: './side-bar.component.html',
	styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, OnDestroy {
	public tags: IGroup[];
	private _unsub$: Subject<void>;

	constructor(
		private _dataService: SideBarDataService,
		private _processService: ProcessService

	) {
		this.tags = [];
		this._unsub$ = new Subject<void>();
	}

	ngOnInit(): void {
		this._dataService.getReferenceGroupList().subscribe(x => {
			this.tags = x;
		});
		this._processService.tagsWasChanged$
			.pipe(
				takeUntil(this._unsub$),
				switchMap(() => {
					return this._dataService.getReferenceGroupList();
				})
			)
			.subscribe(x => {
				this.tags = x;
			});

	}

	public ngOnDestroy() {
		this._unsub$.next();
		this._unsub$.complete();
	}

}
