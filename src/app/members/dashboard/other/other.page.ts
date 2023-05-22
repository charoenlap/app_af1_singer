import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { RestApiService } from '../../../rest-api.service';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-other',
  templateUrl: 'other.page.html',
  styleUrls: ['other.page.scss']
})
export class otherPage {

	firstname:any;
	lastname: any;
	nickname: any;
  emp_key: any;
  	constructor(private storage: Storage,private authService: AuthenticationService) {
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
      this.storage.get('emp_key').then((val) => {
        this.emp_key = val;
      });
  	}
  	logout() {
    this.authService.logout();
  }
}
