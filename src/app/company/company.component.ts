import { Component, ViewChild, TemplateRef } from '@angular/core';
import { DatatableComponent } from "@swimlane/ngx-datatable";
import {Title} from "@angular/platform-browser";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComViewComponent } from '@shared/modals/comview/comview.component';
import { ComAddComponent } from '@shared/modals/comadd/comadd.component';
import { ComEditComponent } from '@shared/modals/comedit/comedit.component';
import { ConfigService } from '@shared/services/config.service';
import { AuthService } from '@shared/auth/auth.service';

interface DialogData {
    // res: object;
}
// declare var require: any;
// const data: any = require('@shared/data/company.json');


@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.scss']
})

export class CompanyComponent {
    @ViewChild(DatatableComponent) table: DatatableComponent;
    rows = [];
    temp = [];
    data;
    columns = [
        { name: 'Group ID', prop: 'id', sortable: 'true'},
        { name: 'Name', prop: 'companyGroupName', sortable: 'true'},
        { name: 'Date Modified', prop: 'date_modified', sortable: 'true'},
        { name: 'Status', prop: 'active', sortable: 'true'},
        { name: 'Actions', prop: 'actions', sortable: 'false' }
    ];

    constructor(
        public dialog: MatDialog,
        public configservice: ConfigService,
        public authservice: AuthService,
        private http: HttpClient,
        public router: Router,
        private titleService:Title
    ) {
        this.titleService.setTitle(this.configservice.page_titles.company);
        this.configservice.cu_page = this.configservice.page_titles.company;
    }

    headers = this.configservice.headers;

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
        this.getGroupCompanies().subscribe(
            (res) => {
            this.data = res;
            this.temp = [...this.data];
            this.rows = this.data;
            },
            (err) => {
                this.router.navigate(['auth']);
            }
        )
    }

    // Company Groups
    getGroupCompanies(): Observable<any> {
        let api = this.configservice.host_url + '/companygroups';
        return this.http.get(api, { headers: this.headers }).pipe(
            map((res: Response) => {
                return res || {}
            })
        )
    }

    //Show Company Detail
    companyGroupDetails(id) {
        this.getGroupDetail(id).subscribe((res) => {
            this.dialog.open(ComViewComponent, {
                width: '800px',
                data: { detail: res }
            });
        })
    }

    //Get detail data from the server
    getGroupDetail(id): Observable<any> {
        let api = this.configservice.host_url + '/companygroup/' + id;
        return this.http.get(api, { headers: this.headers }).pipe(
            map((res: Response) => {
                return res || {}
            }),
            catchError(this.handleError)
        )
    }

    //Add Company Group
    addCompanyGroup() {
        const dialogRef = this.dialog.open(ComAddComponent, {
            width: '800px',
            data: {}
        });
    }

    //Edit Company Group
    modifyCompanyDetails(id) {
        let api = this.configservice.host_url + '/companygroup/' + id;
        this.http.get(api, { headers: this.headers }).subscribe(
        (res) => {
            const dialogRef = this.dialog.open(ComEditComponent, {
                width: '800px',
                data: res
            });
        })
    }

    //Show Module Licenses Page By Group ID
    moduleLicenses(companyGroup) {
        this.configservice.group_filter = companyGroup.id;
        this.configservice.companyName = companyGroup.companyGroupName;
        this.configservice.isAddLicenseHidden = false;
        this.router.navigate(['license']);
    }

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
