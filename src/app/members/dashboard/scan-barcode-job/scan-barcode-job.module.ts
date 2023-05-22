import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ScanBarcodeJobPage } from './scan-barcode-job.page';

const routes: Routes = [
  {
    path: '',
    component: ScanBarcodeJobPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ScanBarcodeJobPage]
})
export class ScanBarcodeJobPageModule {}
