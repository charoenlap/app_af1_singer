import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';


	const httpOptions = {
  		headers: new HttpHeaders({'Content-Type': 'application/json'})
	};
// const apiUrl = "http://af1express.com/api/ajax/api_app.php?type=";
const apiUrl = "http://localhost/af1/web/public_html/api/ajax/api_app.php?type=";
// const apiUrl = "http://localhost/af1_web/public_html/api/ajax/api_app.php?type=";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  	constructor(private http: HttpClient) { }
  	private handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
		    // A client-side or network error occurred. Handle it accordingly.
		    console.error('An error occurred:', error.error.message);
		} else {
		    // The backend returned an unsuccessful response code.
		    // The response body may contain clues as to what went wrong,
		    console.error(
		      `Backend returned code ${error.status}, ` +
		      `body was: ${error.error}`);
		}
	  // return an observable with a user-facing error message
	  return throwError('Something bad happened; please try again later.');
	}

	private extractData(res: Response) {
	  	let body = res;
	  	return body || { };
	}
	empLogin(id_card: string,emp_key: string,password: string): Observable<any> {
	    const url = `${apiUrl}login&id_card=${id_card}&emp_key=${emp_key}&password=${password}`;
	    console.log(url);
		return this.http.get(url).pipe(
	      map(this.extractData),catchError(this.handleError)
	    );
	}
	getJob(emp_key: string): Observable<any> {
	    const url = `${apiUrl}getJob&msg_key=${emp_key}`;
	    console.log(url);
		return this.http.get(url).pipe(
	      map(this.extractData),catchError(this.handleError)
	    );
	}
	getJobDetail(id: string): Observable<any> {
	    const url = `${apiUrl}getJobDetail&id=${id}`;
	    console.log(url);
		return this.http.get(url).pipe(
	      map(this.extractData),catchError(this.handleError)
	    );
	}
	getJobDetailCount(id: string): Observable<any> {
	    const url = `${apiUrl}getJobDetailCount&id=${id}`;
	    console.log(url);
		return this.http.get(url).pipe(
	      map(this.extractData),catchError(this.handleError)
	    );
	}
	getSend(emp_key: string): Observable<any> {
	    const url = `${apiUrl}getSend&msg_key=${emp_key}`;
	    console.log(url);
		return this.http.get(url).pipe(
	      map(this.extractData),catchError(this.handleError)
	    );
	}
	getSendDetail(id: string): Observable<any> {
	    const url = `${apiUrl}getSendDetail&id=${id}`;
	    console.log(url);
		return this.http.get(url).pipe(
	      map(this.extractData),catchError(this.handleError)
	    );
	}
	
	deleteJob(message: string): Observable<any> {
	    const url = `${apiUrl}deleteJob&id=${message}`;
		return this.http.get(url).pipe(
	      map(this.extractData),catchError(this.handleError)
	    );
	}
	updateJob(id: string,status: string): Observable<any> {
	    const url = `${apiUrl}updateBooking&id=${id}&status=${status}`;
		return this.http.get(url).pipe(
	      map(this.extractData),catchError(this.handleError)
	    );
	}
	confirmJob(formData:FormData,booking_id: string,barcode: string,comment: string,kycNo: string): Observable<any> {
	    const url = `${apiUrl}confirmJob&booking_id=`+booking_id+`&barcode=`+barcode+`&comment=`+comment+`&kycNo=`+kycNo;
	    console.log(url);
	    // return this.http.post(url, formData, httpOptions).pipe(
     //    	map(this.extractData),catchError(this.handleError)
     //    );
     	return  this.http.post<string>(url, formData);
	}
	updateSend(id: string,status: string): Observable<any> {
	    const url = `${apiUrl}updateSend&id=${id}&status=${status}`; 
	    console.log(url);
		return this.http.get(url).pipe(
	      map(this.extractData),catchError(this.handleError)
	    );
	}
	confirmSend(formData:FormData,jobs_id: string,barcode: string): Observable<any> {
	    const url = `${apiUrl}confirmSend&jobs_id=`+jobs_id+`&barcode=`+barcode;
	    console.log(url);
	    return  this.http.post<string>(url, formData);
	}

	saveConnote(formData:FormData,booking_id: string,barcode: string): Observable<any> {
	    const url = `${apiUrl}saveConnote&booking_id=`+booking_id+`&barcode=`+barcode;
	    // console.log(url);
	    return  this.http.post<string>(url, formData);
	}
	testpost(formData:FormData){
		const url = `http://af1express.com/testcode/index.php`;
  		// 		return this.http.post(url, { test: 11 }, httpOptions).pipe(
	 //      catchError(this.handleError)
	 //    );
		return  this.http.post<string>(url, formData);
		// let headerOptions: any = { 'Content-Type': 'application/json' };
		// let headers = new Headers(headerOptions);
		// console.log(111);
		// let a = {
		// 	test:1111
		// };	
	 	//    const url = `http://af1express.com/testcode/index.php`;
	 	//    return this.http.post(url, JSON.stringify(a), httpOptions).pipe(
		  //       	map(this.extractData),catchError(this.handleError)
		  //       );
		  // 		this.http.post("http://af1express.com/testcode/index.php", "test=parameter").subscribe(data => {
		//     console.log(data);
		// }, error => {
		//     console.log(JSON.stringify(error.json()));
		// });
	}
	createJob(connote_id: string, id: string): Observable<any> {
	    const url = `${apiUrl}createJob&connote_id=${connote_id}&id=${id}`; 
		return this.http.get(url).pipe(
	      map(this.extractData),catchError(this.handleError)
	    );
	}
	// confirmJob(): Observable<any> {
		// &signature=${signature}&file=${file}
	    // const url = `${apiUrl}confirmJob&id_book=${id_book}&connote_new=${connote_new}`;
	    // return url;
	    // var result = this.http.get(url).pipe(
	    //   map(this.extractData),catchError(this.handleError)
	    // );

	    // var headers = new Headers();
	    // headers.append("Accept", 'application/json');
	    // headers.append('Content-Type', 'application/x-www-form-urlencoded');
	    // headers.append('Access-Control-Allow-Origin' , '*');
    	// headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
	    // let options = new RequestOptions({ headers: headers });

	    // let params = { 
	    //   signature: signature,
	    //   file: file
	    // };
	    // var result = this.http.post(url, params,{
	    //   	headers: { 
	    //   		'Content-Type': 'application/json',
	    //   		'Accept': 'application/json',
	    //   		'Access-Control-Allow-Origin' : '*',
	    //   		'Access-Control-Allow-Methods': 'POST'
	    // 	}
	    // }).toPromise();
	    // add job
	    // console.log(result);
	    // 	var headers = new Headers();
		   //   headers.append("Accept", 'application/json');
		   //   headers.append('Content-Type', 'application/json' );


		   //  let postData =  {
		   //      signature: signature,
	    //   		file: file
		  	// }

		   //    this.http.post(url, postData,{observe: 'response'})
		   //     .subscribe(data => {
		   //       return data;

		   //      }, error => {
		   //       return error;
		   //     });
	// }
}
