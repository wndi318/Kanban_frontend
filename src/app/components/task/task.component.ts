import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  task: any;
  contacts: any = [];

  constructor(
    public dialogRef: MatDialogRef<TaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
  ) {
    this.task = { ...data };
  }

  async ngOnInit() {
    this.contacts = await this.loadContacts();
  }

  loadContacts() {
    const url = environment.baseUrl + "/contacts/";
    return lastValueFrom(this.http.get(url));
  }

  getAssignedContacts(): any[] {
    return this.contacts.filter((contact: { id: any; }) => this.task.assigned_to.includes(contact.id));
  }

  async deleteTask(id: number) {
    const url = `${environment.baseUrl}/tasks/${id}/`;
    try {
      await lastValueFrom(this.http.delete(url));
      this.dialogRef.close({ deleted: true });
    } catch (error) {
      console.error('Error deleting task', error);
    }
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'green';
      default:
        return 'black';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
