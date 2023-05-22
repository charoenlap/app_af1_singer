import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-scansend',
  templateUrl: './scansend.page.html',
  styleUrls: ['./scansend.page.scss'],
})
export class ScansendPage implements OnInit {
  barcode: any;
  textPrint:any;
  barcodePush:any=[];
  constructor(
  private barcodeScansendner: BarcodeScanner,
  private toast: Toast,
  private storage: Storage,
  public toastController: ToastController) { }

  ngOnInit() {
  	this.scansend();
  }
  
  scansend() {
  	this.barcodeScansendner.scan().then((barcodeData) => {
  		this.barcode = barcodeData.text;
    	this.toast.show(barcodeData.text, '200', 'center').subscribe(
	      toast => {
	        console.log(toast);
	      }
	    );
  	}, (err) => {
    	this.toast.show(err, '5000', 'center').subscribe(
	      toast => {
	        console.log(toast);
	      }
	    );
	  });
  }
  removeBarcode(){
    this.storage.set('keyOfDataSend', '');
  }
  submitForm(){
    this.barcodePush.push(this.barcode);

    this.storage.set('keyOfDataSend', JSON.stringify(this.barcodePush));
    this.alert(this.barcode);
    this.barcode = '';

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
  async alert(result){
     const toast = await this.toastController.create({
          message: 'Add '+result+' success',
          duration: 2000
        });
        toast.present();
   }
   
}
