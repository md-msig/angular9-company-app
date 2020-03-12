import { Component, ViewChild, TemplateRef } from '@angular/core';
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ComViewComponent } from './../../shared/modals/comview/comview.component';
import { ComAddComponent } from './../../shared/modals/comadd/comadd.component';
import { ComEditComponent } from './../../shared/modals/comedit/comedit.component';
import { ConfigService } from './../../shared/services/config.service';
import { AuthService } from './../../shared/auth/auth.service';

interface DialogData {
  email: string;
}
declare var require: any;
const data: any = require('../../shared/data/company.json');

@Component({
    selector: 'app-company-list',
    templateUrl: './company-list.component.html',
    styleUrls: ['./company-list.component.scss']
})

export class CompanyListComponent {
    @ViewChild(DatatableComponent) table: DatatableComponent;
    // @ViewChild('buttonsTemplate') buttonsTemplate: TemplateRef<any>;
    rows = [];
    temp = [];
    email: string;
    columns = [
        { name: 'Group ID', prop: 'id', sortable:'true', width:'10' },
        { name: 'Name', prop: 'companyGroupName', sortable:'true', width:'20' },
        { name: 'Date Modified', prop: 'date_modified', sortable:'true', width:'15' },
        { name: 'Status', prop: 'active', sortable:'true', width:'5' },
        { name: 'Licenses', prop: '', sortable:'false', width:'30' },
        { name: 'Actions', prop: 'actions', sortable:'false', width:'20' }
    ];
    
    constructor(
        public dialog: MatDialog, 
        public configservice: ConfigService, 
        public authservice: AuthService, 
        private http: HttpClient, 
        public router: Router 
        ) {
        // const data: any = this.configservice.company_data;
        this.temp = [...data];
        this.rows = data;
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
        
    }

    //Show Company Detail
    companyGroupDetails(id) {
        this.getGroupDetail(id).subscribe((res) => {
            const dialogRef = this.dialog.open(ComViewComponent, {
                width: '800px',
                data: {res}
            });
        
            dialogRef.afterClosed().subscribe(result => {
                this.email = result;
            });
        })
    }

    //Get detail data from the server
    getGroupDetail(id): Observable<any> {
        let api = this.configservice.host_url + '/companygroup/' + id;
        this.headers = this.headers.append('Authorization', 'Bearer ' + this.authservice.getToken());
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
    
        dialogRef.afterClosed().subscribe(result => {
            this.email = result;
        });
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
