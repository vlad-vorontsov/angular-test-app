import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Task } from './task.model';
import { Observable } from 'rxjs';


@Injectable()
export class TaskService {

  private tasksUrl = '/assets/tasks.json';

  constructor(private http: HttpClient) {
  }

  public fetchTasks(): Observable<any> {
    return this.http.get<Task[]>(this.tasksUrl);
  }

}
