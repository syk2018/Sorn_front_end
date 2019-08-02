import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Users } from '../../interfaces/users';
import { Router } from '@angular/router';
@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.page.html',
  styleUrls: ['./aboutme.page.scss'],
})
export class AboutmePage implements OnInit {

  constructor(private storage: Storage,
              private router: Router,) { }

  userInformation: Users = {
    userId:0,
    useravatar:0,
    userdescription:'',
    userismanager:0,
    username:'',
    usernickname:'',
    userpwd:'',
    userregdate:null
  }

  userAvatarUrl = '';

  ngOnInit() {
    this.getinformation();
  }

  ionViewWillEnter() {
    this.getinformation();
  }

  getinformation() {
    this.storage.get('user').then((result:Users) => {
      this.userInformation = result;
    });
    this.storage.get('avatar').then((result) => {
      this.userAvatarUrl = result;
    });
  }

  signout() {
    this.storage.remove('user').then(() => {
      this.storage.remove('avatar').then(() => {
        this.router.navigateByUrl('/login');
      })
    })
  }
}
