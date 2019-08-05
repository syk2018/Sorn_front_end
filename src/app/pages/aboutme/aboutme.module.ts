import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AboutmePage } from './aboutme.page';
import { NzUploadModule } from 'ng-zorro-antd/upload';

const routes: Routes = [
  {
    path: '',
    component: AboutmePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    NzUploadModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AboutmePage]
})
export class AboutmePageModule {}
