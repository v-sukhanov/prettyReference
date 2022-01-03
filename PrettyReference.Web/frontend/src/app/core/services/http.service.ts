import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export class ApiError {
    public messages: string[];

    constructor(init?: Partial<ApiError>) {
        this.messages = [];
        Object.assign(this, init);
    }
}


export class ApiResponse<TResponse> {
    public data?: TResponse;
    public error?: ApiError;

    constructor(init: Partial<ApiResponse<TResponse>>) {
        Object.assign(this, init);
    }
}


export type HttpParamsRequestType<TRequest> = {
    [Property in keyof TRequest]: string | boolean | number | Date | null
};

@Injectable()
export class HttpService {

    constructor(private _httpClient: HttpClient) {
    }


    public get<TResponse, TRequest = null>(url: string, model?: HttpParamsRequestType<TRequest>): Observable<TResponse> {
        let request: Observable<TResponse>;
        request = this._httpClient.get<TResponse>(
            `${environment.api}${url}`,
            {
                headers: this._commonHeaders(),
                params: this._getParams<TRequest>(model)
            });
        return this._handleStandartRequest(request);
    }

    public post<TResponse, TRequest = null>(url: string, model?: TRequest): Observable<TResponse> {
        const request = this._httpClient.post<TResponse>(
            `${environment.api}${url}`, model,
            {
                headers: this._commonHeaders()
            });

        return this._handleStandartRequest(request);
    }

    public put<TResponse, TRequest = null>(url: string, model: TRequest | null = null): Observable<TResponse> {
        const request = this._httpClient.put<TResponse>(
            `${environment.api}${url}`, model,
            {
                headers: this._commonHeaders()
            });

        return this._handleStandartRequest(request);
    }

    public delete<TResponse, TRequest = null>(url: string, model?: TRequest): Observable<TResponse> {
        const request = this._httpClient.delete<TResponse>(
            `${environment.api}${url}`,
            {
                headers: this._commonHeaders(),
                params: this._getParams(model)
            });

        return this._handleStandartRequest(request);
    }

    private _commonHeaders(): HttpHeaders {
        const headers = new HttpHeaders()
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Origin', '*')
            .append('Content-Type', 'application/json')
            .append('Cache-control', 'no-cache')
            .append('Cache-control', 'no-store')
            .append('Expires', '0')
            .append('Pragma', 'no-cache');

        return headers;
    }

    private _getParams<TRequest>(source?: HttpParamsRequestType<TRequest>): HttpParams {
        let params = new HttpParams();
        if (source == null) { return params; }

        Object.keys(source).forEach((key: string) => {
            const value = source[key as keyof TRequest];
            if (value instanceof Date) {
                params = params.append(key, value.toISOString());
            } else if (value instanceof Array) {
                for (let i = 0; i < value.length; i++) {
                    params = params.append(`${key}[${i}]`, value[i]);
                }
            } else {
                if (value !== undefined && value !== null) {
                    params = params.append(key, value.toString());
                }
            }
        });
        return params;
    }

    private _handleStandartRequest<TResponse>(source: Observable<TResponse>): Observable<TResponse> {
        return source.pipe(
            map(resp => {
                const temp = new ApiResponse<TResponse>(resp);
                if (temp.error) {
                    throw new ApiError(temp.error);
                }
                if (temp.data !== undefined) {
                    return temp.data;
                }
                return resp;
            }));
    }
}
