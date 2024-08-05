import { Component, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.scss'
})
export class EditContactComponent {

  editedContact: any;

  constructor(
    public dialogRef: MatDialogRef<EditContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {
    this.editedContact = { ...data };
  }

  async saveContact(): Promise<void> {
    const url = `${environment.baseUrl}/contacts/${this.editedContact.id}/`;
    try {
      const response = await lastValueFrom(this.http.put(url, this.editedContact));
      this.dialogRef.close(response);
    } catch (error) {
      console.error('Error saving contact', error);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
