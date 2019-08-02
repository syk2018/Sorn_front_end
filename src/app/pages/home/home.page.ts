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

  constructor(private actionSheetController: ActionSheetController,
              private http: HttpClient,
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

  
  
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Choice the type of your article.',
      buttons: [{
        text: 'Technology',
        icon: 'calculator',
        handler: () => {
          this.router.navigateByUrl('/editor/1');
        }
      }, {
        text: 'Game',
        icon: 'logo-game-controller-b',
        handler: () => {
          this.router.navigateByUrl('/editor/2');
        }
      }, {
        text: 'Movies',
        icon: 'videocam',
        handler: () => {
          this.router.navigateByUrl('/editor/3');
        }
      }, {
        text: 'Sport',
        icon: 'football',
        handler: () => {
          this.router.navigateByUrl('/editor/4');
        }
      },{
        text: 'Love',
        icon: 'heart',
        handler: () => {
          this.router.navigateByUrl('/editor/5');
        }
      },{
        text: 'Business',
        icon: 'business',
        handler: () => {
          this.router.navigateByUrl('/editor/6');
        }
      },{
        text: 'Culture',
        icon: 'people',
        handler: () => {
          this.router.navigateByUrl('/editor/7');
        }
      },{
        text: 'Entertainment',
        icon: 'happy',
        handler: () => {
          this.router.navigateByUrl('/editor/8');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
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
