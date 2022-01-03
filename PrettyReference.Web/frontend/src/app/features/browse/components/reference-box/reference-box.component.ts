import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IReference } from '../../interfaces/requests/get-url-list/url-list.interface';
import { BrowseDataService } from '../../services/browse-data.service';

@Component({
	selector: 'pref-reference-box',
	templateUrl: './reference-box.component.html',
	styleUrls: ['./reference-box.component.scss']
})
export class ReferenceBoxComponent implements OnInit {

	@Input() public reference: IReference | null;


	@Output() public deleteReferenceEvent: EventEmitter<string>;

	constructor(
		private _dataService: BrowseDataService
	) {
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
}
