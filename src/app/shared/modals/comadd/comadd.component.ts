import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

interface DialogData {
  email: string;
}

@Component({
  selector: 'app-comadd',
  templateUrl: './comadd.component.html',
  styleUrls: ['./comadd.component.scss']
})
export class ComAddComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ComAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
