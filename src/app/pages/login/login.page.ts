import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  group,
  query,
  stagger,
  // ...
} from '@angular/animations';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: [
    trigger('flyUpTrigger_multiple', [
      transition(':enter', [
        query('ion-item', [
          style({ transform: 'translateY(100%)', opacity: 0}),
          stagger(-30, [
            animate('1s cubic-bezier(0.35, 0, 0.25, 1)',
            style({ opacity: 1, transform: 'none' }))
          ])
        ])
      ])
    ]),
    trigger('flyDownTrigger_multiple', [
      transition(':enter', [
        query('ion-item', [
          style({ transform: 'translateY(-100%)', opacity: 0}),
          stagger(-30, [
            animate('1s cubic-bezier(0.35, 0, 0.25, 1)',
            style({ opacity: 1, transform: 'none' }))
          ])
        ])
      ])
    ]),
    trigger('flyUpTrigger', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0}),
        group([
          animate('0.3s ease', style({
            transform: 'translateY(0)'
          })),
          animate('0.3s ease', style({
            opacity: 1
          }))
        ])
      ]),
    ]),
    trigger('flyDownTrigger', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0}),
        group([
          animate('0.5s ease', style({
            transform: 'translateY(0)'
          })),
          animate('0.5s ease', style({
            opacity: 1
          }))
        ])
      ]),
    ]),
    trigger('flyInOutLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate(500)
      ]),
    ]),
    trigger('flyInOutRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate(500)
      ]),
    ]),
    trigger('InsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('2s', style({ opacity: 1 })),
      ]),
    ]),

    trigger('InsertRemoveTrigger_Quick', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(600, style({ opacity: 1 })),
      ]),
    ]),

    // animation triggers go here
  ]
})
export class LoginPage implements OnInit {

  signin_isSelected = true;
  isChanged = true;

  constructor(private http: HttpClient) { }

  signinForm = new FormGroup({
    username: new FormControl('', [ Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [ Validators.required, Validators.minLength(10), Validators.maxLength(20)]),
  });

  signupForm = new FormGroup({
    username: new FormControl('', [ Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [ Validators.required, Validators.minLength(10), Validators.maxLength(20)]),
    re_password: new FormControl('', [ Validators.required, Validators.minLength(10), Validators.maxLength(20)]),
    nickname: new FormControl('', [ Validators.required, ])
  });

  signinButtonCurrentClass: {};
  signinButtonStyleClass: {};
  signupButtonCurrentClass: {};
  signupButtonStyleClass: {};
  orLabelCurrentClass: {};

  ngOnInit() {
    this.setSigninButtonCurrentClassSelected();
    this.setSigninButtonStyleClassSelected();
    this.setSignupButtonCurrentClassSelected();
    this.setSignupButtonStyleClassSelected();
    this.setLabelCurrentClassRight();
  }

  setSigninButtonCurrentClassSelected() {
    this.signinButtonCurrentClass = {
      'position_absolute_center': this.signin_isSelected,
      'position_absolute_left': !this.signin_isSelected,
      'transition_quick': true
    };
  }

  setSigninButtonStyleClassSelected() {
    this.signinButtonStyleClass = {
      'botton_selected': this.signin_isSelected,
      'botton_unselected': !this.signin_isSelected,
      'text_fonts': true,
      'transition_slow': true
    };
  }

  setSignupButtonStyleClassSelected() {
    this.signupButtonStyleClass = {
      'botton_selected': !this.signin_isSelected,
      'botton_unselected': this.signin_isSelected,
      'text_fonts': true,
      'transition_slow': true
    };
  }

  setSignupButtonCurrentClassSelected() {
    this.signupButtonCurrentClass = {
      'position_absolute_center': !this.signin_isSelected,
      'position_absolute_right': this.signin_isSelected,
      'transition_quick': true
    };
  }

  setLabelCurrentClassRight() {
    this.orLabelCurrentClass = {
      'position_absolute_mid_right': this.signin_isSelected,
      'position_absolute_mid_left': !this.signin_isSelected,
      'text_fonts': true,
      'transition_slow': true
    };
  }

  setSelectTrue() {
    this.signin_isSelected = true;
    this.setSigninButtonCurrentClassSelected();
    this.setSigninButtonStyleClassSelected();
    this.setSignupButtonCurrentClassSelected();
    this.setSignupButtonStyleClassSelected();
    this.setLabelCurrentClassRight();
  }

  setSelectFalse() {
    this.signin_isSelected = false;
    this.setSigninButtonCurrentClassSelected();
    this.setSigninButtonStyleClassSelected();
    this.setSignupButtonCurrentClassSelected();
    this.setSignupButtonStyleClassSelected();
    this.setLabelCurrentClassRight();
  }

  change() {
    this.isChanged = !this.isChanged;
  }

  onSigninSubmit() {
    console.log(this.signinForm.value);
    const api = 'http://localhost:8888/users/login';

    const httpOptions = {
      headers : new HttpHeaders({
      'Content-Type':  'application/json'
      })
    };

    this.http.post(api, this.signinForm.value, httpOptions).subscribe(result => {
      console.log(result);
    });
  }

  onSignupSubmit() {
    console.log(this.signupForm.value);
    const api = 'http://localhost:8888/users/create';

    const httpOptions = {
      headers : new HttpHeaders({
      'Content-Type':  'application/json'
      })
    };

    this.http.post(api, this.signupForm.value, httpOptions).subscribe(result => {
      console.log(result);
    });
  }

}
