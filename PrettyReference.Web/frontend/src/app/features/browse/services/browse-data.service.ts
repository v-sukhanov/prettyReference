import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/services/http.service';
import { Observable } from 'rxjs';
import { IGetUrlListResponse } from '../interfaces/requests/get-url-list/get-url-list.response';
import { IReference } from '../interfaces/requests/get-url-list/url-list.interface';
import { IAddUrlRequest } from '../../header/interfaces/requests/add-url/add-url.request';


@Injectable()
export class BrowseDataService {
	constructor(private _httpService: HttpService) {
	}

	public getUrlList(): Observable<IReference[]> {
		return this._httpService.get('references/GetReferenceList');
	}

	public deleteReference(id: string): Observable<void> {
		return this._httpService.delete('references/deleteReference', {id});
	}

}
