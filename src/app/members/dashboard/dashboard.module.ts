import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';


import { SignaturePadModule } from 'angular2-signaturepad';
const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    // loadChildren:"./tab1/tab1.module#Tab1PageModule",
    children: [
      {
          path:"feed",
          children: [
             {
                path:"",
                loadChildren:"./feed/feed.module#FeedPageModule"
             }
          ]
       },
      {
          path:"job",
          children: [
             {
                path:"",
                loadChildren:"./job/job.module#JobPageModule"
             }
          ]
       },
       {
          path:"send",
          children: [
             {
                path:"",
                loadChildren:"./send/send.module#SendPageModule"
             }
          ]
       },
       {
          path:"other",
          children: [
             {
                path:"",
                loadChildren:"./other/other.module#OtherPageModule"
             }
          ]
       },
       {
          path: '',
          redirectTo: 'feed',
          pathMatch: 'full'
       }
    ]
    // loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    // loadChildren: './tabs/tabs.module#TabsPageModule'
  },
  {
    path: '',
    redirectTo: 'feed',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
