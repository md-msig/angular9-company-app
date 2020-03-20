import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigService } from '@shared/services/config.service';
import { NGXToastrService } from '@shared/services/toastr.service';

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
  loading = false;

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
      licenseEndDate: [this.detail_data.licenseEndDate, Validators.required],
      dtnullDate: [this.detail_data.dtnullDate, Validators.required],
      dtnullError: [this.detail_data.dtnullError, [Validators.required, Validators.maxLength(200)]]
    }, { updateOn: 'blur' });
  }

  reloadWindow() {
    this.router.navigateByUrl('/').then(
      () => { this.router.navigateByUrl('license'); });
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
    this.loading = true;
    this.editLicenseForm.value.licenseType = this.editLicenseForm.value.licenseType.toLowerCase();
    this.editLicenseForm.value.companyLicenseCount = parseInt(this.editLicenseForm.value.companyLicenseCount);
    this.editLicenseForm.value.locationLicenseCount = parseInt(this.editLicenseForm.value.locationLicenseCount);
    this.editLicenseForm.value.projectLicenseCount = parseInt(this.editLicenseForm.value.projectLicenseCount);
    this.editLicenseForm.value.custInternalLicenseMaxCount = parseInt(this.editLicenseForm.value.custInternalLicenseMaxCount);
    this.editLicenseForm.value.custExternalLicenseMaxCount = parseInt(this.editLicenseForm.value.custExternalLicenseMaxCount);
    let api = this.configservice.host_url + '/license/' + licenseId;
    return this.http.patch(api, JSON.stringify(this.editLicenseForm.value), { headers: this.headers })
      .subscribe(
        (res: any) => {
        },
        (err) => {
          if (err.status == "202") {
            this.dialogRef.close();
            this.toastr_service.typeSuccess(this.configservice.license_updated_successfully);
            this.reloadWindow();
          } else {
            this.toastr_service.timeout("Some errors are occured!");
          }
        }
      )
  }
}
