import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-task',
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
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent {
  editedTask: any;
  contacts: any = [];

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.editedTask = { ...data.task };
  }

  async ngOnInit() {
    this.contacts = await this.loadContacts();
  }

  loadContacts() {
    const url = environment.baseUrl + "/contacts/";
    return lastValueFrom(this.http.get(url));
  }

  isAssignedTo(contactId: number): boolean {
    return this.editedTask.assigned_to.includes(contactId);
  }

  toggleAssignedTo(contactId: number, event: any): void {
    const checked = event.target.checked;
    if (checked) {
      if (!this.editedTask.assigned_to.includes(contactId)) {
        this.editedTask.assigned_to.push(contactId);
      }
    } else {
      const index = this.editedTask.assigned_to.indexOf(contactId);
      if (index > -1) {
        this.editedTask.assigned_to.splice(index, 1);
      }
    }
  }

  async saveTask(): Promise<void> {
    const url = `${environment.baseUrl}/tasks/${this.editedTask.id}/`;
    try {
      const response = await lastValueFrom(this.http.put(url, this.editedTask));
      this.dialogRef.close({ saved: true, task: this.editedTask });
    } catch (error) {
      console.error('Error saving contact', error);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
