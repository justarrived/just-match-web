import {DataStoreService} from '../../services/data-store.service';
import {EventEmitter} from '@angular/core';
import {Injectable} from '@angular/core';
import {JARoutes} from '../../routes/ja-routes/ja-routes';
import {NavigationService} from '../../services/navigation.service';
import {Resolve} from '@angular/router';
import {User} from '../../models/api-models/user/user';
import {UserProxy} from '../../proxies/user/user.proxy';
import {UserSessionProxy} from '../../proxies/user-session/user-session.proxy';

@Injectable()
export class UserResolver implements Resolve<User> {
  private readonly storageActAsUserIdKey: string = 'actAsUserId';
  private readonly storageSessionKey: string = 'sessionData';
  private readonly defaultIncludeResources: String[] = [
    'company', 'user_images', 'user_languages', 'user_languages.language',
    'user_skills', 'user_skills.skill', 'user_documents', 'user_documents.document',
    'user_interests', 'user_interests.interest'
  ];
  public readonly defaultIncludeResourcesString: String = this.defaultIncludeResources.join(',');

  private actingAsUser: User;
  private user: User;
  private userChange: EventEmitter<User> = new EventEmitter<User>();

  public constructor(
    private dataStoreService: DataStoreService,
    private navigationService: NavigationService,
    private userSessionProxy: UserSessionProxy,
    private userProxy: UserProxy,
  ) {
  }

  public resolve(): Promise<User> {
    const session = this.dataStoreService.get(this.storageSessionKey);
    this.dataStoreService.remove(this.storageActAsUserIdKey);

    if (this.validateSession(session)) {

      if (this.user) {
        return Promise.resolve(this.user);
      }

      return this.userProxy.getUser(session.user_id, {
        'include': this.defaultIncludeResourcesString
      })
      .then(user => {
        this.init(user);
        return user;
      });
    }

    this.dataStoreService.remove(this.storageSessionKey);
    this.init(null);
    return Promise.resolve(null);
  }

  private init(user: User): void {
    this.user = user;
  }

  public activateGodMode(user: User): void {
    this.actingAsUser = user;
    this.dataStoreService.set(this.storageActAsUserIdKey, this.actingAsUser.id);
    this.userChange.emit(this.actingAsUser);
  }

  public deactiveGodMode(): void {
    this.actingAsUser = null;
    this.dataStoreService.remove(this.storageActAsUserIdKey);
    this.userChange.emit(this.user);
  }

  public reloadUser(): Promise<User> {
    const session = this.dataStoreService.get(this.storageSessionKey);
    const actAsUserId = this.dataStoreService.get(this.storageActAsUserIdKey);

    if (this.validateSession(session)) {
      if (this.user) {
        this.user.isBeingReloaded = true;
      }
      if (this.actingAsUser) {
        this.actingAsUser.isBeingReloaded = true;
      }
      return this.userProxy.getUser(session.user_id, {
        'include': this.defaultIncludeResourcesString
      })
      .then(user => {
        this.user = user;
        if (actAsUserId && user.admin) {
          return this.userProxy.getUser(actAsUserId, {
            'include': this.defaultIncludeResourcesString
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
    this.dataStoreService.remove(this.storageSessionKey);
    this.dataStoreService.remove(this.storageActAsUserIdKey);
    this.userChange.emit(this.user);
  }

  public login(emailOrPhone: string, password: string): Promise<User> {
    this.dataStoreService.remove(this.storageActAsUserIdKey);

    return this.userSessionProxy.createUserSession({
      'email_or_phone': emailOrPhone,
      'password': password,
    })
    .then(session => {
      this.dataStoreService.set(this.storageSessionKey, session);
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
