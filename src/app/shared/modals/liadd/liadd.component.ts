import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigService } from '@shared/services/config.service';
import { NGXToastrService } from '@shared/services/toastr.service';
import { DateTimePickerComponent } from '@syncfusion/ej2-angular-calendars';

interface DialogData {
  email: string;
}

@Component({
  selector: 'app-liadd',
  templateUrl: './liadd.component.html',
  styleUrls: ['./liadd.component.scss'],
  providers: [NGXToastrService, DatePipe]
  
})
export class LiAddComponent implements OnInit {
  @ViewChild('ejDateTimePicker') ejDateTimePicker: DateTimePickerComponent;
  public placeholder: String = 'Select date and time';
  group_filter;
  companyName;

  headers = this.configservice.headers;
  addLicenseForm: FormGroup;
  module_names = this.configservice.module_names;
  license_types = this.configservice.license_types;
  isSubmitted = false;
  loading = false;
  serverCpu = this.configservice.serverCpu;
  serverIp = this.configservice.serverIp;
  serverMac = this.configservice.serverMac;
  str_date;
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<LiAddComponent>,
    public configservice: ConfigService,
    private http: HttpClient,
    private toastr_service: NGXToastrService,
    private datePipe: DatePipe,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.group_filter = this.configservice.group_filter;
      this.companyName = this.configservice.companyName;
      let myDate = new Date();
      this.str_date = this.datePipe.transform(myDate, 'dd-MM-yyyy hh:mm:ss');
  }

  ngOnInit() {
    this.addLicenseForm = this.fb.group({  
      companyGroupId: [this.group_filter],
      moduleName: ['', Validators.required],
      companyLicenseCount: [0, [Validators.required, Validators.maxLength(2)]],
      locationLicenseCount: [0, [Validators.required, Validators.maxLength(2)]],
      projectLicenseCount: [0, [Validators.required, Validators.maxLength(2)]],
      custInternalLicenseMaxCount: [0, [Validators.required, Validators.maxLength(3)]],
      custExternalLicenseMaxCount: [0, [Validators.required, Validators.maxLength(4)]],
      licenseType: ['named', Validators.required],
      // licenseStartDate: [this.str_date, Validators.required],
      // licenseEndDate: [this.str_date, Validators.required],
      licenseStartDate: ['', Validators.required],
      licenseEndDate: ['', Validators.required],
      serverCpu: [this.serverCpu],
      serverIp: [this.serverIp],
      serverMac: [this.serverMac],
      dtnullDate: [this.str_date, Validators.required],
      dtnullError: ['', [Validators.required, Validators.maxLength(200)]],
    }, {updateOn: 'blur'});
  }

  reloadWindow() {
    this.router.navigateByUrl('/').then(
      () => { this.router.navigateByUrl('license'); });
  }

  get formControls() { return this.addLicenseForm.controls; }

  onNoClick(): void {
    this.dialogRef.close();
  }

  //Add Module License
  addModuleLicense() {
    this.isSubmitted = true;
    if (this.addLicenseForm.invalid) {
      return;
    }
    this.loading = true;
    let api = this.configservice.host_url + '/license';
    return this.http.put(api, JSON.stringify(this.addLicenseForm.value), { headers: this.headers })
      .subscribe(
        (res: any) => {
        },
        (err) => {
          if(err.status == "202") {
            this.dialogRef.close();
            this.toastr_service.typeSuccess(this.configservice.license_added_successfully);
            this.reloadWindow();
          } else if(err.status == "400"){
            this.toastr_service.timeout("Company Group is disabled.");
          }
        }
      )
  }
}
