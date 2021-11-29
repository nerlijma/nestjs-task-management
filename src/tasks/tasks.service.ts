import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/CreateTaskDto';
import { v4 as uuid } from 'uuid';
import { Task, TaskStatus } from './task.model';
import { GetTasksFilterDto } from './dto/GetTasksFilterDto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTaks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const itemToAdd: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(itemToAdd);
    return itemToAdd;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((item) => item.id === id);
    if (!task) {
      throw new NotFoundException(`The task "${id}" is not found`);
    }
    return task;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((item) => item.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    this.tasks = this.tasks.map((item) => {
      if (item.id === id) return { ...item, status: status };
      return item;
    });

    return this.getTaskById(id);
  }

  getTaskByFilter(filter: GetTasksFilterDto): Task[] {
    let { search, status } = filter;
    let array: Task[] = [...this.tasks];

    if (search) {
      search = search.toLowerCase();
      array = array.filter(
        (item) =>
          item.description.toLowerCase().includes(search) ||
          item.title.toLowerCase().includes(search),
      );
    }

    if (status) {
      array = array.filter((item) => item.status === status);
    }

    return array;
  }
}
