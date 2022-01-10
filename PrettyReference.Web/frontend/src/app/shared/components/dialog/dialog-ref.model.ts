import { Observable, Subject } from 'rxjs';

export class DialogRef {
	private _afterClosed: Subject<void>;
	public afterClosed$: Observable<void>;


	constructor() {
		this._afterClosed = new Subject<void>();
		this.afterClosed$ = this._afterClosed.asObservable();
	}

	close() {
		this._afterClosed.next();
		this._afterClosed.complete();
	}

}
