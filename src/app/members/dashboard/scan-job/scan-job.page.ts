import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

import { RestApiService } from '../../../rest-api.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan-job.page.html',
  styleUrls: ['./scan-job.page.scss'],
})
export class ScanJobPage implements OnInit {
  barcode: any;
  textPrint:any;
  barcodePush:any=[];
  connote_new:any=[];
  options:any;
  check_loop:any;
  count_connote:number=0;
  emp_key:any;
  sends:any;
  constructor(
    public api: RestApiService,
    private barcodeScanner: BarcodeScanner,
    private toast: Toast,
    private storage: Storage,
    public router: Router,
    public route: ActivatedRoute,
    public loadingController: LoadingController,
    public toastController: ToastController) { }

  ngOnInit() {
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
  async rmBarcode(message: string){
    const loading = await this.loadingController.create({ });
    await loading.present();
    this.api.deleteJob(message).subscribe(res => {
      console.log(res);
      if(res.result=="success"){
        this.count_connote = Number(this.count_connote) - 1;
        if(this.count_connote<0){
              this.count_connote = 0;
            }
        const index: number = this.barcodePush.indexOf(message);
        if (index !== -1) {
            this.barcodePush.splice(index, 1);
        }
        loading.dismiss();
        // this.router.navigateByUrl('/members/dashboard/job');
        // this.router.navigate(['/members/dashboard/job']);
      
        this.alert(res.result+" "+res.desc);
      }else{
        this.alert(res.result+" "+res.desc);
      }
      
    }, err => {
      this.alert(err);
      console.log(err);
      loading.dismiss();
    });

    
    // delete [this.barcodePush.indexOf(message)];
  }
  scan() {
    this.options = {
      // formats: "QR_CODE",
      prompt : "พยายามวางบาร์โค้ดไว้ตรงกลางจอ",
      // orientation : "landscape",
      disableSuccessBeep: false,
      resultDisplayDuration: 500,
      saveHistory: true,
      // torchOn: true,
      showTorchButton : true,
      showFlipCameraButton : true,
      // preferFrontCamera : false
    }
  	this.barcodeScanner.scan(this.options).then((barcodeData) => {
  		this.barcode = barcodeData.text;
      if (barcodeData.cancelled) {
        console.log("User cancelled the action!");
        return false;
      }
      this.check_loop = 0;
      if(this.barcode!=''){
        this.barcodePush.forEach((snap) => {
          if(snap==this.barcode){
            this.check_loop = 1;
          }
        });
        if(this.check_loop == 0){

          this.sendData(this.barcode);

          this.toast.show(barcodeData.text, '200', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        }else{
          this.alert(this.barcode + ' ' + 'Dupplicate.');
        }
      }
      
      // this.barcode = '';
  	}, (err) => {
    	this.toast.show(err, '5000', 'center').subscribe(
	      toast => {
	        console.log(toast);
	      }
	    );
	  });
  }
  
  
  async submitForm(){
    if(this.barcode!=''){
      this.sendData(this.barcode);
      // this.barcodePush.push(this.barcode);
      // // this.barcodePush.push(this.barcode);
      this.storage.set('keyOfDataJob', JSON.stringify(this.barcodePush));
      // // // this.alert(this.barcode);
      // this.connote_new.push(this.barcode);

      // // Start 
      // this.storage.get('emp_key').then((val) => {
      //   this.emp_key = val.toString();
      // });
      // const loading = await this.loadingController.create({
      // // content: 'Loading'
      // });
      // await loading.present();
      // await this.api.createJob(this.barcode,this.emp_key)
      // .subscribe(res => {
      //   console.log(res);
      //   // this.barcodePush.push(this.barcode);
      //   // alert(res.result);
      //   this.alert(res.result);

      //   // this.getJobDetail();
      //   loading.dismiss();
      //   // this.router.navigateByUrl('/members/dashboard/job');
      //   // this.router.navigate(['/members/dashboard/job']);
      // }, err => {
      //   console.log(err);
      //   loading.dismiss();
      // });
      // // End

      // // console.log(this.connote_new);
      // this.barcode = '';
    }


    


    this.storage.get('keyOfDataJob').then((val) => {
      if(val!=''){
        this.connote_new = JSON.parse(val);
      }
    });
  	// this.toast.show('Submit', '200', 'center').subscribe(
   //    toast => {
   //      // console.log(toast);
   //    }
   //  );
   // this.storage.get('keyOfDataJob').then((val) => {
   //    console.log(val);
   //    // this.textPrint = JSON.parse(val);
   //  });
  }
  async sendData(barcode){

    var duplicate = false;  
    for (var i = 0; i <= this.barcodePush.length - 1; i++) {
      if(this.barcodePush[i]==this.barcode){
        duplicate = true;
      }
    }
    if(duplicate){

    }else{
      const loading = await this.loadingController.create({ });
      await loading.present();
      // Start 
      this.storage.get('emp_key').then((val) => {
        this.emp_key = val;
        this.api.createJob(barcode,this.emp_key).subscribe(res => {
          if(res.result=="success"){
          
            // this.storage.set('keyOfData', JSON.stringify(this.barcodePush));
          
            this.connote_new.push(this.barcode);




            // console.log(res);
            this.count_connote = Number(this.count_connote) + 1;

            // alert(res.result);
            this.alert(res.result+' '+res.desc+' '+this.barcode);
            this.barcodePush.push(this.barcode);
            // this.barcodePush.push(barcode);
            // this.getJobDetail();
            
            loading.dismiss();
            // this.scan();
            // this.router.navigateByUrl('/members/dashboard/job');
            // this.router.navigate(['/members/dashboard/job']);
          }else{
            this.alert(res.result+" "+res.desc);
            loading.dismiss();
          }
          
        }, err => {
          this.alert(err);
          console.log(err);
          loading.dismiss();
        });
      });
    }
    // End
  }
  removeBarcode(){
    // this.storage.set('keyOfDataJob', '');
  }
  async alert(result){
     const toast = await this.toastController.create({
          message: 'Add connote '+result,
          duration: 2000
        });

        toast.present();
   }
   
}
