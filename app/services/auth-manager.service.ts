import {Injectable, EventEmitter} from "@angular/core";
import {User} from "../models/user";
import {UserProxy} from "./user-proxy.service";
import {UserManagerService} from "../user-manager.service";

@Injectable()
export class AuthManager {
  constructor(private userProxy: UserProxy, private userManagerService: UserManagerService) {
  }
  private userChange: EventEmitter<User> = new EventEmitter<User>();

  public isUserLoggedin(): boolean {
    return !!this.userManagerService.getUser();
  }

  public logUser(email: string, password: string) {
    return this.userProxy.getUserSession(email, password).then(response => {
      this.userManagerService.saveAuthorizationData(response.data);

      return this.userProxy.getUser(this.userManagerService.getUserId());
    })
    .then(response => {
      return this.handleUserResult(response.data);
    });
  }

  public authenticateIfNeeded(): Promise<User> {
    let userId = this.userManagerService.getUserId();

    if (userId) {
      return this.userProxy.getUser(userId, {include: 'user_images,user_languages'}).then(response => { // TODO: add user_languages.language in the include
        return this.handleUserResult(response.data);
      });
    }

    return Promise.resolve(null);
  }

  public logoutUser() {
    this.userManagerService.deleteUser();
    this.userChange.emit(null);
  }

  public handleUserResult(data) {
    this.userManagerService.saveUser(new User(data));
    let user = this.userManagerService.getUser();
    this.userChange.emit(user);
    return Promise.resolve(user);
  }

  public getUserChangeEmmiter(): EventEmitter<User> {
    return this.userChange;
  }
}
