import {Injectable} from '@angular/core';
import {Http, Headers, Request, RequestOptions, RequestOptionsArgs, RequestMethod, Response, URLSearchParams} from '@angular/http';
import { LocalStorageWrapper } from './local-storage-wrapper.service';
import 'rxjs/add/operator/toPromise';
import * as  _ from 'lodash';
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable()
export class ApiCall {
  private authorizationHeaderName: string = 'Authorization';
  private authorizationHeaderPrefix: string = 'Token token=';
  private storageAuthorizationData: string = 'authorizationData';
  private serverRestPoint: string = 'https://just-match-api-sandbox.herokuapp.com/api/v1/'; //TODO: Take from config file;

  constructor(private http: Http, private localStorageWrapper: LocalStorageWrapper, private router: Router) {
  }

  public get(url: string, urlParams?: Object, contentType?: string): Promise<Response> {
      return this.requestHelper({ search: this.searchParamsBuilder(urlParams), method: RequestMethod.Get, url: this.urlBuilder(url), headers: this.contentTypeHeaderBuilder(contentType) });
  }

  public post(url: string, body: any, contentType?: string): Promise<Response> {
      return this.requestHelper({ body: body, method: RequestMethod.Post, url: this.urlBuilder(url), headers: this.contentTypeHeaderBuilder(contentType) });
  }

  public put(url: string, body: any, contentType?: string): Promise<Response> {
    return this.requestHelper({ body: body, method: RequestMethod.Put, url: this.urlBuilder(url), headers: this.contentTypeHeaderBuilder(contentType) });
  }

  public delete(url: string, contentType?: string): Promise<Response> {
    return this.requestHelper({ body: '', method: RequestMethod.Delete, url: this.urlBuilder(url), headers: this.contentTypeHeaderBuilder(contentType) });
  }

  public patch(url: string, body: any, contentType?: string): Promise<Response> {
    return this.requestHelper({ body: body, method: RequestMethod.Patch, url: this.urlBuilder(url), headers: this.contentTypeHeaderBuilder(contentType) });
  }

  public head(url: string, contentType?: string): Promise<Response> {
    return this.requestHelper({ body: '', method: RequestMethod.Head, url: this.urlBuilder(url), headers: this.contentTypeHeaderBuilder(contentType) });
  }

  public options(url: string, contentType?: string): Promise<Response> {
    return this.requestHelper({ body: '', method: RequestMethod.Options, url: this.urlBuilder(url), headers: this.contentTypeHeaderBuilder(contentType) });
  }

  private requestHelper(requestArgs: RequestOptionsArgs): Promise<Response> {
    let options = new RequestOptions(requestArgs);

    let req: Request = new Request(options);
    let authorizationData = this.localStorageWrapper.getObject(this.storageAuthorizationData);
    if (authorizationData) {
      req.headers.set(this.authorizationHeaderName, this.authorizationHeaderPrefix + authorizationData['auth-token']);
    }
    return this.http.request(req).catch(res => {
      this.handleResponseErrors(res);
      return Observable.throw(res);
    }).toPromise();
  }

  private urlBuilder(url: string): string {
    return this.serverRestPoint + url;
  }

  private contentTypeHeaderBuilder(contentType: string = "application/json"): Headers {
    var headers = new Headers();
    headers.append('Content-Type', contentType);
    return headers;
  }

  private searchParamsBuilder(urlParams: Object): URLSearchParams {
    let params: URLSearchParams = new URLSearchParams();
    _.forIn(urlParams, function(value, key) {
      params.set(key, value);
    });
    return params;
  }

  private handleResponseErrors(response) {
    //TODO: Implement logic when: https://github.com/justarrived/just_match_api/issues/586 is ready
    if (response.status === 422) {
      this.router.navigate(['/tasks']);
    }
  }

}
