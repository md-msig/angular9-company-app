import { Component, ViewChild, TemplateRef } from '@angular/core';
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComViewComponent } from './../shared/modals/comview/comview.component';
import { ComAddComponent } from './../shared/modals/comadd/comadd.component';
import { ComEditComponent } from './../shared/modals/comedit/comedit.component';
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
        public router: Router
    ) {
    }

    headers = this.configservice.headers;
    group_filter = this.configservice.group_filter;

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
        this.getModuleLicenses().subscribe(
            (res) => {
            this.data = res;
            this.temp = [...this.data];
            this.rows = this.data;
            },
            (err) => {
                this.router.navigate['auth'];
            }
        )
    }

    // Company Groups
    getModuleLicenses(): Observable<any> {
        // let filter_group_id = this.configservice.filter_group_id;
        // let end_point = ()
        let api = this.configservice.host_url + '/licenses';
        return this.http.get(api, { headers: this.headers }).pipe(
            map((res: Response) => {
                return res || {}
            })
        )
    }

    addModuleLicense() {

    }

    //Show Company Detail
    // companyGroupDetails(id) {
    //     this.getGroupDetail(id).subscribe((res) => {
    //         this.dialog.open(ComViewComponent, {
    //             width: '800px',
    //             data: { detail: res }
    //         });
    //     })
    // }

    //Get detail data from the server
    // getGroupDetail(id): Observable<any> {
    //     let api = this.configservice.host_url + '/companygroup/' + id;
    //     return this.http.get(api, { headers: this.headers }).pipe(
    //         map((res: Response) => {
    //             return res || {}
    //         }),
    //         catchError(this.handleError)
    //     )
    // }

    //Add Company Group
    // addCompanyGroup() {
    //     const dialogRef = this.dialog.open(ComAddComponent, {
    //         width: '800px',
    //         data: {}
    //     });
    // }

    //Edit Company Group
    modifyLicenseDetails(id) {
        let api = this.configservice.host_url + '/companygroup/' + id;
        this.http.get(api, { headers: this.headers }).subscribe(
        (res) => {
            const dialogRef = this.dialog.open(ComEditComponent, {
                width: '800px',
                data: res
            });
        }),
        (err) => {

        }
    }

    //Show Module Licenses Page
    // moduleLicenses(id) {
    //     this.configservice.filter_group_id = id;
    //     this.router.navigate['licenses'];
    // }

    // Error 
    handleError(error: HttpErrorResponse) {
        let msg = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            msg = error.error.message;
        } else {
            // server-side error
            msg = 'Error Code: ${error.status}\nMessage: ${error.message}';
        }
        return throwError(msg);
    }
}
