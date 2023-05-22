import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
const routes: Routes = [
  { 
  	path: 'dashboard', 
  	loadChildren: './dashboard/dashboard.module#DashboardPageModule' 
  },
  { path: 'job-detail/:id', loadChildren: './dashboard/job-detail/job-detail.module#JobDetailPageModule' },
  { path: 'job-confirm/:id', loadChildren: './dashboard/job-confirm/job-confirm.module#JobConfirmPageModule' },
  { path: 'scan/:id', loadChildren: './dashboard/scan/scan.module#ScanPageModule' },
  { path: 'scan-job', loadChildren: './dashboard/scan-job/scan-job.module#ScanJobPageModule' },
  { path: 'scan-barcode-job', loadChildren: './dashboard/scan-barcode-job/scan-barcode-job.module#ScanBarcodeJobPageModule' },
  { path: 'send-confirm/:id', loadChildren: './dashboard/send-confirm/send-confirm.module#SendConfirmPageModule' },
  { path: 'send-detail/:id', loadChildren: './dashboard/send-detail/send-detail.module#SendDetailPageModule' },
  { path: 'scansend', loadChildren: './dashboard/scansend/scansend.module#ScansendPageModule' },
  { path: 'profile', loadChildren: './dashboard/profile/profile.module#ProfilePageModule' },
  { path: 'history', loadChildren: './dashboard/history/history.module#HistoryPageModule' },
  { path: 'setting', loadChildren: './dashboard/setting/setting.module#SettingPageModule' }
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }