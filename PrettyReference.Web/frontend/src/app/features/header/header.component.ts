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
	public process: boolean;

	constructor(
		private _processService: ProcessService,
		private _dataService: HeaderDataService
	) {
		this.url = '';
		this.process = false;
	}

	ngOnInit(): void {
	}

	public addUrl(): void {
		if (!this.url || this.process) {
			return ;
		}
		const url = this.url;
		this.process = true;
		this.url = '';
		this._dataService.addUrl({ url })
			.subscribe(() => {
				this._processService.newUrlWasAdded$.next();
				this.process = false;
			})
	}
}
