import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { RestApiService } from '../../../rest-api.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router  } from '@angular/router';

@Component({
  selector: 'app-send',
  templateUrl: 'send.page.html',
  styleUrls: ['send.page.scss']
})
export class sendPage {
	emp_key:any;
	sends:any;
  	constructor(public loadingController: LoadingController,public api: RestApiService,private storage: Storage,public router: Router) {
  		this.getSend();
  	}
  	ionViewWillEnter(){
	    this.getSend();
	}
  	async getSend(){
  		const loading = await this.loadingController.create({
	    // content: 'Loading'
	    });
	    this.sends = [];
	    await loading.present();
	    this.storage.get('emp_key').then((val) => {
	    	// console.log(val);
		    this.api.getSend(val).subscribe(res => {
		      console.log(res);
		      if(res.result=='success'){
		      	this.sends = res.data;

		      }
		      
		      // this.loginDetail = res;
		      // console.log(this.loginDetail);
		      loading.dismiss();
		      
		    }, err => {
		      console.log(err);
		      loading.dismiss();
		    });
		});
	    
  	}
  	async doRefresh(event){
  		this.getSend();
  		setTimeout(() => {
	      console.log('Async operation has ended');
	      event.target.complete();
	    }, 1000);
  	}
}
