import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModifyPage } from './modify.page';
import { NgZorroAntdModule } from 'ng-zorro-antd';

const routes: Routes = [
  {
    path: '',
    component: ModifyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModifyPage]
})
export class ModifyPageModule {}
