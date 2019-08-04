import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article } from 'src/app/interfaces/article';
import { Session } from 'src/app/interfaces/session';
import { LoadingController } from '@ionic/angular';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

@Component({
  selector: 'app-session',
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
  animations: [
    trigger('flyUpTrigger_multiple', [
      transition(':enter', [
        query('ion-card', [
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
        query('ion-card', [
          style({ transform: 'translateY(-100%)', opacity: 0}),
          stagger(-30, [
            animate('1s cubic-bezier(0.35, 0, 0.25, 1)',
            style({ opacity: 1, transform: 'none' }))
          ])
        ])
      ])
    ]),
  ]
})
export class SessionPage implements OnInit {

  constructor(private route: ActivatedRoute,
              private loadingController: LoadingController,
              private http: HttpClient,) { }
  
  sessionId:string;
  articles:Article[] = [];
  articles_img:string[];
  articles_author:string[100] = '';

  pageNum:number;
  
  session:Session = {
    sessionId:null,
    sessionImgId:null,
    sessionname:''
  }

  ngOnInit() {
    this.pageNum = 1;
    this.sessionId = this.route.snapshot.paramMap.get('id');
    this.getSession();
  }

  async getSession() {
    const loading = await this.loadingController.create();
    await loading.present();
    const api = 'https://syk2018.cn/web/sessions/getById?id=' + this.sessionId;
    this.http.get(api).subscribe((result:any) => {
      this.session = result.data;
      loading.dismiss();
      this.getArticle();
    })
  }  

  async getAuthor() {
    const api = 'https://syk2018.cn/web/users/getAuthors';
    var userId = new Array();

    for(var i = 0; i < this.articles.length; i++) {
      userId.push(this.articles[i].articleuserid);
    }

    const httpOptions = {
      headers : new HttpHeaders({
      'Content-Type':  'application/json'
      })
    };

    this.http.post(api,userId,httpOptions).subscribe((result:any) => {
      this.articles_author = result.data;
    })
  }

  loadData(event) {
  
    this.pageNum = this.pageNum + 1;
    const api = 'https://syk2018.cn/web/article/listBySession'+'?pageNum=' + this.pageNum
    +'&id=' + this.sessionId + '&pageSize=10';
    this.http.get(api).subscribe((result:any) => {

      var temp = result.data.list;
      var temp_img = new Array(temp.length);

      let imgReg = /<img.*?(?:>|\/>)/gi;
      let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
      let arr=[];

      for(let i = 0; i < temp.length; i++) {

        arr = temp[i].articlecontentshtml.match(imgReg);
        
        if(arr == null) {
          continue;
        } else {
          for (let j = 0; j < arr.length; j++) {
            let src = arr[j].match(srcReg);
            //获取图片地址
            if(src[1]){
                temp_img[i] = src[1];
            }  
          }
        }
      }

      Array.prototype.push.apply(this.articles_img,temp_img);

      for( let i = 0; i < temp.length; i++) {
        this.articles.push(temp[i]);
      }
      this.getAuthor();
      event.target.complete();  
    });
  }

  async getArticle() {

    const loading = await this.loadingController.create();
    await loading.present();

    this.pageNum = 1;
    const api = 'https://syk2018.cn/web/article/listBySession?id=' + this.sessionId + 
    '&pageNum=' + this.pageNum + '&pageSize=10';

    this.http.get(api).subscribe((result:any) => {
      this.articles = result.data.list;
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
      this.getAuthor();
      loading.dismiss();
    })
  }

  delHtmlTag(str) {
    return str.replace(/<[^>]+>/g, '');
  }

}
