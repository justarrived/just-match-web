import {DataStoreService} from '../../services/data-store.service';
import {EventEmitter} from '@angular/core';
import {Injectable} from '@angular/core';
import {JARoutes} from '../../routes/ja-routes/ja-routes';
import {NavigationService} from '../../services/navigation.service';
import {Resolve} from '@angular/router';
import {TransferState} from '../../transfer-state/transfer-state';
import {User} from '../../models/api-models/user/user';
import {UserProxy} from '../../proxies/user/user.proxy';
import {UserSessionProxy} from '../../proxies/user-session/user-session.proxy';

@Injectable()
export class UserResolver implements Resolve<User> {
  public static readonly includes: string = 'company,user_images,user_languages,user_languages.language,user_skills,user_skills.skill,user_documents,user_documents.document,user_interests,user_interests.interest,user_occupations,user_occupations.occupation';
  private static readonly storageActAsUserIdKey: string = 'actAsUserId';
  private static readonly storageSessionKey: string = 'sessionData';
  private static readonly userStateTransferKey: string = 'user';

  private actingAsUser: User;
  private user: User;
  private userChange: EventEmitter<User> = new EventEmitter<User>();

  public constructor(
    private dataStoreService: DataStoreService,
    private navigationService: NavigationService,
    private transferState: TransferState,
    private userProxy: UserProxy,
    private userSessionProxy: UserSessionProxy,
  ) {
  }

  public resolve(): Promise<User> {
    const session = this.dataStoreService.getCookie(UserResolver.storageSessionKey);
    this.dataStoreService.removeCookie(UserResolver.storageActAsUserIdKey);

    if (this.validateSession(session)) {

      if (this.user) {
        return Promise.resolve(this.user);
      }

      let user = this.transferState.get(UserResolver.userStateTransferKey);

      if (user) {
        this.init(user);
        return Promise.resolve(this.user);
      }

      return this.userProxy.getUser(session.user_id, {
        'include': UserResolver.includes
      })
      .then(user => {
        this.transferState.set(UserResolver.userStateTransferKey, user);
        this.init(user);
        return user;
      });
    }

    this.dataStoreService.removeCookie(UserResolver.storageSessionKey);
    this.init(null);
    return Promise.resolve(null);
  }

  private init(user: User): void {
    this.user = user;
  }

  public isAdmin(): boolean {
    return this.user && this.user.admin;
  }

  public activateGodMode(user: User): void {
    this.actingAsUser = user;
    this.dataStoreService.setCookie(UserResolver.storageActAsUserIdKey, this.actingAsUser.id);
    this.userChange.emit(this.actingAsUser);
  }

  public deactivateGodMode(): void {
    this.actingAsUser = null;
    this.dataStoreService.removeCookie(UserResolver.storageActAsUserIdKey);
    this.userChange.emit(this.user);
  }

  public godModeActive(): boolean {
    return !!this.actingAsUser;
  }

  public reloadUser(): Promise<User> {
    const session = this.dataStoreService.getCookie(UserResolver.storageSessionKey);
    const actAsUserId = this.dataStoreService.getCookie(UserResolver.storageActAsUserIdKey);

    if (this.validateSession(session)) {
      if (this.user) {
        this.user.isBeingReloaded = true;
      }
      if (this.actingAsUser) {
        this.actingAsUser.isBeingReloaded = true;
      }
      return this.userProxy.getUser(session.user_id, {
        'include': UserResolver.includes
      })
      .then(user => {
        this.transferState.set(UserResolver.userStateTransferKey, user);
        this.user = user;
        if (actAsUserId && user.admin) {
          return this.userProxy.getUser(actAsUserId, {
            'include': UserResolver.includes
          })
          .then(user => {
            this.actingAsUser = user;
            this.userChange.emit(this.actingAsUser);
            return user;
          });
        }

        this.userChange.emit(this.user);
        return user;
      });
    }

    this.logout();
    this.navigationService.navigate(JARoutes.login);
    return Promise.resolve(null);
  }

  public getUser(): User {
    return this.actingAsUser || this.user;
  }

  public setUser(user: User) {
    if (this.actingAsUser) {
      this.actingAsUser = user;
      this.userChange.emit(this.actingAsUser);
    } else {
      this.user = user;
      this.userChange.emit(this.user);
    }
  }

  public logout(): void {
    this.user = null;
    this.actingAsUser = null;
    this.dataStoreService.removeCookie(UserResolver.storageSessionKey);
    this.dataStoreService.removeCookie(UserResolver.storageActAsUserIdKey);
    this.userChange.emit(this.user);
  }

  public login(emailOrPhone: string, password: string): Promise<User> {
    this.dataStoreService.removeCookie(UserResolver.storageActAsUserIdKey);

    return this.userSessionProxy.createUserSession({
      email_or_phone: emailOrPhone,
      password: password,
    })
    .then(session => {
      this.dataStoreService.setCookie(UserResolver.storageSessionKey, session);
      return this.reloadUser();
    });
  }

  public getUserChangeEmitter(): EventEmitter<User> {
    return this.userChange;
  }

  private validateSession(session): boolean {
    return session && session.user_id && session.auth_token && session.expires_at && new Date(session.expires_at) > new Date();
  }
}
