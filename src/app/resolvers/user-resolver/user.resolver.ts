import {DataStore} from '../../services/data-store.service';
import {EventEmitter} from '@angular/core';
import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {User} from '../../models/user';
import {UserProxy} from '../../services/proxy/user-proxy.service';

@Injectable()
export class UserResolver implements Resolve<User> {
  private readonly storageAuthorizationData: string = 'authorizationData';
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
    private userProxy: UserProxy
  ) {
  }

  public resolve(): Promise<User> {
    if (this.user) {
      return Promise.resolve(this.user);
    }

    const authorizationData = this.dataStore.get(this.storageAuthorizationData);

    if (authorizationData && authorizationData.user_id) {
      return this.userProxy.getUser(authorizationData.user_id, { include: this.defaultIncludeResourcesString }).then(user => {
        this.init(user);
        return user;
      });
    }

    Promise.resolve(null);
  }

  public init(user: User): void {
    this.user = user;
  }

  public reloadUser(): Promise<User> {
    const authorizationData = this.dataStore.get(this.storageAuthorizationData);

    if (authorizationData && authorizationData.user_id) {
      return this.userProxy.getUser(authorizationData.user_id, { include: this.defaultIncludeResourcesString }).then(user => {
        this.user = user;
        this.userChange.emit(this.user);
        return user;
      });
    }

    // TODO navigate to login
    return Promise.resolve(null);
  }

  public getUser(): User {
    return this.user;
  }

  public logout(): void {
    this.user = null;
    this.dataStore.remove(this.storageAuthorizationData);
    this.userChange.emit(this.user);
  }

  public login(email: string, password: string): Promise<User> {
    return this.userProxy.getUserSession(email, password).then(response => {
      this.dataStore.set(this.storageAuthorizationData, response.data);
      return this.reloadUser();
    });

  }
}
