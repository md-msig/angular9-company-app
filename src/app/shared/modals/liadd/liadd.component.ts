import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigService } from './../../../shared/services/config.service';
import { NGXToastrService } from './../../../shared/services/toastr.service'
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

interface DialogData {
  email: string;
}

@Component({
  selector: 'app-liadd',
  templateUrl: './liadd.component.html',
  styleUrls: ['./liadd.component.scss'],
  providers: [NGXToastrService]
})
export class LiAddComponent implements OnInit {

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<LiAddComponent>,
    public configservice: ConfigService,
    private http: HttpClient,
    private toastr_service: NGXToastrService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  headers = this.configservice.headers;
  addLicenseForm: FormGroup;
  isSubmitted = false;

  ngOnInit() {
    this.addLicenseForm = this.fb.group({
      // companyGroupName: ['', Validators.required],
      module: [''],
      companyLicenseCount: [0],
      locationLicenseCount: [0],
      projectLicenseCount: [0, Validators.required],
      internalUserCount: [0, Validators.required],
      externalUserCount: [''],
      licenseType: [''],
      licenseStartDate: ['', Validators.required],
      licenseEndDate: ['', Validators.required],
      dtnullDateTime: ['', Validators.required],
      dtnullError: ['']
    })
  }

  get formControls() { return this.addLicenseForm.controls; }

  onNoClick(): void {
    this.dialogRef.close();
  }

  //Add Company Group
  addLicense() {
    this.isSubmitted = true;
    if (this.addLicenseForm.invalid) {
      return;
    }
    let api = this.configservice.host_url + '/companygroup';
    this.headers = this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    return this.http.put(api, JSON.stringify(this.addLicenseForm.value), { headers: this.headers })
      .subscribe(
        (res: any) => {
          this.dialogRef.close();
          this.toastr_service.typeSuccess(this.configservice.group_added_successfully);
        },
        (err) => {
          this.toastr_service.timeout(err.error);
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
