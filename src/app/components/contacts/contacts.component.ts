import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { AddNewContactComponent } from './add-new-contact/add-new-contact.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { EditContactComponent } from './edit-contact/edit-contact.component';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  contacts: any = [];

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ContactsComponent>
  ) { }

  async ngOnInit() {
    this.contacts = await this.loadContacts()
  }

  loadContacts() {
    const url = environment.baseUrl + "/contacts/";
    return lastValueFrom(this.http.get(url));
  }

  async deleteContact(id: number) {
    const url = `${environment.baseUrl}/contacts/${id}/`;
    try {
      await lastValueFrom(this.http.delete(url));
      this.contacts = await this.loadContacts();
    } catch (error) {
      console.error('Error deleting contact', error);
    }
  }

  openNewContactDialog(): void {
    const dialogRef = this.dialog.open(AddNewContactComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        this.contacts = await this.loadContacts();
      }
    });
  }

  openEditContactDialog(contact: any): void {
    const dialogRef = this.dialog.open(EditContactComponent, {
      width: '500px',
      data: contact
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        this.contacts = await this.loadContacts();
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
