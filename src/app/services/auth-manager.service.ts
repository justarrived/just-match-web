import {Injectable, EventEmitter} from '@angular/core';
import {User} from '../models/user';
import {UserProxy} from './proxy/user-proxy.service';
import {UserManager} from './user-manager.service';

@Injectable()
export class AuthManager {
  private userChange: EventEmitter<User> = new EventEmitter<User>();
  private defaultIncludeResources: String[] = [
    'company', 'user_images', 'user_languages', 'user_languages.language',
    'user_skills', 'user_skills.skill', 'user_documents', 'user_documents.document',
    'user_interests', 'user_interests.interest'
  ];

  constructor(
    private userProxy: UserProxy,
    private userManager: UserManager
  ) {
  }

  public isUserLoggedin(): boolean {
    return !!this.userManager.getUser();
  }

  public logUser(email: string, password: string) {
    return this.userProxy.getUserSession(email, password).then(response => {
      this.userManager.saveAuthorizationData(response.data);
      console.log(response.data);
      return this.userProxy.getUser(this.userManager.getUserId(), { include: this.defaultIncludeResources.join(',') }).then(user => this.handleUserResult(user));
    });

  }

  public authenticateIfNeeded(): Promise<User> {
    let userId = this.userManager.getUserId();

    if (userId) {
      return this.userProxy.getUser(userId, { include: this.defaultIncludeResources.join(',') }).then(user => {
        return this.handleUserResult(user);
      });
    }

    return Promise.resolve(null);
  }

  public logoutUser() {
    this.userManager.deleteUser();
    this.userChange.emit(null);
  }

  public handleUserResult(us) {
    this.userManager.saveUser(us);
    let user = this.userManager.getUser();
    this.userChange.emit(user);
    return Promise.resolve(user);
  }

  public getUserChangeEmmiter(): EventEmitter<User> {
    return this.userChange;
  }
}
