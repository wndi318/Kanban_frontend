import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { FormControl, FormsModule, ReactiveFormsModule, FormGroup, FormArray } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatFormFieldModule,
    MatSelectModule, 
    FormsModule, 
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent {
  contacts: any = [];
  taskForm: FormGroup;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<NewTaskComponent>
  ) {
    this.taskForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      status: new FormControl(''),
      priority: new FormControl(''),
      due_date: new FormControl(''),
      assigned_to: new FormArray([]),
    });
  }

  async ngOnInit() {
    this.contacts = await this.loadContacts();
  }

  loadContacts() {
    const url = environment.baseUrl + "/contacts/";
    return lastValueFrom(this.http.get(url));
  }

  onCheckboxChange(event: any, contactId: string) {
    const assignedToArray: FormArray = this.taskForm.get('assigned_to') as FormArray;

    if (event.target.checked) {
      assignedToArray.push(new FormControl(contactId));
    } else {
      const index = assignedToArray.controls.findIndex(x => x.value === contactId);
      assignedToArray.removeAt(index);
    }
  }

  async addTask(): Promise<void> {
    const url = environment.baseUrl + "/tasks/";
    const taskData = this.taskForm.value;

    try {
      const response = await lastValueFrom(this.http.post(url, taskData));
      this.dialogRef.close(response);
    } catch (error) {
      console.error('Error adding task', error);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
