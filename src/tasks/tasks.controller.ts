import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/CreateTaskDto';
import { Task, TaskStatus } from './task.model';
import { GetTasksFilterDto } from './dto/GetTasksFilterDto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTaks();
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        console.log('createTaskDto', createTaskDto);
        return this.tasksService.createTask(createTaskDto);
    }

    @Get('filter')
    getTaskByFilter(@Query() filter: GetTasksFilterDto): Task[] {
        console.log(`getTaskByFilter: ${filter.search}, ${filter.status}`);
        return this.tasksService.getTaskByFilter(filter);
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        console.log(`getTaskById: ${id}`);
        return this.tasksService.getTaskById(id);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string): void {
        console.log(`deleteTask: ${id}`);
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus,
    ) {
        console.log(`updateTaskStatus: ${id} status: ${status}`);
        return this.tasksService.updateTaskStatus(id, status);
    }
}
