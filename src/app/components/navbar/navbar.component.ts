import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ContactsComponent } from '../contacts/contacts.component';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
  currentUser: any = [];

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
  ) { }

  async ngOnInit() {
    this.currentUser = await this.getCurrentUser();
  }

  getCurrentUser() {
    const url = environment.baseUrl + "/current_user/";
    return lastValueFrom(this.http.get(url));
  }

  openContactsDialog(): void {
    const dialogRef = this.dialog.open(ContactsComponent, {
      width: '500px',
    });
  }
}
