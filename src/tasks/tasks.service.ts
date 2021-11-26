import { Body, Injectable, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/CreateTaskDto';
import { v4 as uuid } from 'uuid';
import { Task, TaskStatus } from './task.model';
import { GetTasksFilterDto } from './dto/GetTasksFilterDto';

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
            status: TaskStatus.OPEN
        }

        this.tasks.push(itemToAdd);
        return itemToAdd;
    }

    findTaskById(id: string): Task {
        return this.tasks.find(item => item.id === id);
    }

    deleteTask(id: string): void {
        this.tasks = this.tasks.filter(item => item.id !== id);
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        this.tasks = this.tasks.map(item => {
            if (item.id === id) return { ...item, status: status };
            return item;
        })

        return this.findTaskById(id);
    }

    getTaskByFilter(filter: GetTasksFilterDto): Task[] {
        let { search, status } = filter;
        let array: Task[] = [...this.tasks];

        if (search) {
            search = search.toLowerCase();
            array = array.filter(item => item.description.toLowerCase().includes(search) || item.title.toLowerCase().includes(search));
        }

        if (status) {
            array = array.filter(item => item.status === status);
        }

        return array;
    }
}
