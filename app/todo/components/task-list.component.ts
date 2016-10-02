import {Component, OnInit} from "@angular/core";
import {Task} from "../models/task";
import {TaskService} from "../services/task-service";

@Component({
  moduleId: module.id,
  selector: 'task-list',
  templateUrl: 'task-list.html',
  styleUrls: ['task-list.css'],
  providers: [TaskService]
})
export class TaskListComponent implements OnInit {

  todoCount:number;
  selectedTask:Task;
  tasks:Array<Task>;

  constructor(private _taskService:TaskService) {
    this.tasks = _taskService.getTasks();
    this.calculateTodoCount();
  }

  ngOnInit() {
    console.log("Todo component " + this.tasks.length + " tasks.");
  }

  calculateTodoCount() {
    this.todoCount = this.tasks.filter(t => !t.done).length;
  }

  select(task:Task) {
    this.selectedTask = task;
  }
}
