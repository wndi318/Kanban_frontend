import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';

interface Priority{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule
  ],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent {

  constructor(
    public dialogRef: MatDialogRef<NewTaskComponent>
  ) {}

  priorities: Priority[] = [
    {value: 'high-0', viewValue: 'High'},
    {value: 'medium-1', viewValue: 'Medium'},
    {value: 'low-2', viewValue: 'Low'},
  ];

  onNoClick(): void {
    this.dialogRef.close();
  }
}
