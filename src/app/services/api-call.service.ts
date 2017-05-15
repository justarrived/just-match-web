import {ApiErrors} from '../models/api-models/api-errors/api-errors';
import {DataStoreService} from './data-store.service';
import {environment} from '../../environments/environment';
import {Headers} from '@angular/http';
import {Http} from '@angular/http';
import {Inject} from '@angular/core';
import {Injectable} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {isPlatformServer} from '@angular/common';
import {JARoutes} from '../routes/ja-routes/ja-routes';
import {NavigationService} from './navigation.service';
import {Observable} from 'rxjs';
import {parseJsonapiResponse} from '../utils/jsonapi-parser/jsonapi-parser.util';
import {PLATFORM_ID} from '@angular/core';
import {Request} from '@angular/http';
import {RequestMethod} from '@angular/http';
import {RequestOptions} from '@angular/http';
import {RequestOptionsArgs} from '@angular/http';
import {Response} from '@angular/http';
import {TransferState} from '../transfer-state/transfer-state';
import {URLSearchParams} from '@angular/http';
import * as  _ from 'lodash';

@Injectable()
export class ApiCallService {
  private readonly actAsUserHeaderName: string = 'X-API-ACT-AS-USER';
  private readonly languageHeaderName: string = 'X-API-LOCALE';
  private readonly sessionHeaderName: string = 'Authorization';
  private readonly sessionHeaderPrefix: string = 'Token token=';
  private readonly storageActAsUserIdKey: string = 'actAsUserId'; // MUST be same as key in user resolver
  private readonly storageSessionKey: string = 'sessionData'; // MUST be same as key in user resolver
  private readonly storageSystemLanguageCodeKey: string = 'systemLanguageCode'; // MUST be same as key in system languages resolver
  private readonly transformHeaderName: string = 'X-API-KEY-TRANSFORM';
  private readonly transformHeaderValue: string = 'underscore';

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: any,
    private dataStoreService: DataStoreService,
    private http: Http,
    private navigationService: NavigationService,
    private transferState: TransferState,
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
    let session = this.dataStoreService.getCookie(this.storageSessionKey);
    if (session && session.auth_token) {
      req.headers.set(this.sessionHeaderName, this.sessionHeaderPrefix + session['auth_token']);
    }

    req.headers.set(this.languageHeaderName, this.dataStoreService.getCookie(this.storageSystemLanguageCodeKey));
    req.headers.set(this.transformHeaderName, this.transformHeaderValue);

    const actAsUserId = this.dataStoreService.getCookie(this.storageActAsUserIdKey);
    if (actAsUserId !== null) {
      req.headers.set(this.actAsUserHeaderName, actAsUserId);
    }

    let transferStateKey = null;

    try {
     transferStateKey = JSON.stringify(req);

      if (isPlatformBrowser(this.platformId)) {
        const transferedResponse = this.transferState.get(transferStateKey);
        if (transferedResponse) {
          this.transferState.set(transferStateKey, null);
          return Promise.resolve(transferedResponse);
        }
      }
    } catch (err) {}

    return this.http.request(req)
      .toPromise()
      .then(response => {
        response = parseJsonapiResponse(response);
        if (transferStateKey && isPlatformServer(this.platformId)) {
          this.transferState.set(transferStateKey, response);
        }
        return response;
      })
      .catch((response: Response) => this.handleResponseErrors(response));
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

  private handleResponseErrors(response): void {
    if (response.status === 0) {
      this.navigationService.navigateNoLocationChange(JARoutes.lostConnection);
      throw 'handled';
    }

    if (response.status === 400 || response.status >= 500) {
      this.navigationService.navigateNoLocationChange(JARoutes.error, response.status);
      throw 'handled';
    }

    if (response.status === 401) {
      this.dataStoreService.removeCookie(this.storageSessionKey);
      this.navigationService.navigate(JARoutes.login);
      throw 'handled';
    }

    if (response.status === 403) {
      this.navigationService.navigateNoLocationChange(JARoutes.forbidden);
      throw 'handled';
    }

    if (response.status === 404) {
      this.navigationService.navigateNoLocationChange(JARoutes.notFound);
      throw 'handled';
    }

    throw new ApiErrors(response.json().errors);
  }
}
