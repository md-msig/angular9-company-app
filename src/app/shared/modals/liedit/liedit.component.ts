import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigService } from './../../../shared/services/config.service';
import { NGXToastrService } from './../../../shared/services/toastr.service'
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

interface DialogData {
}

@Component({
  selector: 'app-liedit',
  templateUrl: './liedit.component.html',
  styleUrls: ['./liedit.component.scss'],
  providers: [NGXToastrService]
})
export class LiEditComponent implements OnInit {
  detail_data;
  company_detail;
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<LiEditComponent>,
    public configservice: ConfigService,
    private http: HttpClient,
    private toastr_service: NGXToastrService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.detail_data = data;
      
  }

  headers = this.configservice.headers;
  module_names = this.configservice.module_names;
  license_types = this.configservice.license_types;
  editLicenseForm: FormGroup;
  isSubmitted = false;

  ngOnInit() {
    this.editLicenseForm = this.fb.group({  
      companyGroupId: [this.detail_data.companyGroupId],
      companyLicenseCount: [this.detail_data.companyLicenseCount, [Validators.required, Validators.maxLength(2)]],
      locationLicenseCount: [this.detail_data.locationLicenseCount, [Validators.required, Validators.maxLength(2)]],
      projectLicenseCount: [this.detail_data.projectLicenseCount, [Validators.required, Validators.maxLength(2)]],
      custInternalLicenseMaxCount: [this.detail_data.custInternalLicenseMaxCount, [Validators.required, Validators.maxLength(3)]],
      custExternalLicenseMaxCount: [this.detail_data.custExternalLicenseMaxCount, [Validators.required, Validators.maxLength(4)]],
      licenseType: [this.detail_data.licenseType, Validators.required],
      licenseStartDate: [this.detail_data.licenseStartDate, Validators.required],
      licenseEndDate: [this.detail_data.licenseEndDate, Validators.required]
    }, {updateOn: 'blur'});
  }

  get formControls() { return this.editLicenseForm.controls; }

  onNoClick(): void {
    this.dialogRef.close();
  }

  //Add Company Group
  editModuleLicense(licenseId) {
    this.isSubmitted = true;
    if (this.editLicenseForm.invalid) {
      return;
    }
    this.editLicenseForm.value.licenseType = this.editLicenseForm.value.licenseType.toLowerCase();
    console.log(JSON.stringify(this.editLicenseForm.value.licenseType));
    let api = this.configservice.host_url + '/license/' + licenseId;
    return this.http.patch(api, JSON.stringify(this.editLicenseForm.value), { headers: this.headers })
      .subscribe(
        (res: any) => {
        },
        (err) => {
          if(err.status == "202" && err.error.text == "Module license updated successfully.") {
            this.dialogRef.close();
            this.toastr_service.typeSuccess(this.configservice.license_updated_successfully);
          } else {
            this.toastr_service.timeout(err.error.text);
          }
        }
      )
  }
}
