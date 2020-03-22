import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigService } from '@shared/services/config.service';
import { NGXToastrService } from '@shared/services/toastr.service';
import { DateTimePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { DatePipe } from '@angular/common';

interface DialogData {
}

@Component({
  selector: 'app-liedit',
  templateUrl: './liedit.component.html',
  styleUrls: ['./liedit.component.scss'],
  providers: [NGXToastrService, DatePipe]
})
export class LiEditComponent implements OnInit {
  @ViewChild('ejDateTimePicker') ejDateTimePicker: DateTimePickerComponent;
  detail_data;
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<LiEditComponent>,
    public configservice: ConfigService,
    private http: HttpClient,
    private toastr_service: NGXToastrService,
    private router: Router,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.detail_data = data;
  }

  headers = this.configservice.headers;
  module_names = this.configservice.module_names;
  license_types = this.configservice.license_types;
  editLicenseForm: FormGroup;
  isSubmitted = false;
  loading = false;
  licenseStartDate; licenseEndDate; dtnullDate;

  ngOnInit() {
    // this.data.sort((a, b) => {
    //   let b_dt = b.licenseEndDate.split(' ');
    //   let a_dt = a.licenseEndDate.split(' ');
    //   b_dt[0] = b_dt[0].split('-').reverse().join('-');
    //   b_dt = b_dt.join(' ');

    //   a_dt[0] = a_dt[0].split('-').reverse().join('-');
    //   a_dt = a_dt.join(' ');
    //   return new Date(b_dt).getTime() - new Date(a_dt).getTime();
    // });
    if (this.detail_data.licenseStartDate) {
      let temp_dt = this.detail_data.licenseStartDate.split(' ');
      let temp_d = temp_dt[0].split('-');
      let temp_t = temp_dt[1].split(':');
      this.licenseStartDate = new Date(temp_d[2], temp_d[1] -1, temp_d[0], temp_t[0], temp_t[1], temp_t[2]);
    }
    if (this.detail_data.licenseEndDate) {
      let temp_dt = this.detail_data.licenseEndDate.split(' ');
      let temp_d = temp_dt[0].split('-');
      let temp_t = temp_dt[1].split(':');
      this.licenseEndDate = new Date(temp_d[2], temp_d[1] -1, temp_d[0], temp_t[0], temp_t[1], temp_t[2]);
    }
    if (this.detail_data.dtnullDate) {
      let temp_dt = this.detail_data.dtnullDate.split(' ');
      let temp_d = temp_dt[0].split('-');
      let temp_t = temp_dt[1].split(':');
      this.dtnullDate = new Date(temp_d[2], temp_d[1] -1, temp_d[0], temp_t[0], temp_t[1], temp_t[2]);
    }

    this.editLicenseForm = this.fb.group({
      companyGroupId: [this.detail_data.companyGroupId],
      companyLicenseCount: [this.detail_data.companyLicenseCount, [Validators.required, Validators.maxLength(2)]],
      locationLicenseCount: [this.detail_data.locationLicenseCount, [Validators.required, Validators.maxLength(2)]],
      projectLicenseCount: [this.detail_data.projectLicenseCount, [Validators.required, Validators.maxLength(2)]],
      custInternalLicenseMaxCount: [this.detail_data.custInternalLicenseMaxCount, [Validators.required, Validators.maxLength(3)]],
      custExternalLicenseMaxCount: [this.detail_data.custExternalLicenseMaxCount, [Validators.required, Validators.maxLength(4)]],
      licenseType: [this.detail_data.licenseType, Validators.required],
      licenseStartDate: [this.licenseStartDate, Validators.required],
      licenseEndDate: [this.licenseEndDate, Validators.required],
      dtnullDate: [this.dtnullDate, Validators.required],
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
    this.editLicenseForm.value.licenseStartDate = this.datePipe.transform(this.editLicenseForm.value.licenseStartDate, 'dd-MM-yyyy HH:mm:ss');
    this.editLicenseForm.value.licenseEndDate = this.datePipe.transform(this.editLicenseForm.value.licenseEndDate, 'dd-MM-yyyy HH:mm:ss');
    this.editLicenseForm.value.dtnullDate = this.datePipe.transform(this.editLicenseForm.value.dtnullDate, 'dd-MM-yyyy HH:mm:ss');
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
