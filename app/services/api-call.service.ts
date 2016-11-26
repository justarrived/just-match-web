import {Injectable} from "@angular/core";
import {Http, Headers, Request, RequestOptions, RequestOptionsArgs, RequestMethod, URLSearchParams} from "@angular/http";
import {LocalStorageWrapper} from "./local-storage-wrapper.service";
import * as  _ from "lodash";
import {parseJsonapiResponse, parseJsonapiErrorResponse} from "../utils/jsonapi-parser.util";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {APP_CONFIG} from "../config/config";
import {UserManager} from "../user-manager.service";
import {ActsAsUser} from "./acts-as-user.service";
import {TranslationService} from "./translation.service";

@Injectable()
export class ApiCall {
  private authorizationHeaderName: string = 'Authorization';
  private authorizationHeaderPrefix: string = 'Token token=';
  private storageAuthorizationData: string = 'authorizationData';
  private languageHeaderName: string = 'X-API-LOCALE';
  private transformHeaderName: string = 'X-API-KEY-TRANSFORM';
  private transformHeaderValue: string = 'underscore';
  private actAsUserHeaderName: string = 'X-API-ACT-AS-USER';
  private storageActAsUserIdKey: string = 'actAsUserId';

  constructor(private http: Http,
              private localStorageWrapper: LocalStorageWrapper,
              private router: Router,
              private translationService: TranslationService,
              private userManager: UserManager,
              private actsAsUser: ActsAsUser) {
  }

  public get(url: string, urlParams?: Object, contentType?: string): Promise<any> {
      return this.requestHelper({ search: this.searchParamsBuilder(urlParams), method: RequestMethod.Get, url: this.urlBuilder(url), headers: this.contentTypeHeaderBuilder(contentType) });
  }

  public post(url: string, body: any, contentType?: string): Promise<any> {
      return this.requestHelper({ body: {data: {attributes: body}}, method: RequestMethod.Post, url: this.urlBuilder(url), headers: this.contentTypeHeaderBuilder(contentType) });
  }

  public postFile(url: string, file: FormData): Promise<any> {
    return this.requestHelper({ body: file , method: RequestMethod.Post, url: this.urlBuilder(url) });
  }

  public put(url: string, body: any, contentType?: string): Promise<any> {
    return this.requestHelper({ body: {data: {attributes: body}}, method: RequestMethod.Put, url: this.urlBuilder(url), headers: this.contentTypeHeaderBuilder(contentType) });
  }

  public delete(url: string, contentType?: string): Promise<any> {
    return this.requestHelper({ body: '', method: RequestMethod.Delete, url: this.urlBuilder(url), headers: this.contentTypeHeaderBuilder(contentType) });
  }

  public patch(url: string, body: any, contentType?: string): Promise<any> {
    return this.requestHelper({ body: {data: {attributes: body}}, method: RequestMethod.Patch, url: this.urlBuilder(url), headers: this.contentTypeHeaderBuilder(contentType) });
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
    let authorizationData = this.localStorageWrapper.getObject(this.storageAuthorizationData);
    if (authorizationData != null) {
      req.headers.set(this.authorizationHeaderName, this.authorizationHeaderPrefix + authorizationData['auth_token']);
    }
    req.headers.set(this.languageHeaderName, this.translationService.getSelectedLanguageCode());
    req.headers.set(this.transformHeaderName, this.transformHeaderValue);

    const actAsUserId = this.actsAsUser.getUserId();
    if (actAsUserId != null) {
      req.headers.set(this.actAsUserHeaderName, actAsUserId);
    }

    return this.http.request(req)
      .catch(response => {
        this.handleResponseErrors(response);
        return Observable.throw(parseJsonapiErrorResponse(response));
      })
      .toPromise()
      .then(response => Promise.resolve(parseJsonapiResponse(response)));
  }

  private urlBuilder(url: string): string {
    return APP_CONFIG.API_BASE_URL + url;
  }

  private contentTypeHeaderBuilder(contentType: string = "application/vnd.api+json"): Headers {
    return new Headers({'Content-Type': contentType});
  }

  private searchParamsBuilder(urlParams: Object): URLSearchParams {
    let params: URLSearchParams = new URLSearchParams();
    _.forIn(urlParams, function(value, key) {
      params.set(key, value);
    });
    return params;
  }

  private handleResponseErrors(response) {
    if (response.status === 401) {
      var tokenExpiredObject = _.find(response.json().errors, {code: 'token_expired'});
      if (!!tokenExpiredObject) {
        this.userManager.deleteUser();
        this.router.navigate(['/login']);
      }
      this.router.navigate(['/home']);
    }
  }

}
