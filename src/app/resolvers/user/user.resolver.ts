import {DataStore} from '../../services/data-store.service';
import {EventEmitter} from '@angular/core';
import {Injectable} from '@angular/core';
import {JARoutes} from '../../routes/ja-routes';
import {NavigationService} from '../../services/navigation.service';
import {Resolve} from '@angular/router';
import {User} from '../../models/user';
import {UserProxy} from '../../services/proxy/user-proxy.service';

@Injectable()
export class UserResolver implements Resolve<User> {
  private readonly storageSessionKey: string = 'sessionData';
  private readonly defaultIncludeResources: String[] = [
    'company', 'user_images', 'user_languages', 'user_languages.language',
    'user_skills', 'user_skills.skill', 'user_documents', 'user_documents.document',
    'user_interests', 'user_interests.interest'
  ];
  private readonly defaultIncludeResourcesString: String = this.defaultIncludeResources.join(',');

  private user: User;
  private userChange: EventEmitter<User> = new EventEmitter<User>();

  public constructor(
    private dataStore: DataStore,
    private navigationService: NavigationService,
    private userProxy: UserProxy
  ) {
  }

  public resolve(): Promise<User> {
    const session = this.dataStore.get(this.storageSessionKey);

    if (this.validateSession(session)) {

      if (this.user) {
        return Promise.resolve(this.user);
      }

      return this.userProxy.getUser(session.user_id, { include: this.defaultIncludeResourcesString }).then(user => {
        this.init(user);
        return user;
      });
    }

    this.dataStore.remove(this.storageSessionKey);
    this.init(null);
    return Promise.resolve(null);
  }

  public init(user: User): void {
    this.user = user;
  }

  public reloadUser(): Promise<User> {
    const session = this.dataStore.get(this.storageSessionKey);

    if (this.validateSession(session)) {
      return this.userProxy.getUser(session.user_id, { include: this.defaultIncludeResourcesString }).then(user => {
        this.user = user;
        this.userChange.emit(this.user);
        return user;
      });
    }

    this.logout();
    this.navigationService.navigate(JARoutes.login);
    return Promise.resolve(null);
  }

  public getUser(): User {
    return this.user;
  }

  public logout(): void {
    this.user = null;
    this.dataStore.remove(this.storageSessionKey);
    this.userChange.emit(this.user);
  }

  public login(email: string, password: string): Promise<User> {
    return this.userProxy.getUserSession(email, password).then(response => {
      this.dataStore.set(this.storageSessionKey, response.data);
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
