import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
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
    private router: Router
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

  async logout() {
    const url = environment.baseUrl + "/logout/";
    try {
      await lastValueFrom(this.http.post(url, {}));
      this.currentUser = null;
      this.router.navigate(['login']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}
