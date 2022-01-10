import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/services/http.service';
import { Observable } from 'rxjs';
import { IGroup } from '../interfaces/group.interface';


@Injectable()
export class SideBarDataService {
	constructor(private _httpService: HttpService) {
	}

	public getReferenceGroupList(): Observable<IGroup[]> {
		return this._httpService.get('references/GetReferenceGroupList');
	}

	public createReferenceGroup(label: string, color: string): Observable<void> {
		return this._httpService.post('references/CreateReferenceGroup', {label, color})
	}

	public deleteReferenceGroup(id: string | null): Observable<void> {
		return this._httpService.delete('references/DeleteReferenceGroup', {id})
	}
}
