import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css'],
})
export class TestErrorsComponent implements OnInit {
  baseUrl = 'https://localhost:5001/api/';

  validationErrors: string[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  get404() {
    this.http.get(`${this.baseUrl}Buggy/not-found`).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  get400() {
    this.http.get(`${this.baseUrl}Buggy/bad-request`).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  get500() {
    this.http.get(`${this.baseUrl}Buggy/server-error`).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  get401() {
    this.http.get(`${this.baseUrl}Buggy/auth`).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  get400ValidationError() {
    this.http.post(`${this.baseUrl}Account/register`, {}).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
        this.validationErrors = error;
      }
    );
  }
}
