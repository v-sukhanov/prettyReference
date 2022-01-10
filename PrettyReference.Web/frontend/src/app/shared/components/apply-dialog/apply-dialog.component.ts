import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogRef } from '../dialog/dialog-ref.model';

@Component({
	selector: 'pref-apply-dialog',
	templateUrl: './apply-dialog.component.html',
	styleUrls: ['./apply-dialog.component.scss']
})
export class ApplyDialogComponent implements OnInit {
	@Input() public text: string;
	@Input() public applyText: string;

	@Output() public applyEvent: EventEmitter<void>;

	constructor(
		public dialogRef: DialogRef
	) {
		this.text = '';
		this.applyText = '';
		this.applyEvent = new EventEmitter<void>();
	}

	ngOnInit(): void {
	}

}
