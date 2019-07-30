import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Provider to carry out service related operations
 *
 * @export
 * @class HttpConnectHandlerService
 */
@Injectable({
    providedIn: 'root'
})
export class HttpConnectHandlerService {

    /** @ignore */
    constructor(
        private http: HttpClient
    ) { }

    /**
     * Method to call service to fetch data
     *
     * @param {string} url URL for service call
     * @param {string} [method='GET'] Method to be called
     * @param {HttpParams} [params] Parameters for service call
     * @param {*} [options] Other HTTP options for a service call
     * @returns {Observable<any>} Observable which can be subscribed to carry out further operations
     * @memberof HttpConnectHandlerService
     */
    callWebservice(url: string, method: string = 'GET', params?: HttpParams, options?: any): Observable<any> {
        switch (method) {
            case 'GET':
                return this.http.get(url, { params, ...options });
            case 'POST':
                return this.http.post(url, { params, ...options });
            case 'PUT':
                return this.http.put(url, { params, ...options });
            case 'DELETE':
                return this.http.delete(url, { params, ...options });
            default:
                return new Observable(() => { });
        }
    }
}
