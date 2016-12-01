import {Injectable, EventEmitter} from "@angular/core";
import {User} from "../models/user";
import {UserProxy} from "./user-proxy.service";
import {UserManager} from "../user-manager.service";

@Injectable()
export class AuthManager {
  constructor(private userProxy: UserProxy, private userManager: UserManager) {
  }
  private userChange: EventEmitter<User> = new EventEmitter<User>();

  public isUserLoggedin(): boolean {
    return !!this.userManager.getUser();
  }

  public logUser(email: string, password: string) {
    return this.userProxy.getUserSession(email, password).then(response => {
      this.userManager.saveAuthorizationData(response.data);

      return this.userProxy.getUser(this.userManager.getUserId(), {include: 'company,user_images,user_languages'});
    })
    .then(response => this.handleUserResult(response.data));
  }

  public authenticateIfNeeded(): Promise<User> {
    let userId = this.userManager.getUserId();

    if (userId) {
      return this.userProxy.getUser(userId, {include: 'company,user_images,user_languages'}).then(response => { // TODO: add user_languages.language in the include
        return this.handleUserResult(response.data);
      });
    }

    return Promise.resolve(null);
  }

  public logoutUser() {
    this.userManager.deleteUser();
    this.userChange.emit(null);
  }

  public handleUserResult(data) {
    this.userManager.saveUser(new User(data));
    let user = this.userManager.getUser();
    this.userChange.emit(user);
    console.log(user);
    return Promise.resolve(user);
  }

  public getUserChangeEmmiter(): EventEmitter<User> {
    return this.userChange;
  }
}
