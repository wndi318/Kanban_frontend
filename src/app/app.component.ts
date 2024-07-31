import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardComponent } from './components/board/board.component';
import { NewTaskComponent } from './components/new-task/new-task.component';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BoardComponent, NewTaskComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Kanban_frontend';
}
