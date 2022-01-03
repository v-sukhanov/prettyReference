import { Component, OnInit } from '@angular/core';
import { ProcessService } from '../../core/services/process.service';
import { HeaderDataService } from './services/header-data.service';

@Component({
	selector: 'pref-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	public url: string;

	constructor(
		private _processService: ProcessService,
		private _dataService: HeaderDataService
	) {
		this.url = '';
	}

	ngOnInit(): void {
	}

	public addUrl(): void {
		this._dataService.addUrl({ url: this.url })
			.subscribe(() => {
				this.url = '';
				this._processService.newUrlWasAdded$.next();
			})
	}
}
