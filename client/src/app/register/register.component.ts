import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AccountsService } from '../_services/accounts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() cancelEvent = new EventEmitter();
  constructor(
    private accountsService: AccountsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  register() {
    this.accountsService.register(this.model).subscribe(
      (response) => {
        console.log(response);
        this.cancel();
      },
      (error) => {
        console.log(error);
        this.toastr.error(error.error);
      }
    );
  }

  cancel() {
    this.cancelEvent.emit(false);
  }
}
