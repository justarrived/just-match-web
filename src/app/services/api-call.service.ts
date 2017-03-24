import {Injectable} from '@angular/core';
import {
  Http,
  Headers,
  Request,
  RequestOptions,
  RequestOptionsArgs,
  RequestMethod,
  URLSearchParams,
  Response
} from '@angular/http';
import {DataStore} from './data-store.service';
import * as  _ from 'lodash';
import {parseJsonapiResponse} from '../utils/jsonapi-parser.util';
import {ApiErrors} from '../models/api-models/api-errors/api-errors';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {ActsAsUser} from './acts-as-user.service';
import {NavigationService} from './navigation.service';
import {JARoutes} from '../routes/ja-routes';

@Injectable()
export class ApiCall {
  private readonly actAsUserHeaderName: string = 'X-API-ACT-AS-USER';
  private readonly authorizationHeaderName: string = 'Authorization';
  private readonly authorizationHeaderPrefix: string = 'Token token=';
  private readonly languageHeaderName: string = 'X-API-LOCALE';
  private readonly storageSessionKey: string = 'sessionData'; // MUST be same as key in user resolver
  private readonly storageSystemLanguageCodeKey: string = 'systemLanguageCode'; // MUST be same as key in system languages resolver
  private readonly transformHeaderName: string = 'X-API-KEY-TRANSFORM';
  private readonly transformHeaderValue: string = 'underscore';

  constructor(
    private http: Http,
    private dataStore: DataStore,
    private actsAsUser: ActsAsUser,
    private navigationService: NavigationService
  ) {
  }

  public get(url: string, urlParams?: Object, contentType?: string): Promise<any> {
    return this.requestHelper({ search: this.searchParamsBuilder(urlParams), method: RequestMethod.Get, url: this.urlBuilder(url), headers: this.contentTypeHeaderBuilder(contentType) });
  }

  public post(url: string, body: any, contentType?: string): Promise<any> {
    return this.requestHelper({ body: { data: { attributes: body } }, method: RequestMethod.Post, url: this.urlBuilder(url), headers: this.contentTypeHeaderBuilder(contentType) });
  }

  public put(url: string, body: any, contentType?: string): Promise<any> {
    return this.requestHelper({ body: { data: { attributes: body } }, method: RequestMethod.Put, url: this.urlBuilder(url), headers: this.contentTypeHeaderBuilder(contentType) });
  }

  public delete(url: string, contentType?: string): Promise<any> {
    return this.requestHelper({ body: '', method: RequestMethod.Delete, url: this.urlBuilder(url), headers: this.contentTypeHeaderBuilder(contentType) });
  }

  public patch(url: string, body: any, contentType?: string): Promise<any> {
    return this.requestHelper({ body: { data: { attributes: body } }, method: RequestMethod.Patch, url: this.urlBuilder(url), headers: this.contentTypeHeaderBuilder(contentType) });
  }

  public head(url: string, contentType?: string): Promise<any> {
    return this.requestHelper({ body: '', method: RequestMethod.Head, url: this.urlBuilder(url), headers: this.contentTypeHeaderBuilder(contentType) });
  }

  public options(url: string, contentType?: string): Promise<any> {
    return this.requestHelper({ body: '', method: RequestMethod.Options, url: this.urlBuilder(url), headers: this.contentTypeHeaderBuilder(contentType) });
  }

  private requestHelper(requestArgs: RequestOptionsArgs): Promise<any> {
    let options = new RequestOptions(requestArgs);

    let req: Request = new Request(options);
    let session = this.dataStore.get(this.storageSessionKey);
    if (session && session.auth_token) {
      req.headers.set(this.authorizationHeaderName, this.authorizationHeaderPrefix + session['auth_token']);
    }

    req.headers.set(this.languageHeaderName, this.dataStore.get(this.storageSystemLanguageCodeKey));
    req.headers.set(this.transformHeaderName, this.transformHeaderValue);

    const actAsUserId = this.actsAsUser.getUserId();
    if (actAsUserId !== null) {
      req.headers.set(this.actAsUserHeaderName, actAsUserId);
    }

    return this.http.request(req)
      .catch((response: Response) => this.handleResponseErrors(response))
      .toPromise()
      .then(response => parseJsonapiResponse(response));
  }

  private urlBuilder(url: string): string {
    return environment.apiBaseUrl + url;
  }

  private contentTypeHeaderBuilder(contentType: string = 'application/vnd.api+json'): Headers {
    return new Headers({ 'Content-Type': contentType });
  }

  private searchParamsBuilder(urlParams: Object): URLSearchParams {
    let params: URLSearchParams = new URLSearchParams();
    _.forIn(urlParams, function(value, key) {
      params.set(key, value);
    });
    return params;
  }

  // TODO: Add typing.. currently returns ErrorObservable<ApiErrors> (though I can't seem to import that symbol from rxjs...)
  private handleResponseErrors(response) {
    if (response.status === 401) {
      let tokenExpiredObject = _.find(response.json().errors, { code: 'token_expired' });
      let tokenInvalidObject = _.find(response.json().errors, { code: 'login_required' });
      if (tokenExpiredObject || tokenInvalidObject) {
        this.dataStore.remove(this.storageSessionKey);
        this.navigationService.navigate(JARoutes.login);
      }
    }

    if (response.status === 0 || response.status === 400 || response.status >= 500) {
      this.navigationService.navigateNoLocationChange(JARoutes.error, response.status);
    }

    return Observable.throw(new ApiErrors(response.json().errors));
  }

}
