import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable()
export class ProcessService {
	public referencesWasChanged$: Subject<void>;
	public tagsWasChanged$: Subject<void>;
	public currentTagHasChanged: Subject<string | null>;

	constructor() {
		this.referencesWasChanged$ = new Subject<void>();
		this.tagsWasChanged$ = new Subject();
		this.currentTagHasChanged = new Subject<string | null>();
	}
}
