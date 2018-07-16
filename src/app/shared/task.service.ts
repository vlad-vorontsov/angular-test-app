import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Task } from './task.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable()
export class TaskService {

  private tasksUrl = '/assets/tasks.json';

  constructor(private http: HttpClient) {
  }

  public fetchTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl)
      .pipe(
        map((tasks: Task[]) => tasks.filter(task => task.obj_status === 'active'))
      );
  }

  public fetchTask(id: number): Observable<Task> {
    return this.http.get<Task>(this.tasksUrl)
      .pipe(
        map((tasks: Task[]) => tasks.find(task => task.id === id))
      );
  }

  public updateTaskName(id: number, name: string) {
    console.log(name);
    return this.http.put(`https://some-url/tasks/${id}`, { name: name });
  }

}
