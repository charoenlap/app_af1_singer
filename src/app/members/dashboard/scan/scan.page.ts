import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from '../../../rest-api.service';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
  barcodeInput: any=[];
  barcode: any;
  textPrint:any;
  barcodePush:any=[];
  connote_new:any=[];
  options:any;
  id_booking:any;
  check_loop:any;
  count_connote:number=0;
  objVal: any=[];
  connotes: any=[];
  // count_connotes: any[];
  constructor(
  private barcodeScanner: BarcodeScanner,
  public toastCtrl: ToastController, 
  public api: RestApiService, 
  private toast: Toast,
  private storage: Storage,
  public route: ActivatedRoute,
  public toastController: ToastController,
  public loadingController: LoadingController,
  public http: HttpClient,
  public router: Router) { }

  ngOnInit() {

    this.id_booking = this.route.snapshot.paramMap.get('id');
    console.log(this.id_booking);
  	// this.scan();
    this.getJobDetail();
  }
  ionViewWillEnter(){
    this.getJobDetail();
  }
  async getJobDetail() {
    const loading = await this.loadingController.create({
      // content: 'Loading'
      });
    await this.api.getJobDetail(this.route.snapshot.paramMap.get('id'))
      .subscribe(res => {
        console.log("getJobDetail");
        console.log(res);
        // this.detail = res.data;
        // console.log(res.data.connotes);
        this.connotes = res.connotes;
        console.log(res.connotes);
        this.count_connote = Number(res.count_connotes);
        console.log("start connote");
        console.log(res.count_connotes);
        // console.log(this.detail);
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
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
      this.check_loop = 0;
      if(this.barcode!=''){
        this.barcodePush.forEach((snap) => {
          if(snap==this.barcode){
            this.check_loop = 1;
          }
        });
        if(this.check_loop == 0){
          this.barcodePush.push(this.barcode);
          this.count_connote = Number(this.count_connote) + 1;
          this.storage.set('keyOfData', JSON.stringify(this.barcodePush));
          this.alert(this.barcode);
          this.connote_new.push(this.barcode);

          // this.navCtrl.push(ScanQrDetailPage, {
          //   data: this.scannedText
          // });


        	this.toast.show(barcodeData.text, '200', 'center').subscribe(
    	      toast => {
    	        console.log(toast);
    	      }
    	    );
          // this.scan();
        }else{
          this.alert(this.barcode + ' ' + 'Dupplicate.');
        }
      }
      
      this.barcode = '';
  	}, (err) => {
    	this.toast.show(err, '5000', 'center').subscribe(
	      toast => {
	        console.log(toast);
	      }
	    );
	  });
  }
  async saveConnote(){
    const loading = await this.loadingController.create({
    // content: 'Loading'
    });
    await loading.present();
    const formData = new FormData();
    formData.append('booking_id',this.route.snapshot.paramMap.get('id'));

    await this.api.saveConnote(formData,this.route.snapshot.paramMap.get('id'),this.barcodePush).subscribe(res => {
        loading.dismiss();
        // console.log("saveConnote");
        // console.log(res);
        if(res.result=="success"){
          this.alert("Success");
          this.router.navigate(['members/job-detail/'+this.route.snapshot.paramMap.get('id')]);
        }else{
          this.alert("Error booking_id: "+this.route.snapshot.paramMap.get('id'));
        }
    }, err => {
      // this.alert(err);
      console.log(err);
      loading.dismiss();
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
  async editBarcode(message: string){
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
        this.alert(res.result+" "+res.desc);
      }else{
        this.alert(res.result+" "+res.desc);
      }
      
    }, err => {
      this.alert(err);
      console.log(err);
      loading.dismiss();
    });
  }
  removeBarcode(){
    this.storage.set('keyOfData', '');
  }
  submitForm(){
    // console.log(this.barcodePush);
    this.check_loop = 0;
    if(this.barcode!=''){
      this.barcodePush.forEach((snap) => {
        if(snap==this.barcode){
          this.check_loop = 1;
        }
      });
      if(this.check_loop == 0){
        this.barcodePush.push(this.barcode);
        this.count_connote = Number(this.count_connote) + 1;
        this.storage.set('keyOfData', JSON.stringify(this.barcodePush));
        this.alert(this.barcode);
        this.connote_new.push(this.barcode);
      }else{
        this.alert(this.barcode + ' ' + 'Dupplicate.');
      }
      // console.log(this.connote_new);
      this.barcode = '';
    }
    // this.storage.get('keyOfData').then((val) => {
    //   if(val!=''){
    //     this.connote_new = JSON.parse(val);
    //   }
    // });
  	// this.toast.show('Submit', '200', 'center').subscribe(
   //    toast => {
   //      // console.log(toast);
   //    }
   //  );
   // this.storage.get('keyOfData').then((val) => {
   //    console.log(val);
   //    // this.textPrint = JSON.parse(val);
   //  });
  }
  async jobDetail(){
    this.router.navigate(['members/job-detail/'+this.route.snapshot.paramMap.get('id')]);
  }
  async alert(result){
     const toast = await this.toastController.create({
          message: 'Add connote '+result,
          duration: 2000
        });

        toast.present();
   }
   
}
