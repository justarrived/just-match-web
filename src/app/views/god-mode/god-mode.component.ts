import {Component, OnInit, ElementRef, Input} from '@angular/core';
import {UserProxy} from '../../services/proxy/user-proxy.service';
import {User} from '../../models/user';
import {ActsAsUser} from '../../services/acts-as-user.service';

@Component({
  templateUrl: './god-mode.component.html',
  styleUrls: ['./god-mode.component.scss'],
})
export class GodModeComponent {

  private users: Array<User>;

  constructor(
    private userProxy: UserProxy,
    private actsAsUser: ActsAsUser
  ) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.userProxy.getUsers({'page[size]': 50, 'fields[user]' : 'first_name, last_name'})
      .then(result => {
        this.users = result.data;
      });
  }

  private activateGodMode(): void {
    this.actsAsUser.setUserId("5");
  }

}
