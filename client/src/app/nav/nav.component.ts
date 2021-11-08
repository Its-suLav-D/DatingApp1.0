import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../_services/accounts.service';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Router, Route } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  currentUserObservable$: Observable<User> | undefined;

  constructor(
    private accountService: AccountsService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  // loggedIn: boolean = false;

  ngOnInit() {
    this.currentUserObservable$ = this.accountService.currentUser$;
    // this.getCurrentUser();
    console.log(this.currentUserObservable$);
  }

  login() {
    this.accountService.login(this.model).subscribe((response) => {
      console.log(response);
      this.router.navigateByUrl('/members');
      // this.loggedIn = true;
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
    // this.loggedIn = false;
  }

  // getCurrentUser() {
  //   this.accountService.currentUser$.subscribe(
  //     (user) => {
  //       console.log(user);
  //       // Turn Object into Boolean -- Double Exclamation
  //       this.loggedIn = !!user;
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }
}
