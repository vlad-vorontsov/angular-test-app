import { TaskService } from './task.service';
import * as faker from 'faker';
import { Task } from './task.model';
import { Observable, defer } from 'rxjs';

describe('TaskService', () => {
  let httpClientSpy: { get: jasmine.Spy, put: jasmine.Spy };
  let taskService: TaskService;
  let task1: Task;
  let task2: Task;
  let task3: Task;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'put']);
    taskService = new TaskService(<any> httpClientSpy);

    task1 = createFakeTasks(true);
    task2 = createFakeTasks(true);
    task3 = createFakeTasks(false);
    httpClientSpy.get.and.returnValue(fakeAsyncResponse([task1, task2, task3]));
    httpClientSpy.put.and.returnValue(fakeAsyncResponse(task1));
  });

  it('fetchTasks returns active tasks', () => {
    taskService.fetchTasks().subscribe(
      tasks => {
        expect(tasks).toEqual([task1, task2], 'expected tasks');
        expect(httpClientSpy.get.calls.first().args).toEqual(['/assets/tasks.json'], 'invalid url');
      },
      fail
    );
  });

  it('fetchTask returns task by Id', () => {
    taskService.fetchTask(task2.id).subscribe(
      task => expect(task).toEqual(task2, 'expected task 2'),
      fail
    );
  });

  it('updateTaskName sends put request with Id and Name', () => {
    taskService.updateTaskName(task1.id, task1.name).subscribe(
      task => {
        expect(httpClientSpy.put.calls.first().args).toEqual([`https://some-url/tasks/${task1.id}`, {name: task1.name}], 'invalid url');
      },
      fail
    );
  });

});

function createFakeTasks(isActive: boolean): Task {
  return new Task(
    faker.random.number(),
    faker.name.title(),
    faker.date.past(),
    faker.date.future(),
    faker.date.past(),
    faker.random.boolean(),
    faker.random.boolean(),
    faker.random.boolean(),
    faker.random.number(),
    faker.random.number(),
    faker.random.number(),
    isActive ? 'active' : 'deleted',
    faker.lorem.sentence(),
    faker.random.number(),
    [],
    'milestone'
  );
}

function fakeAsyncResponse<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
