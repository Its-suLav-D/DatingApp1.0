import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { AccountsService } from './_services/accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Dating App';

  ngOnInit() {
    this.setCurrentUser();
  }
  constructor(private accountService: AccountsService) {}

  setCurrentUser() {
    const userExist: string | null = localStorage.getItem('user');
    if (!userExist) {
      this.accountService.setCurrentUser(undefined);
      return;
    }

    const user: User = JSON.parse(userExist);
    this.accountService.setCurrentUser(user);
  }
}
