import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigService } from '@shared/services/config.service';
import { NGXToastrService } from '@shared/services/toastr.service';
import { Router } from '@angular/router';

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
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  headers = this.configservice.headers;
  addCompanyGroupForm: FormGroup;
  isSubmitted = false;

  ngOnInit() {
    this.addCompanyGroupForm = this.fb.group({
      companyGroupName: ['', [Validators.required, Validators.maxLength(100)]],
      websiteUrl: ['', Validators.maxLength(100)],
      primaryContactEmail: ['', Validators.maxLength(100)],
      primaryContactPhone: ['', Validators.maxLength(20)],
      maxDevicePerUserCount: ['5', [Validators.required, Validators.maxLength(1)]],
      failedLoginAttemptsToLockUser: ['5', [Validators.required, Validators.maxLength(1)]],
      hqStreet1: ['', Validators.maxLength(100)],
      hqStreet2: ['', Validators.maxLength(100)],
      hqCity: ['', [Validators.required, Validators.maxLength(50)]],
      hqState: ['', [Validators.required, Validators.maxLength(50)]],
      hqCountry: ['', [Validators.required, Validators.maxLength(50)]],
      hqPostalCode: ['', Validators.maxLength(20)],
      isActive: [true]
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
    return this.http.put(api, JSON.stringify(this.addCompanyGroupForm.value), { headers: this.headers })
      .subscribe(
        (res: any) => {
          this.dialogRef.close();
          this.toastr_service.typeSuccess(this.configservice.group_added_successfully);
          this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
            this.router.navigate(['company']);
          });
        },
        (err) => {
          this.toastr_service.timeout(err.error);
        }
      )
  }
}
