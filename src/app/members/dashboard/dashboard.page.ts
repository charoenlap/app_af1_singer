import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../rest-api.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
 
  constructor(private authService: AuthenticationService,public api: RestApiService) { }
 
  ngOnInit() {
  	// const formData = new FormData();
   //  formData.append('test' ,'123');
   //  formData.append('aaaa' ,'testaa');
   //  console.log('>');
   //  this.api.testpost(formData).subscribe(
   //    (res) => console.log(res),
   //    (err) => console.log(err)
   //  );
  }
 
  logout() {
    this.authService.logout();
  }
}