import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
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

  constructor(private authService:AuthService, private router: Router){}

  async login() {
    try {
      let resp:any = await this.authService.loginWithUsernameAndPassword(this.username, this.password);
      console.log(resp);
      localStorage.setItem('token', resp['token'])
      this.router.navigateByUrl('/board');
    } catch(e){
      alert('Login failed: Username or password incorrect')
      console.error(e);
    }
  }
}
