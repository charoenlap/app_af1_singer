import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { RestApiService } from '../../../rest-api.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router  } from '@angular/router';

@Component({
  selector: 'app-job',
  templateUrl: 'job.page.html',
  styleUrls: ['job.page.scss']
})
export class jobPage {
	emp_key:any;
	jobs:any;
  	constructor(public loadingController: LoadingController,public api: RestApiService,private storage: Storage,public router: Router) {
  		this.getJob();
  	}
  	ionViewWillEnter(){
	    this.getJob();
	}
  	async getJob(){
  		const loading = await this.loadingController.create({
	    // content: 'Loading'
	    });
	    this.jobs = [];
	    await loading.present();
	    this.storage.get('emp_key').then((val) => { 
		    this.api.getJob(val).subscribe(res => {
		      if(res.result=='success'){
		      	this.jobs = res.data;
		      }
		      loading.dismiss();
		      
		    }, err => {
		      console.log(err);
		      loading.dismiss();
		    });
		});
	    
  	}
  	async doRefresh(event){
  		this.getJob();
  		setTimeout(() => {
	      console.log('Async operation has ended');
	      event.target.complete();
	    }, 1000);
  	}
}
