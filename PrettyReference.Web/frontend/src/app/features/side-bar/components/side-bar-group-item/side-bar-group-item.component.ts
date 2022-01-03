import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'pref-side-bar-group-item',
	templateUrl: './side-bar-group-item.component.html',
	styleUrls: ['./side-bar-group-item.component.scss']
})
export class SideBarGroupItemComponent implements OnInit {
	@Input() public label: string;
	@Input() public color: string;

	constructor() {
		this.label = '';
		this.color = '';
	}

	ngOnInit(): void {
	}

}
