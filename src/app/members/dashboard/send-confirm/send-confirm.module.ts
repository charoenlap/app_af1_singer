import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SendConfirmPage } from './send-confirm.page';

import { SignaturePadModule } from 'angular2-signaturepad';

const routes: Routes = [
  {
    path: '',
    component: SendConfirmPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SignaturePadModule
  ],
  declarations: [SendConfirmPage]
})
export class SendConfirmPageModule {}
