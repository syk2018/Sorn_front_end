import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LoadingController, ToastController, Events } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  UploadFile } from 'ng-zorro-antd';
import { Users } from 'src/app/interfaces/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.page.html',
  styleUrls: ['./modify.page.scss'],
})
export class ModifyPage implements OnInit {

  constructor(private loadingController: LoadingController,
              private toastController: ToastController,
              private storage: Storage,
              private events: Events,
              private router: Router,
              private http: HttpClient,) { }
  
  userInformation:Users = {
    userId:null,
    userattention:null,
    useravatar:0,
    userdescription:'',
    userfans:0,
    userismanager:0,
    username:'',
    usernickname:'',
    userpwd:'',
    userregdate:null
  }

  userAvatarUrl = '';

  ngOnInit() {
    this.getUserInformation();
  }

  getUserInformation() {
    this.storage.get('user').then((result) => {
      this.userInformation = result;
    })
    this.storage.get('avatar').then((result) => {
      this.userAvatarUrl = result;
    })
  }

  async submit() {
    const api = 'https://syk2018.cn/web/users/update';
    const loading = await this.loadingController.create();
    await loading.present();

    const httpOptions = {
      headers : new HttpHeaders({
      'Content-Type':  'application/json'
      })
    };

    this.http.post(api,this.userInformation,httpOptions).subscribe((result:any) => {
      this.userInformation = result.data;
      this.storage.remove('user').then(() => {
        this.storage.set('user',this.userInformation).then(() => {
          this.events.publish('update');
          loading.dismiss();
          this.presentToast('Successful!',3000);
          this.router.navigateByUrl('/tabs/aboutme');
        })
      })
    });

  }

  async presentToast(mymessage: string, myduration: number) {
    const toast = await this.toastController.create({
      message: mymessage,
      duration: myduration
    });
    toast.present();
  }

  async upload(info: { file: UploadFile }) {
    const loading = await this.loadingController.create();
    await loading.present();
  
    this.handleChange(info);

    this.events.subscribe('upload seccessful',() => {
      loading.dismiss();
    })
  }

  async handleChange(info: { file: UploadFile }) {
    
    switch (info.file.status) {
      case 'uploading':
        break;
      case 'done':
        this.userInformation.useravatar = info.file.response.data[0].fileId;
        console.log('调用');
        const api = 'https://syk2018.cn/web/users/update';

        const httpOptions = {
          headers : new HttpHeaders({
          'Content-Type':  'application/json'
          })
        };

        this.http.post(api,this.userInformation,httpOptions).subscribe((result:any) => {
          this.userInformation = result.data;  
          const api = 'https://syk2018.cn/web/file/getById?id=' + this.userInformation.useravatar;
          this.http.get(api).subscribe((result:any) => {
            this.userAvatarUrl = result.data.fileurl;
            this.storage.set('avatar',this.userAvatarUrl).then(() => {
              this.events.publish('update');
              this.events.publish('upload seccessful');
              this.presentToast('Successful!',3000);
            })
          })
        }) 
        break;
      case 'error':
        console.log('failed');
        return;
    }   
}

}
