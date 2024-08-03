import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  username: string = '';
  password: string = ''

  constructor(private authService:AuthService){

  }

  async login() {
    try {
      let resp = await this.authService.loginWithUsernameAndPassword(this.username, this.password);
      console.log(resp);
      // TODO: Redirect
    } catch(e){
      // Show error message
      console.error(e);

    }
  }
}
