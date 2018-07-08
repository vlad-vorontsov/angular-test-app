export class Task {
  constructor(public id: number,
              public name: string,
              public creation_date: string,
              public due_date: string,
              public start_date: string,
              public is_completed: boolean,
              public is_archived: boolean,
              public is_high_priority: boolean,
              public estimated_effort: number,
              public actual_effort: number,
              public physical_progress: number,
              public obj_status: string,
              public description: string,
              public project_id: number,
              public tags: string[],
              public task_type: string) {
  }
}
