import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, LoadingController, IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';
import { Article } from 'src/app/interfaces/article';
import { HttpClient } from '@angular/common/http';
import { trigger, transition, style, query, stagger, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [
    trigger('flyUpTrigger_multiple', [
      transition(':enter', [
        query('img', [
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
        query('img', [
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
export class HomePage implements OnInit {

  constructor(private http: HttpClient,
              private router: Router) { }
  
  articles:Article[] = [];
  
  pageNum:number;

  sessions = [
    {
      id:1,
      src:'assets/Tech.jpg'
    },
    {
      id:2,
      src:'assets/Game.jpg'
    },
    {
      id:3,
      src:'assets/Movie.jpg'
    },
    {
      id:4,
      src:'assets/Sport.jpg'
    },
    {
      id:5,
      src:'assets/Love.png'
    },
    {
      id:6,
      src:'assets/Business.jpg'
    },
    {
      id:7,
      src:'assets/Culture.png'
    },
    {
      id:8,
      src:'assets/Entertainment.png'
    }
  ];

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  ngOnInit() {
    //this.doRefresh();
    this.pageNum = 1;
  }

  doRefresh(event= null) {
    const api = 'https://syk2018.cn/web/article/list'+'?pageNum=1&pageSize=10';
    this.http.get(api).subscribe((result:any) => {
      this.articles = result.data.list;
      if (event != null) {
        event.target.complete();
      }    
    })
  }
}
