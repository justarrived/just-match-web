import {ActsAsUserService} from './acts-as-user.service';
import {ApiErrors} from '../models/api-models/api-errors/api-errors';
import {DataStoreService} from './data-store.service';
import {environment} from '../../environments/environment';
import {Headers} from '@angular/http';
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {JARoutes} from '../routes/ja-routes/ja-routes';
import {NavigationService} from './navigation.service';
import {Observable} from 'rxjs';
import {parseJsonapiResponse} from '../utils/jsonapi-parser/jsonapi-parser.util';
import {Request} from '@angular/http';
import {RequestMethod} from '@angular/http';
import {RequestOptions} from '@angular/http';
import {RequestOptionsArgs} from '@angular/http';
import {Response} from '@angular/http';
import {URLSearchParams} from '@angular/http';
import * as  _ from 'lodash';

@Injectable()
export class ApiCallService {
  private readonly actAsUserHeaderName: string = 'X-API-ACT-AS-USER';
  private readonly sessionHeaderName: string = 'Authorization';
  private readonly sessionHeaderPrefix: string = 'Token token=';
  private readonly languageHeaderName: string = 'X-API-LOCALE';
  private readonly storageSessionKey: string = 'sessionData'; // MUST be same as key in user resolver
  private readonly storageSystemLanguageCodeKey: string = 'systemLanguageCode'; // MUST be same as key in system languages resolver
  private readonly transformHeaderName: string = 'X-API-KEY-TRANSFORM';
  private readonly transformHeaderValue: string = 'underscore';

  constructor(
    private http: Http,
    private dataStoreService: DataStoreService,
    private actsAsUserService: ActsAsUserService,
    private navigationService: NavigationService
  ) {
  }

  public get(url: string, searchParameters: any = {}, body: any = {}, contentType?: string): Promise<any> {
    return this.requestHelper({
      body: body,
      headers: this.contentTypeHeaderBuilder(contentType),
      method: RequestMethod.Get,
      search: this.searchParametersBuilder(searchParameters),
      url: this.urlBuilder(url),
    });
  }

  public post(url: string, attributes: any = {}, searchParameters: any = {}, body: any = {}, contentType?: string): Promise<any> {
    if (body.data) {
      body.data.attributes = attributes;
    } else {
      body.data = {
        attributes: attributes
      }
    }
    return this.requestHelper({
      body: body,
      headers: this.contentTypeHeaderBuilder(contentType),
      method: RequestMethod.Post,
      search: this.searchParametersBuilder(searchParameters),
      url: this.urlBuilder(url),
    });
  }

  public patch(url: string, attributes: any = {}, searchParameters: any = {}, body: any = {}, contentType?: string): Promise<any> {
    if (body.data) {
      body.data.attributes = attributes;
    } else {
      body.data = {
        attributes: attributes
      }
    }
    return this.requestHelper({
      body: body,
      headers: this.contentTypeHeaderBuilder(contentType),
      method: RequestMethod.Patch,
      search: this.searchParametersBuilder(searchParameters),
      url: this.urlBuilder(url),
    });
  }

  public delete(url: string, contentType?: string): Promise<any> {
    return this.requestHelper({
      body: '',
      headers: this.contentTypeHeaderBuilder(contentType),
      method: RequestMethod.Delete,
      url: this.urlBuilder(url),
    });
  }

  private requestHelper(requestArgs: RequestOptionsArgs): Promise<any> {
    let options = new RequestOptions(requestArgs);

    let req: Request = new Request(options);
    let session = this.dataStoreService.get(this.storageSessionKey);
    if (session && session.auth_token) {
      req.headers.set(this.sessionHeaderName, this.sessionHeaderPrefix + session['auth_token']);
    }

    req.headers.set(this.languageHeaderName, this.dataStoreService.get(this.storageSystemLanguageCodeKey));
    req.headers.set(this.transformHeaderName, this.transformHeaderValue);

    const actAsUserId = this.actsAsUserService.getUserId();
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

  private searchParametersBuilder(searchParameters: any): URLSearchParams {
    let params: URLSearchParams = new URLSearchParams();
    _.forIn(searchParameters, function(value, key) {
      params.set(key, value);
    });
    return params;
  }

  // TODO: Add typing.. currently returns ErrorObservable<ApiErrors> (though I can't seem to import that symbol from rxjs...)
  private handleResponseErrors(response) {
    if (response.status === 401) {
      this.dataStoreService.remove(this.storageSessionKey);
      this.navigationService.navigate(JARoutes.login);
    }

    if (response.status === 0 || response.status === 400 || response.status >= 500) {
      this.navigationService.navigateNoLocationChange(JARoutes.error, response.status);
    }

    if (response.status === 403) {
      this.navigationService.navigateNoLocationChange(JARoutes.forbidden);
    }

    if (response.status === 404) {
      this.navigationService.navigateNoLocationChange(JARoutes.notFound);
    }

    return Observable.throw(new ApiErrors(response.json().errors));
  }

}
