import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable()
export class ProcessService {
	public newUrlWasAdded$: Subject<void>;

	constructor() {
		this.newUrlWasAdded$ = new Subject<void>();
	}
}
