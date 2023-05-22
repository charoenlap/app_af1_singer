import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { RestApiService } from '../../../rest-api.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-feed',
  templateUrl: 'feed.page.html',
  styleUrls: ['feed.page.scss']
})
export class feedPage {
	firstname:any;
	lastname: any;
	nickname: any;
  	constructor(private storage: Storage) {
  		this.getVal();
  	}
  	async getVal(){
  		this.storage.get('firstname').then((val) => {
		    this.firstname = val;
		});
		this.storage.get('lastname').then((val) => {
		    this.lastname = val;
		});
		this.storage.get('nickname').then((val) => {
		    this.nickname = val;
		});
  	}
  	
}
