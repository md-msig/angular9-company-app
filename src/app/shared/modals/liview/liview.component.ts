import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

interface DialogData {
  email: string;
}

@Component({
  selector: 'app-liview',
  templateUrl: './liview.component.html',
  styleUrls: ['./liview.component.scss']
})
export class LiViewComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LiViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
