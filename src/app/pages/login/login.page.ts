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
import { Md5 } from "ts-md5";
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Users } from 'src/app/interfaces/users';

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

  constructor(private http: HttpClient,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private toastController: ToastController,
              private router: Router,
              private storage: Storage ) { }

  userInformation: Users = {
    userId:0,
    useravatar:0,
    usernickname:'',
    userdescription:'',
    userismanager:0,
    username:'',
    userpwd:'',
    userattention:0,
    userfans:0,
    userregdate:null
  }
  
  signinForm = new FormGroup({
    username: new FormControl('', [ Validators.required, Validators.minLength(5)]),
    userpwd: new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
  });

  signupForm = new FormGroup({
    username: new FormControl('', [ Validators.required, Validators.minLength(5)]),
    userpwd: new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    re_password: new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    usernickname: new FormControl('', [ Validators.required, ])
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

  async onSigninSubmit() {
    const loading = await this.loadingController.create();
    await loading.present();

    if(this.signinForm.invalid) {
      loading.dismiss();
      if(this.signinForm.controls.username.invalid) {
        if(this.signinForm.controls.username.errors.required) {
          this.presentAlert('Username is required.')
        }
        else if(this.signinForm.controls.username.errors.minlength) {
          this.presentAlert('The minlength of username is 5.')
        }
      }
      else {
        loading.dismiss();
        if(this.signinForm.controls.userpwd.errors.required) {
          this.presentAlert('Password is required.')
        }
        else if(this.signinForm.controls.userpwd.errors.minlength) {
          this.presentAlert('The minlength of password is 6.')
        }
        else if(this.signinForm.controls.userpwd.errors.maxlength) {
          this.presentAlert('The maxlength of password is 20.')
        }
      }  
    } else {
    const api = 'https://syk2018.cn/web/users/login';

    this.signinForm.controls.userpwd.setValue(Md5.hashStr(
      this.signinForm.controls.userpwd.value
    ).toString());

    const httpOptions = {
      headers : new HttpHeaders({
      'Content-Type':  'application/json'
      })
    };

    this.http.post(api, this.signinForm.value, httpOptions).subscribe((result: any) => {
      if (result.data != null) {        
        this.storage.set('user',result.data[0]).then(() => {
          const api = 'https://syk2018.cn/web/file/getById' + '?' + 'id=' + result.data[0].useravatar;
          this.http.get(api).subscribe((result:any) => {
            this.storage.set('avatar',result.data.fileurl).then(() => {
              this.storage.get('user').then((result) => {
                this.presentToast('Welcome back,' + result.usernickname + '!', 3000);
                loading.dismiss();
                this.router.navigateByUrl('/tabs/home');
              })
            })
          })
        })
      } else {
        loading.dismiss();
        this.presentToast('Wrong username or password.', 3000);
        this.signinForm.reset();
      }
    });
    }  
  }

  async onSignupSubmit() {
    const loading = await this.loadingController.create();
    await loading.present();

    if(this.signupForm.invalid) {
      if(this.signupForm.controls.username.invalid) {
        loading.dismiss();
        if(this.signupForm.controls.username.errors.required) {
          this.presentAlert('Username is required.')
        }
        else if(this.signupForm.controls.username.errors.minlength) {
          this.presentAlert('The minlength of username is 5.');
        }
      }
      else if(this.signupForm.controls.userpwd.invalid) {
        loading.dismiss();
        if(this.signupForm.controls.userpwd.errors.required) {
          this.presentAlert('Password is required.');
        }
        else if(this.signupForm.controls.userpwd.errors.minlength) {
          this.presentAlert('The minlength of password is 6.');
        }
        else if(this.signupForm.controls.userpwd.errors.maxlength) {
          this.presentAlert('The maxlength of password is 20.')
        }
      }
      else if(this.signupForm.controls.re_password.invalid) {
        loading.dismiss();
        if(this.signupForm.controls.re_password.errors.required) {
          this.presentAlert('Repeat password is required.');
        }
        else if(this.signupForm.controls.re_password.errors.minlength) {
          this.presentAlert('The minlength of repeat password is 6.');
        }
        else if(this.signupForm.controls.re_password.errors.maxlength) {
          this.presentAlert('The maxlength of repeat password is 6.')
        }
      }
      else if(this.signupForm.controls.userpwd.value != this.signupForm.controls.re_password.value) {
        loading.dismiss();
        this.presentAlert('Passwords are different.');
      }
      else {
        loading.dismiss();
        this.presentAlert('Nickname is required');
      }
      
    } else {
      const api = 'https://syk2018.cn/web/users/signUp';

      this.signupForm.controls.userpwd.setValue(Md5.hashStr(
        this.signupForm.controls.userpwd.value
      ).toString());

      const httpOptions = {
        headers : new HttpHeaders({
        'Content-Type':  'application/json'
        })
      };

      this.http.post(api, this.signupForm.value, httpOptions).subscribe((result: any) => {
        if (result.code == 200) {
          this.storage.set('user',result.data[0]).then(() => {
            const api = 'https://syk2018.cn/web/file/getById' + '?' + 'id=' + result.data[0].useravatar;
            this.http.get(api).subscribe((result:any) => {
              this.storage.set('avatar',result.data.fileurl).then(() => {
                this.storage.get('user').then((result) => {
                  this.presentToast('Welcome,' + result.usernickname + '!', 3000);
                  loading.dismiss();
                  this.router.navigateByUrl('/tabs/home');
                })
              })
            })
          })
        } else if(result.code == 8401) {
          loading.dismiss();
          this.presentToast('Username has been used.', 3000);
        }
        else {
          loading.dismiss();
          this.presentToast('Sign up failed', 3000);
        }
      });
    }
  }

  async presentToast(mymessage: string, myduration: number) {
    const toast = await this.toastController.create({
      message: mymessage,
      duration: myduration
    });
    toast.present();
  }

  async presentAlert(myMessage:string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: myMessage,
      buttons: ['OK']
    });

    await alert.present();
  }

}
