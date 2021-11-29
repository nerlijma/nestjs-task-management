import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/CreateTaskDto';
import { TaskStatus } from './task.enum';
import { GetTasksFilterDto } from './dto/GetTasksFilterDto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { QueryBuilder } from 'typeorm';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository) {
  }

  // private tasks: Task[] = [];

  // getAllTaks(): Task[] {
  //   return this.tasks;
  // }


  async getAllTasks(): Promise<Task[]> {
    console.log('TasksService: getAllTasks');
    return await this.taskRepository.find();
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const itemToAdd: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };

  //   this.tasks.push(itemToAdd);
  //   return itemToAdd;
  // }

  async getTaskById(id: string): Promise<Task> {
    console.log('TasksService:getTaskById', id);
    const task = await this.taskRepository.findOne(id);
    console.log(`getTaskById task found: ${task}`);
    if (!task) {
      throw new NotFoundException(`The task "${id}" is not found`);
    }
    return task;
  }

  // getTaskById(id: string): Task {
  //   const task = this.tasks.find((item) => item.id === id);
  //   if (!task) {
  //     throw new NotFoundException(`The task "${id}" is not found`);
  //   }
  //   return task;
  // }

  async deleteTask(id: string): Promise<void> {
    // const task = await this.getTaskById(id);
    await this.taskRepository.delete(id);
  }

  // deleteTask(id: string): void {
  //   this.tasks = this.tasks.filter((item) => item.id !== id);
  // }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    console.log(`TasksService:updateTaskStatus: ${task}`);
    // if (task) {
    //   await this.taskRepository.update(id, { status: status });
    //   return await this.getTaskById(id);
    // }
    return null;
  }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   this.tasks = this.tasks.map((item) => {
  //     if (item.id === id) return { ...item, status: status };
  //     return item;
  //   });

  //   return this.getTaskById(id);
  // }

  // getTaskByFilter(filter: GetTasksFilterDto): Task[] {
  //   let { search, status } = filter;
  //   let array: Task[] = [...this.tasks];

  //   if (search) {
  //     search = search.toLowerCase();
  //     array = array.filter(
  //       (item) =>
  //         item.description.toLowerCase().includes(search) ||
  //         item.title.toLowerCase().includes(search),
  //     );
  //   }

  //   if (status) {
  //     array = array.filter((item) => item.status === status);
  //   }

  //   return array;
  // }

  getTaskByFilter(filter: GetTasksFilterDto): Promise<Task[]> {
    console.log(`TasksService:getTaskByFilter: ${filter.search}, ${filter.status}`);

    return this.taskRepository.getTaskByFilter(filter);
  }
}
