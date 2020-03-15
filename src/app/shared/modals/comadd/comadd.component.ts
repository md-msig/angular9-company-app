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
  selector: 'app-comadd',
  templateUrl: './comadd.component.html',
  styleUrls: ['./comadd.component.scss'],
  providers: [NGXToastrService]
})
export class ComAddComponent implements OnInit {

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<ComAddComponent>,
    public configservice: ConfigService,
    private http: HttpClient,
    private toastr_service: NGXToastrService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  headers = this.configservice.headers;
  addCompanyGroupForm: FormGroup;
  isSubmitted = false;

  ngOnInit() {
    this.addCompanyGroupForm = this.fb.group({
      companyGroupName: ['', Validators.required],
      websiteUrl: [''],
      primaryContactEmail: [''],
      primaryContactPhone: [''],
      maxDevicePerUserCount: ['5', Validators.required],
      failedLoginAttemptsToLockUser: ['5', Validators.required],
      hqStreet1: [''],
      hqStreet2: [''],
      hqCity: ['', Validators.required],
      hqState: ['', Validators.required],
      hqCountry: ['', Validators.required],
      hqPostalCode: [''],
      isActive: ['true'] //should be changed
    })
  }

  get formControls() { return this.addCompanyGroupForm.controls; }

  onNoClick(): void {
    this.dialogRef.close();
  }

  //Add Company Group
  addCompanyGroup() {
    this.isSubmitted = true;
    if (this.addCompanyGroupForm.invalid) {
      return;
    }
    let api = this.configservice.host_url + '/companygroup';
    this.headers = this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    return this.http.put(api, JSON.stringify(this.addCompanyGroupForm.value), { headers: this.headers })
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
