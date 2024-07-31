import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

  constructor(
    public dialogRef: MatDialogRef<TaskComponent>
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
