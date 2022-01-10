import { Component, OnDestroy, OnInit } from '@angular/core';
import { SideBarDataService } from '../../services/side-bar-data.service';
import { combineLatest, Subject, takeUntil, timer } from 'rxjs';
import { ProcessService } from '../../../../core/services/process.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from '../../../../core/services/notifications.service';

@Component({
	selector: 'pref-side-bar-add-group',
	templateUrl: './side-bar-add-group.component.html',
	styleUrls: ['./side-bar-add-group.component.scss']
})
export class SideBarAddGroupComponent implements OnInit, OnDestroy {
	public open: boolean;
	public label: string;
	public addProcess: boolean;
	public deleteProcess: boolean;
	public selectedColor: string = '#FFFF99';
	public colorPalette: Array<string>;
	public _unsub$: Subject<void>;
	public groupId: string | null;

	constructor(
		private _dataService: SideBarDataService,
		private _processService: ProcessService,
		private _router : Router,
		private _notificationsService: NotificationsService
	) {
		this.groupId = null;
		this._unsub$ = new Subject<void>();
		this.label = '';
		this.open = false;
		this.addProcess = false
		this.deleteProcess = false;
		this.colorPalette = [
			'#FFFF99',
			'#FFCC00',
			'#FF9933',
			'#FF9966',
			'#CC6666',
			'#FF3366',
			'#99CC99',
			'#CCCC33',
			'#66FF66',
			'#FF99FF',
			'#CC66CC',
			'#33FF99',
			'#9933CC',
			'#9966FF',
			'#9999FF',
			'#6666FF',
			'#33CC99',
			'#3366FF',
			'#0066CC',
			'#3399FF',
			'#66CCCC',
			'#99FFFF',
			'#66FFCC',
		];
		this.selectedColor = this.colorPalette[Math.floor(Math.random() * this.colorPalette.length)]
	}

	ngOnInit(): void {
		this._processService.currentTagHasChanged
			.pipe(
				takeUntil(this._unsub$)
			)
			.subscribe((tagId: string | null) => {
				this.groupId = tagId;
			})
	}

	public ngOnDestroy() {
		this._unsub$.next();
		this._unsub$.complete();
	}

	public addGroup(): void {
		if (!this.label || this.addProcess) {
			return;
		}
		const label = this.label;
		this.label = '';
		this.addProcess = true;
		combineLatest([this._dataService.createReferenceGroup(label, this.selectedColor), timer(500)])
			.subscribe(() => {
				this.addProcess = false;
				this._notificationsService.notifications$.next('Группа успешно создана');
				this._processService.tagsWasChanged$.next();
			});
	}

	public deleteGroup(): void {
		if (this.deleteProcess) {
			return;
		}
		this.deleteProcess = true;
		combineLatest([this._dataService.deleteReferenceGroup(this.groupId), timer(500)])
			.subscribe(() => {
				this.deleteProcess = false;
				this._processService.tagsWasChanged$.next();
				this._notificationsService.notifications$.next('Группа успешно удалена');
				this._router.navigate(['/browse/all'])
			});
	}

	public openChange(val: boolean): void {
		if (val) {
			this.selectedColor = this.colorPalette[Math.floor(Math.random() * this.colorPalette.length)]
		}
		this.open = val
	}
}
