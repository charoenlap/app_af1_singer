import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';

const TOKEN_KEY = 'af1';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);
  // formLogin: FormGroup;
  loginDetail: any;
  constructor(private storage: Storage, 
    private plt: Platform,
    public api: RestApiService, 
    public loadingController: LoadingController,
    private formBuilder: FormBuilder,
    public toastController: ToastController) { 
    this.plt.ready().then(() => {
      this.checkToken();
    });
    // this.formLogin = this.formBuilder.group({
    //   'id_card' : [null, Validators.required]
    // });
  }
 
  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }
 
  async login(id_card:string,emp_key:string,password:string) {

    const loading = await this.loadingController.create({
    // content: 'Loading'
    });
    await loading.present();
    await this.api.empLogin(id_card,emp_key,password).subscribe(res => {
      // console.log(res);
      this.loginDetail = res;
      // console.log(this.loginDetail);
      loading.dismiss();
      if(this.loginDetail.result=='success'){
        this.storage.set('id', this.loginDetail.id);
        this.storage.set('phone', this.loginDetail.phone);
        this.storage.set('address', this.loginDetail.address);
        this.storage.set('emp_key', this.loginDetail.emp_key);
        console.log(this.loginDetail.emp_key);
        this.storage.set('title', this.loginDetail.title);
        this.storage.set('firstname', this.loginDetail.firstname);
        this.storage.set('lastname', this.loginDetail.lastname);
        this.storage.set('nickname', this.loginDetail.nickname);
        return this.storage.set(TOKEN_KEY, this.loginDetail.emp_key).then(() => {
          this.authenticationState.next(true);
        });
      }else{
        this.alert();
        return this.storage.remove(TOKEN_KEY).then(() => {
          this.authenticationState.next(false);
        });
      }
      
    }, err => {
      console.log(err);
      loading.dismiss();
    });
    
  }
   async alert(){
     const toast = await this.toastController.create({
          message: 'Login fail.',
          duration: 2000
        });
        toast.present();
   }
  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }
}
