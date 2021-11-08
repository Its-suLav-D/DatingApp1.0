import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from '../_services/accounts.service';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private accountsService: AccountsService,
    private toastr: ToastrService
  ) {}

  canActivate(): Observable<boolean> {
    return this.accountsService.currentUser$.pipe(
      map((user) => {
        if (user) {
          return true;
        }
        this.toastr.warning(
          'You need to create an Account to access the Requested resource!!'
        );
        return false;
      })
    );
  }
}
