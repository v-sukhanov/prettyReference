import { Component, Input, OnInit } from '@angular/core';
import { IGroup } from '../../interfaces/group.interface';

@Component({
	selector: 'pref-side-bar-group-item',
	templateUrl: './side-bar-group-item.component.html',
	styleUrls: ['./side-bar-group-item.component.scss']
})
export class SideBarGroupItemComponent implements OnInit {
	@Input() public group?: IGroup;
	@Input() public color: number;

	constructor() {
		this.color = 0;
	}

	ngOnInit(): void {
	}

}
