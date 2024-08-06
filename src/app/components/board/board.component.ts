import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NewTaskComponent } from '../new-task/new-task.component';
import { TaskComponent } from '../task/task.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';

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
    MatDialogModule,
    CommonModule
  ],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  tasks: any = [];
  todo: any = [];
  inProgress: any = [];
  awaitFeedback: any = [];
  done: any = [];

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
  ) { }

  async ngOnInit() {
    this.tasks = await this.loadTasks();
    this.categorizeTasks();
  }

  loadTasks() {
    const url = environment.baseUrl + "/tasks/";
    return lastValueFrom(this.http.get(url));
  }

  categorizeTasks() {
    this.todo = this.tasks.filter((task: any) => task.status === 'todo');
    this.inProgress = this.tasks.filter((task: any) => task.status === 'inProgress');
    this.awaitFeedback = this.tasks.filter((task: any) => task.status === 'awaitFeedback');
    this.done = this.tasks.filter((task: any) => task.status === 'done');
  }

  async drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const movedTask = event.previousContainer.data[event.previousIndex];
      const newStatus = this.getNewStatus(event.container.id);

      if (newStatus) {
        movedTask.status = newStatus;
        await this.updateTaskStatus(movedTask);

        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      }
    }
  }

  getNewStatus(containerId: string): string | null {
    switch (containerId) {
      case 'todoList':
        return 'todo';
      case 'inProgressList':
        return 'inProgress';
      case 'awaitFeedbackList':
        return 'awaitFeedback';
      case 'doneList':
        return 'done';
      default:
        return null;
    }
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'green';
      default:
        return 'black';
    }
  }

  async updateTaskStatus(task: any) {
    const url = `${environment.baseUrl}/tasks/${task.id}/`;
    try {
      await lastValueFrom(this.http.put(url, { status: task.status }));
    } catch (error) {
      console.error('Error updating task status', error);
    }
  }

  openNewTaskDialog(): void {
    const dialogRef = this.dialog.open(NewTaskComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        this.tasks = await this.loadTasks();
        this.categorizeTasks();
      }
    });
  }

  openTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskComponent, {
      width: '500px',
    });
  }
}
