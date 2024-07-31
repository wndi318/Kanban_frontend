import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from '../navbar/navbar.component';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  DragDropModule
} from '@angular/cdk/drag-drop';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { NewTaskComponent } from '../new-task/new-task.component';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    NavbarComponent,
    CdkDropList,
    CdkDrag,
    DragDropModule,
    MatDialogModule
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})

export class BoardComponent {
  constructor(
    private dialog: MatDialog,
  ) { }


  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  inProgress = ['Eat-Pizza'];
  awaitFeedback = ['Design Kanban']
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  openNewTaskDialog(): void {
    const dialogRef = this.dialog.open(NewTaskComponent, {
      width: '500px',
    });
  }

  openTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskComponent, {
      width: '500px',
    });
  }
}
