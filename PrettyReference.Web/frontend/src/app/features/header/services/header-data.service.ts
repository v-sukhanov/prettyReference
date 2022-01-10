import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/services/http.service';
import { IAddUrlRequest } from '../interfaces/requests/add-url/add-url.request';
import { Observable } from 'rxjs';
import { IReference } from '../../browse/interfaces/requests/get-url-list/reference.interface';


@Injectable()
export class HeaderDataService {
	constructor(private _httpService: HttpService) {
	}

	public addUrl(request: IAddUrlRequest): Observable<IReference> {
		return this._httpService.post('references/SaveReference', { url: request.url, tagId: request.tagId });
	}
}
