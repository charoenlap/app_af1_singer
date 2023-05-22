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
  templateUrl: './scan-barcode-job.page.html',
  styleUrls: ['./scan-barcode-job.page.scss'],
})
export class ScanBarcodeJobPage implements OnInit {
  emp_key:any;
  barcode: any;
  textPrint:any;
  barcodePush:any=[];
  connote_new:any=[];
  options:any;
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
  	this.scan();
  }
  
  scan() {
    this.options = {
      // formats: "QR_CODE",
      prompt : "Place a barcode inside the scan area",
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
      if(this.barcode!=''){
        this.barcodePush.push(this.barcode);
        // console.log(this.barcodePush);
        this.storage.set('keyOfDataJob', JSON.stringify(this.barcodePush));
        this.alert(this.barcode);
        this.connote_new.push(this.barcode);
        
        this.sendData(this.barcode);

      }
      this.scan();
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
      // // this.storage.set('keyOfDataJob', JSON.stringify(this.barcodePush));
      // // // this.alert(this.barcode);
      // // this.connote_new.push(this.barcode);

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


    


    // this.storage.get('keyOfDataJob').then((val) => {
    //   if(val!=''){
    //     this.connote_new = JSON.parse(val);
    //   }
    // });
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


    const loading = await this.loadingController.create({
    
    });
    await loading.present();
    // Start 
    this.storage.get('emp_key').then((val) => {
      this.emp_key = val;
      this.api.createJob(barcode,this.emp_key).subscribe(res => {
        console.log(res);
        // alert(res.result);
        this.alert(res.result);
        this.barcodePush.push(this.barcode);
        // this.barcodePush.push(barcode);
        // this.getJobDetail();
        loading.dismiss();
        // this.router.navigateByUrl('/members/dashboard/job');
        // this.router.navigate(['/members/dashboard/job']);
      }, err => {
        console.log(err);
        loading.dismiss();
      });
    });
    
   }
    // End
  }
  removeBarcode(){
    this.storage.set('keyOfDataJob', '');
  }
  async alert(result){
     const toast = await this.toastController.create({
          message: 'Add connote '+result,
          duration: 2000
        });

        toast.present();
   }
   
}
