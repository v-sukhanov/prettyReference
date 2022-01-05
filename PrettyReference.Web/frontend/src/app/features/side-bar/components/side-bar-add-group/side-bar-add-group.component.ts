import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'pref-side-bar-add-group',
	templateUrl: './side-bar-add-group.component.html',
	styleUrls: ['./side-bar-add-group.component.scss']
})
export class SideBarAddGroupComponent implements OnInit {

    public open: boolean;

	constructor() {
		this.open = false;
	}

	ngOnInit(): void {
	}

}
