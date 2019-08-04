import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(private router: Router,
              private actionSheetController: ActionSheetController,) { }

  ngOnInit() {
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
}
