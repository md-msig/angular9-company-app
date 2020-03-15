import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigService } from './../../../shared/services/config.service';
import { NGXToastrService } from './../../../shared/services/toastr.service'
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

interface DialogData {
}

@Component({
  selector: 'app-comedit',
  templateUrl: './comedit.component.html',
  styleUrls: ['./comedit.component.scss'],
  providers: [NGXToastrService]
})
export class ComEditComponent implements OnInit {
  detail_data;
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<ComEditComponent>,
    public configservice: ConfigService,
    private http: HttpClient,
    private toastr_service: NGXToastrService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.detail_data = data;
  }

  headers = this.configservice.headers;
  editCompanyGroupForm: FormGroup;
  isSubmitted = false;

  ngOnInit() {
    this.editCompanyGroupForm = this.fb.group({
      companyGroupName: [this.detail_data.companyGroupName, Validators.required],
      websiteUrl: [this.detail_data.websiteUrl],
      primaryContactEmail: [this.detail_data.primaryContactEmail],
      primaryContactPhone: [this.detail_data.primaryContactPhone],
      maxDevicePerUserCount: [this.detail_data.maxDevicePerUserCount, Validators.required],
      failedLoginAttemptsToLockUser: [this.detail_data.failedLoginAttemptsToLockUser, Validators.required],
      hqStreet1: [this.detail_data.hqStreet1],
      hqStreet2: [this.detail_data.hqStreet2],
      hqCity: [this.detail_data.hqCity, Validators.required],
      hqState: [this.detail_data.hqState, Validators.required],
      hqCountry: [this.detail_data.hqCountry, Validators.required],
      hqPostalCode: [this.detail_data.hqPostalCode],
      isActive: [true] //should be changed
    })
  }

  get formControls() { return this.editCompanyGroupForm.controls; }

  onNoClick(): void {
    this.dialogRef.close();
  }

  //Add Company Group
  editCompanyGroup(group_id) {
    this.isSubmitted = true;
    if (this.editCompanyGroupForm.invalid) {
      return;
    }
    let api = this.configservice.host_url + '/companygroup/' + group_id;
    this.headers = this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    return this.http.patch(api, JSON.stringify(this.editCompanyGroupForm.value), { headers: this.headers })
      .subscribe(
        (res: any) => {
        },
        (err) => {
          if(err.status == "202" && err.error.text == "Company Modified") {
            this.dialogRef.close();
            this.toastr_service.typeSuccess(this.configservice.group_updated_successfully);
          } else {
            this.toastr_service.timeout(err.error.text);
          }
        }
      )
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
