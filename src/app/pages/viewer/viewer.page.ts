import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.page.html',
  styleUrls: ['./viewer.page.scss'],
  animations: [
    trigger('InsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('2.5s', style({ opacity: 1 })),
      ]),
    ]),
  ]
})
export class ViewerPage implements OnInit {

  constructor(private http: HttpClient,
    private loadingController: LoadingController,
              private route: ActivatedRoute,) { }

  article:Article = {
    articleclickcount:0,
    articleconsentient:1,
    articlecontentshtml:'',
    articleid:null,
    articlelastcommenttime:null,
    articlesessionid:0,
    articletime:null,
    articletitle:'',
    articleuserid:null
  }

  id = '';

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getArticle();
  }

  async getArticle() {
    const loading = await this.loadingController.create();
    await loading.present();

    const api = 'https://syk2018.cn/web/article/getById?id='+this.id;
    this.http.get(api).subscribe((result:any) => {
      this.article = result.data;
      loading.dismiss();
    })
  }
}
