import { Component, ViewChild, TemplateRef } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LiAddComponent } from './../shared/modals/liadd/liadd.component';
import { LiEditComponent } from './../shared/modals/liedit/liedit.component';
import { LiViewComponent } from './../shared/modals/liview/liview.component';
import { ConfigService } from './../shared/services/config.service';
import { AuthService } from './../shared/auth/auth.service';

interface DialogData {
    // res: object;
}

@Component({
    selector: 'app-license',
    templateUrl: './license.component.html',
    styleUrls: ['./license.component.scss']
})

export class LicenseComponent {
    @ViewChild(DatatableComponent) table: DatatableComponent;
    rows = [];
    temp = [];
    data;
    group_companies;
    columns = [
        { name: 'Group ID', prop: 'companyGroupId', sortable: 'true'},
        { name: 'Module Name', prop: 'moduleName', sortable: 'true'},
        { name: 'Int User', prop: 'custInternalLicenseMaxCount', sortable: 'true'},
        { name: 'Ext User', prop: 'custExternalLicenseMaxCount', sortable: 'true'},
        { name: 'Int Used', prop: 'custInternalLicenseUsedCount', sortable: 'true'},
        { name: 'Ext Used', prop: 'custExternalLicenseUsedCount', sortable: 'true'},
        { name: 'Company', prop: 'companyLicenseCount', sortable: 'true'},
        { name: 'Location', prop: 'locationLicenseCount', sortable: 'true'},
        { name: 'Project', prop: 'projectLicenseCount', sortable: 'true'},
        { name: 'Start', prop: 'licenseStartDate', sortable: 'true'},
        { name: 'End', prop: 'licenseEndDate', sortable: 'true'},
        { name: 'Dtnull Date', prop: 'dtnullDate', sortable: 'true'},
        { name: 'Edit', prop: 'edit', sortable: 'false'},
    ];

    constructor(
        public dialog: MatDialog,
        public configservice: ConfigService,
        public authservice: AuthService,
        private http: HttpClient,
        public router: Router,
        public titleService: Title
    ) {
        this.titleService.setTitle(this.configservice.page_titles.license);
        this.configservice.cu_page = this.configservice.page_titles.license;
    }

    headers = this.configservice.headers;
    group_filter;
    isAddLicenseHidden;
                        
    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        // filter data
        const temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    }

    ngOnInit() {
        this.setGroupCompanies(); //set the "group_companies" variable
        this.getModuleLicenses(); //get module licenses by GroupID and show datatable
        
    }

    //Get Module Licenses by GroupID
    getModuleLicenses() {
        this.group_filter = this.configservice.group_filter;
        this.isAddLicenseHidden = this.configservice.isAddLicenseHidden;
        let api = this.configservice.host_url + '/licenses';
        let companyapi = this.configservice.host_url + '/companygroup';
        if(this.group_filter != "all") {
            api += '/'+this.group_filter;
            companyapi += '/'+this.group_filter;
            this.http.get(companyapi, { headers: this.headers }).subscribe(
                (res: any) => {
                    this.configservice.companyName = res.companyGroupName;
                }
            )
        }else {
            this.configservice.companyName = '';
        }
        this.http.get(api, { headers: this.headers }).subscribe(
            (res: any) => {
                this.data = res;
                this.temp = [...this.data];
                this.rows = this.data;
            }
        );
    }

    //Get Group Company List and Set "group_companies" variable
    setGroupCompanies(): void {
        let com_group_api = this.configservice.host_url + '/companygroups';
        this.http.get(com_group_api, {headers: this.headers}).subscribe(
            (res: any) => {
                this.group_companies = res;
            },
            (err: any) => {
                // 
            }
        )
    }

    //Change Group Company
    changeGroupCompany(event) {
        this.configservice.group_filter = event.target.value;
        this.configservice.isAddLicenseHidden = (event.target.value != "all") ? false : true ;
        this.getModuleLicenses();
    }

    //View Module License Detail
    moduleLicenseDetail(license_id){
        let api = this.configservice.host_url + '/license/' + license_id;
        this.http.get(api, { headers: this.headers }).subscribe(
            (res : any) => {
                let com_api = this.configservice.host_url + '/companygroup/' + res.companyGroupId;
                this.http.get(com_api, { headers: this.headers }).subscribe(
                    (c_res : any) => {
                        this.dialog.open(LiViewComponent, {
                            width: '800px',
                            data: { detail: res, companyGroupName: c_res.companyGroupName}
                        });
                    }
                );
            },
            (err : any) => {

            }
        )
    }

    //Add Module License
    addModuleLicense(group_id) {
        let api = this.configservice.host_url + '/companygroup/' + group_id;
        this.http.get(api, { headers: this.headers }).subscribe(
            (res) => {

            },
            (err) => {

            }
        )
        const dialogRef = this.dialog.open(LiAddComponent, {
            width: '800px',
            data: {}
        });
    }

    //Edit Module License
    modifyLicenseDetails(id) {
        let api = this.configservice.host_url + '/license/' + id;
        this.http.get(api, { headers: this.headers }).subscribe(
        (res) => {
            const dialogRef = this.dialog.open(LiEditComponent, {
                width: '800px',
                data: res
            });
        }),
        (err) => {

        }
    }
}
