import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, } from "@angular/forms";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigService } from './../../../shared/services/config.service';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

interface DialogData {
  email: string;
}

@Component({
  selector: 'app-comadd',
  templateUrl: './comadd.component.html',
  styleUrls: ['./comadd.component.scss']
})
export class ComAddComponent implements OnInit {
  addCompanyGroupForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<ComAddComponent>,
    public configservice: ConfigService,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.addCompanyGroupForm = this.fb.group({
      companyGroupName: [''],
      websiteUrl: [''],
      primaryContactEmail: [''],
      primaryContactPhone: [''],
      maxDevicePerUserCount: [''],
      failedLoginAttemptsToLockUser: [''],
      hqStreet1: [''],
      hqStreet2: [''],
      hqCity: [''],
      hqState: [''],
      hqCountry: [''],
      hqPostalCode: [''],
      isActive: ['true'] //should be changed
    })
  }
  headers = this.configservice.headers;

  onNoClick(): void {
    this.dialogRef.close();
  }

  //Show Company Detail
  addCompanyGroup() {
    let api = this.configservice.host_url + '/companygroup';
    this.headers = this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    // console.log(this.headers);
    return this.http.put(api, JSON.stringify(this.addCompanyGroupForm.value), { headers: this.headers })
    .subscribe(
      (res: any) => {
        console.log(res);
      },
      (err) => {
        if ((err.status == '403') && (typeof err.error == 'string' && err.error == 'Invalid Username or Password.')) {
        }
      }
    )
  }

  //Get detail data from the server
  // getGroupDetail(id): Observable<any> {
  //     let api = this.configservice.host_url + '/companygroup/' + id;
  //     this.headers = this.configservice.headers.append('Authorization', 'Bearer ' + this.authservice.getToken());
  //     return this.http.get(api, { headers: this.headers }).pipe(
  //       map((res: Response) => {
  //         return res || {}
  //       }),
  //       catchError(this.handleError)
  //     )
  // }

  ngOnInit() {
  }
  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
