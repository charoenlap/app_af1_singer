import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { Camera } from '@ionic-native/Camera/ngx';
import { RestApiService } from '../../../rest-api.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-send-confirm',
  templateUrl: './send-confirm.page.html',
  styleUrls: ['./send-confirm.page.scss'],
})
export class SendConfirmPage implements OnInit {
	signature = '';
  	isDrawing = false;
  	sendDetail: any;
  	connote_new: any;
  	connote_new_string_url: any;
  	objVal: any;
    comment: any;
  	@ViewChild('signatureCanvas', {static: true}) signaturePad: SignaturePad;
	public signaturePadOptions: Object = { 
	    'minWidth': 2,
	    'canvasWidth': 400,
	    'canvasHeight': 200,
	    'backgroundColor': '#f6fbff',
	    'penColor': '#666a73'
	};
	base64Image: any;
	picture: any;
  	constructor(public navController: NavController, 
  		public storage: Storage, public toastCtrl: ToastController, 
  		public api: RestApiService, 
    	public loadingController: LoadingController,
  		public camera: Camera,
  		public route: ActivatedRoute,
  		public http: HttpClient,
      public router: Router) { }

  	ngOnInit() {
  	}

  	ionViewDidEnter() {
    // this.signaturePad.clear()
    	
    	this.storage.get('savedSignature').then((data) => {
      	this.signature = data;
    });
  }
 
  drawComplete() {
    this.isDrawing = false;
  }
 
  drawStart() {
    this.isDrawing = true;
  }
 
  async savePad() {
    this.signature = this.signaturePad.toDataURL('png',80);
    this.storage.set('savedSignature', this.signature);
    this.base64Image;

    const loading = await this.loadingController.create({
    // content: 'Loading'
    });
    this.connote_new_string_url = '';
    this.storage.get('keyOfDataSend').then((val) => {
    	// console.log('val = '+JSON.parse(val));
    	this.objVal = val;

    	// console.log(this.objVal);
    	// for (let entry in this.objVal){
    	// 	// this.
    	// 	// console.log(this.objVal[entry]['barcode']);
    	// 	if(this.objVal[entry]['barcode']!=''){
	    // 		this.connote_new_string_url += ','+this.objVal[entry]['barcode'];
	    // 	}
    	// }
    	// console.log(this.connote_new_string_url);
    	// console.log(this.connote_new_string_url);
      // console.log(JSON.parse(val));
      // this.textPrint = JSON.parse(val);
    });
    await loading.present();
    // var headers = new Headers();
     // headers.append("Accept", 'application/json');
     // headers.append('Content-Type', 'application/x-www-form-urlencoded' );
     // console.log(this.route.snapshot.paramMap.get('id'));
    if(this.signature){
      this.signature = this.signature.replace(/data/gi , ""); 
    }
    
    if(this.base64Image){
      this.base64Image = this.base64Image.replace(/data/gi , ""); 
    }
    const formData = new FormData();
    formData.append('signature' ,this.signature);
    formData.append('barcode',this.objVal);
    formData.append('image',this.base64Image);
    formData.append('comment',this.comment);
    formData.append('jobs_id',this.route.snapshot.paramMap.get('id'));

    await this.api.confirmSend(formData,this.route.snapshot.paramMap.get('id'),this.objVal).subscribe(res => {
        // console.log('>');
        // console.log(res.result);
        // console.log('<');
        this.sendDetail = res;
        this.storage.set('keyOfDataSend', '');
        loading.dismiss();
        console.log(res);
        if(res.result=="success"){
          this.router.navigate(['members/dashboard/send']);
        }
        // console.log(this.sendDetail);

    }, err => {
      console.log(err);
      loading.dismiss();
    });
   //  let postData =  {
   //      signature: this.signature,
  	// 	file: this.base64Image,
  	// 	id_book:this.route.snapshot.paramMap.get('id'),
  	// 	connote_new:this.connote_new_string_url
  	// }

   //    this.http.post('http://af1express.com/api/ajax/post_job.php', postData,{observe: 'response'})
   //     .subscribe(data => {
   //     	console.log(data);
   //      }, error => {
   //       // return error;
   //     });
    // await this.api.confirmJob(this.route.snapshot.paramMap.get('id'),this.signature,this.base64Image,this.connote_new_string_url).subscribe(res => {
    //   // console.log(res);
    //   this.sendDetail = res;
    //   // console.log(this.loginDetail);
    //   loading.dismiss();
    //   console.log(this.sendDetail);
    //   if(this.sendDetail.result=='success'){
        
    //   }
    // }, err => {
    //   console.log(err);
    //   loading.dismiss();
    // });
    // console.log(this.signature);
    // // this.signaturePad.clear();
    // let toast = this.toastCtrl.create({
    //   message: 'New Signature saved.',
    //   duration: 3000
    // });
    // toast.present();
  }
 
  	clearPad() {
    	// this.signaturePad.clear();
  	}
  	AccessCamera(){

	 this.camera.getPicture({

	 targetWidth:512,

	 targetHeight:512,

	 correctOrientation:true,

	 sourceType: this.camera.PictureSourceType.CAMERA,

	 destinationType: this.camera.DestinationType.DATA_URL

	   }).then((imageData) => {

	     this.base64Image = 'data:image/jpeg;base64,'+imageData;

	     this.picture = imageData;

	         }, (err) => {

	     console.log(err);

	   });

	}

	AccessGallery(){

	 this.camera.getPicture({

	    sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,

	    destinationType: this.camera.DestinationType.DATA_URL

	   }).then((imageData) => {

	     this.base64Image = 'data:image/jpeg;base64,'+imageData;

	     this.picture = imageData;

	        }, (err) => {

	     console.log(err);

	   });

	}
	Upload(){
	  	// var headers = new Headers();
	  	// headers.append("Accept", "application/json");
	  	// headers.append("Content-Type", "application/json" );

	  // let options = new RequestOptions({ headers: headers });

	    // let data = {

	    

	    // };

	  // let loader = this.loading.create({

	  // content: "Processing please wait…",

	// });
	}
}
