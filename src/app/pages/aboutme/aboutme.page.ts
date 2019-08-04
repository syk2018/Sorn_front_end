import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Users } from '../../interfaces/users';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Article } from 'src/app/interfaces/article';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.page.html',
  styleUrls: ['./aboutme.page.scss'],
})
export class AboutmePage implements OnInit {

  constructor(private http: HttpClient,
              private storage: Storage,
              private router: Router,
              private menu: MenuController) { }

  userInformation: Users = {
    userId:0,
    useravatar:0,
    userdescription:'',
    userismanager:0,
    username:'',
    usernickname:'',
    userpwd:'',
    userattention:0,
    userfans:0,
    userregdate:null
  }

  articles:Article[] = [];

  userAvatarUrl = '';

  articles_img:string[] = [];

  isNone = true;

  ngOnInit() {
    this.getinformation();
  }

  ionViewWillEnter() {
    this.getinformation();
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  getinformation() {
    this.storage.get('user').then((result:Users) => {
      this.userInformation = result;
      this.getArticle();
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

  getArticle() {
    const api = 'https://syk2018.cn/web/article/listByUserId?id=' + this.userInformation.userId;
    this.http.get(api).subscribe((result:any) => {
      this.articles = result.data;
      if (this.articles.length != 0 ) {

      this.articles_img = new Array(this.articles.length);

      let imgReg = /<img.*?(?:>|\/>)/gi;
      let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
      let arr=[];

      for(let i = 0; i < this.articles.length; i++) {

        arr = this.articles[i].articlecontentshtml.match(imgReg);
        
        if(arr == null) {
          continue;
        } else {
          for (let j = 0; j < arr.length; j++) {
            let src = arr[j].match(srcReg);
            //获取图片地址
            if(src[1]){
                this.articles_img[i] = src[1];
            }  
          }
        }
      }
      this.isNone = false;
      } else {
        this.isNone = true;
      }
    })
  }

  delHtmlTag(str) {
    return str.replace(/<[^>]+>/g, '');
  }
}
