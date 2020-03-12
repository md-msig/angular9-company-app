import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

interface DialogData {
  email: string;
}

@Component({
  selector: 'app-comview',
  templateUrl: './comview.component.html',
  styleUrls: ['./comview.component.scss']
})
export class ComViewComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ComViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
