import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../../../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.page.html',
  styleUrls: ['./job-detail.page.scss'],
})
export class JobDetailPage implements OnInit {
	detail: any = {};
	connotes: any;
	connote_new:any;
	id_booking:any;
	count_connotes:any;
  constructor(public api: RestApiService,
  public loadingController: LoadingController,
  public route: ActivatedRoute,
  public router: Router,
  public callNumber: CallNumber,
  private storage: Storage,
  ) { }

  ngOnInit() {
  	this.getJobDetail();
  }
  ionViewWillEnter(){
  	this.getJobDetail();
    // this.storage.get('keyOfData').then((val) => {
    // 	if(val!=''){
	   //  	this.connote_new = JSON.parse(val);
	   //  }
    // });
  }
  async getJobDetail() {
  		this.id_booking = this.route.snapshot.paramMap.get('id');
	  	const loading = await this.loadingController.create({
	    // content: 'Loading'
	  	});
	  	await loading.present();
	  	await this.api.getJobDetailCount(this.route.snapshot.paramMap.get('id'))
	    .subscribe(res => {
	      // console.log(res);
	      this.detail = res.data;
	      // console.log(res.data.connotes);
	      this.count_connotes = res.connote_count;
	      console.log(this.connotes);
	      // console.log(this.detail);
	      loading.dismiss();
	    }, err => {
	      console.log(err);
	      loading.dismiss();
	    });
	    this.storage.get('keyOfData').then((val) => {
	    	// console.log(val);
	    	if(val!=''){
		    	// this.connote_new = JSON.parse(val);
		    	this.storage.set('keyOfData', '');
		    }
	      // console.log(JSON.parse(val));
	      // this.textPrint = JSON.parse(val);
	    });
	}
	async callNow(number) {
	    this.callNumber.callNumber(number, true)
	      .then(res => console.log('Launched dialer!', res))
	      .catch(err => console.log('Error launching dialer', err));
	}
	async notAccept(id){ 
		const loading = await this.loadingController.create({
	    // content: 'Loading'
	  	});
		await loading.present();
	  	await this.api.updateJob(this.route.snapshot.paramMap.get('id'),'pending')
	    .subscribe(res => {
	      this.getJobDetail();
	      loading.dismiss();
	      // this.router.navigateByUrl('/members/dashboard/job');
	      // this.router.navigate(['/members/dashboard/job']);
	    }, err => {
	      console.log(err);
	      loading.dismiss();
	    });
	}
	async accept(){
		const loading = await this.loadingController.create({
	    // content: 'Loading'
	  	});
		await loading.present();
	  	await this.api.updateJob(this.route.snapshot.paramMap.get('id'),'inprogress')
	    .subscribe(res => {
	      this.getJobDetail();
	      loading.dismiss();
	      // this.router.navigateByUrl('/members/dashboard/job');
	      // this.router.navigate(['/members/dashboard/job']);
	    }, err => {
	      console.log(err);
	      loading.dismiss();
	    });
	}
	async jobCancle(){
		this.connote_new = [];
		this.router.navigate(['members/dashboard/job']);
	}
	async jobConfirm(id_booking){
		this.router.navigate(['members/job-confirm/'+id_booking]);
	}
	async listJob(){
		this.router.navigate(['members/dashboard/job']);
	}
}
