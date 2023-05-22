import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthenticationService } from './../../services/authentication.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 	id_card: any;
  	emp_key: any;
  	password: any;

  constructor(private authService: AuthenticationService,private navCtrl: NavController) { }
 
  ngOnInit() {
  }
 
  loginForm() {
  	// console.log(this.id_card);
    this.authService.login(this.id_card,this.emp_key,this.password);
  }
 
}