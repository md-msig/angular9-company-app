import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

interface DialogData {
  email: string;
}

@Component({
  selector: 'app-comedit',
  templateUrl: './comedit.component.html',
  styleUrls: ['./comedit.component.scss']
})
export class ComEditComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ComEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
