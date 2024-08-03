import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ContactsComponent } from '../contacts/contacts.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatIconModule,
    RouterModule,
    MatDialogModule,
    ContactsComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(
    private dialog: MatDialog,
  ) { }

  openContactsDialog(): void {
    const dialogRef = this.dialog.open(ContactsComponent, {
      width: '500px',
    });
  }
}
