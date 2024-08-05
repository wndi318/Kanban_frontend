import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-add-new-contact',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './add-new-contact.component.html',
  styleUrl: './add-new-contact.component.scss'
})
export class AddNewContactComponent {

  newContact: any = {
    firstName: '',
    lastName: '',
    mail: ''
  };

  constructor(
    public dialogRef: MatDialogRef<AddNewContactComponent>,
    private http: HttpClient
  ) { }

  async addContact(): Promise<void> {
    const url = environment.baseUrl + "/contacts/";
    try {
      const response = await lastValueFrom(this.http.post(url, this.newContact));
      this.dialogRef.close(response);
    } catch (error) {
      console.error('Error adding contact', error);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
