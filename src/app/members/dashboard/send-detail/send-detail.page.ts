import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../../../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-send-detail',
  templateUrl: './send-detail.page.html',
  styleUrls: ['./send-detail.page.scss'],
})
export class SendDetailPage implements OnInit {
	detail: any = {};
	connotes: any;
	connote_new:any;
  constructor(public api: RestApiService,
  public loadingController: LoadingController,
  public route: ActivatedRoute,
  public router: Router,
  public callNumber: CallNumber,
  private storage: Storage,
  ) { }

  ngOnInit() {
  	this.getSendDetail();
  }
  ionViewWillEnter(){
    this.storage.get('keyOfData').then((val) => {
    	if(val!=''){
	    	this.connote_new = JSON.parse(val);
	    }
    });
  }
  async getSendDetail() {
	  const loading = await this.loadingController.create({
	    // content: 'Loading'
	  });
	  await loading.present();
	  await this.api.getSendDetail(this.route.snapshot.paramMap.get('id'))
	    .subscribe(res => {
	      // console.log(res);
	      this.detail = res.data;
	      // console.log(res.data.connotes);
	      this.connotes = res.connotes;
	      console.log(this.connotes);
	      // console.log(this.detail);
	      loading.dismiss();
	    }, err => {
	      console.log(err);
	      loading.dismiss();
	    });
	    this.storage.get('keyOfDataSend').then((val) => {
	    	// console.log(val);
	    	if(val!=''){
		    	this.connote_new = JSON.parse(val);
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
	  	await this.api.updateSend(this.route.snapshot.paramMap.get('id'),'pending')
	    .subscribe(res => {
	      this.getSendDetail();
	      loading.dismiss();
	      // this.router.navigateByUrl('/members/dashboard/send');
	      // this.router.navigate(['/members/dashboard/send']);
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
	  	await this.api.updateSend(this.route.snapshot.paramMap.get('id'),'inprogress')
	    .subscribe(res => {
	    	console.log('>>>');
	    	console.log(res);
	      	this.getSendDetail();
	      
	      	loading.dismiss();
	      // this.router.navigateByUrl('/members/dashboard/send');
	      // this.router.navigate(['/members/dashboard/send']);
	    }, err => {
	      console.log(err);
	      loading.dismiss();
	    });
	}
	async sendCancle(){
		this.router.navigate(['members/send-detail/'+this.route.snapshot.paramMap.get('id')]);
	}
	async sendConfirm(id_booking){
		this.router.navigate(['members/send-confirm/'+id_booking]);
	}
}
