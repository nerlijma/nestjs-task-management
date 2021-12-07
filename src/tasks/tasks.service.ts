import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/CreateTaskDto';
import { TaskStatus } from './task.enum';
import { GetTasksFilterDto } from './dto/GetTasksFilterDto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';

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


  async getAllTasks(user: User): Promise<Task[]> {
    console.log('TasksService: getAllTasks');
    return await this.getTaskByFilter(user, null);
  }

  createTask(user: User, createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
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

  async getTaskById(user: User, id: string): Promise<Task> {
    console.log('TasksService:getTaskById', id);
    // const task = await this.taskRepository.findOne(id);
    const task = await this.taskRepository.findOne({ where: { id, user } });
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

  async deleteTask(user: User, id: string): Promise<void> {
    const task = await this.getTaskById(user, id);
    if (task) {
      await this.taskRepository.delete(id);
    }
  }

  // deleteTask(id: string): void {
  //   this.tasks = this.tasks.filter((item) => item.id !== id);
  // }

  async updateTaskStatus(user: User, id: string, status: TaskStatus): Promise<Task> {
    // Search the task so if not found returns not found exception. Filters by User
    const task = await this.getTaskById(user, id);

    console.log(`TasksService:updateTaskStatus: ${task}`);
    if (task) {
      await this.taskRepository.update(id, { status: status });
      return await this.getTaskById(user, id);
    }
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

  getTaskByFilter(user: User, filter: GetTasksFilterDto): Promise<Task[]> {
    console.log(`TasksService:getTaskByFilter: ${filter?.search}, ${filter?.status}`);

    return this.taskRepository.getTaskByFilter(user, { search: '' });
  }
}
