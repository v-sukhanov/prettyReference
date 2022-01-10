import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IReference } from '../../interfaces/requests/get-url-list/reference.interface';
import { BrowseDataService } from '../../services/browse-data.service';
import { ReferenceModel } from '../../models/reference.model';
import { NotificationsService } from '../../../../core/services/notifications.service';

@Component({
	selector: 'pref-reference-box',
	templateUrl: './reference-box.component.html',
	styleUrls: ['./reference-box.component.scss']
})
export class ReferenceBoxComponent implements OnInit {

	@Input() public reference: ReferenceModel | null;
	@Input() public groupId: string | null;

	@Output() public deleteReferenceEvent: EventEmitter<string>;

	constructor(
		private _dataService: BrowseDataService,
		private _notificationsService: NotificationsService
	) {
		this.groupId = null;
		this.reference = null;
		this.deleteReferenceEvent = new EventEmitter<string>();
	}

	ngOnInit(): void {
	}

	public deleteReference() {
		if (!this.reference) {
			return ;
		}
		this.deleteReferenceEvent.emit(this.reference.id);
	}

	public copy() {
		navigator.clipboard.writeText(this.reference?.url ?? '').then(() => {
			this._notificationsService.notifications$.next('Ссылка скопирована');
		});
	}
}
