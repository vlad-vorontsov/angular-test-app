import { Component, OnInit } from '@angular/core';
import { Task } from '../shared/task.model';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../shared/task.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  task: Task;
  editMode = false;

  constructor(private route: ActivatedRoute,
              private taskService: TaskService,
              private location: Location) {
  }

  ngOnInit() {
    this.getTask();
  }

  getTask() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.taskService.fetchTask(id)
      .subscribe(
        task => {
          this.task = task;
        }
      );
  }

  goBack(): void {
    this.location.back();
  }

  updateName(updatedName) {
    this.editMode = false;
    this.taskService.updateTaskName(this.task.id, updatedName);
  }
}
