import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/CreateTaskDto';
import { UpdateTaskStatusDto } from './dto/UpdateTastStatusDto';
import { Task } from './task.entity';
import { GetTasksFilterDto } from './dto/GetTasksFilterDto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getAllTasks(): Promise<Task[]> {
        return this.tasksService.getAllTasks();
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        console.log('createTaskDto', createTaskDto);
        return this.tasksService.createTask(createTaskDto);
    }

    @Get('filter')
    getTaskByFilter(@Query() filter: GetTasksFilterDto): Promise<Task[]> {
        console.log(`getTaskByFilter: ${filter.search}, ${filter.status}`);
        return this.tasksService.getTaskByFilter(filter);
    }

    @Get('/:id')
    getTaskById(@Param('id', new ParseUUIDPipe()) id: string): Promise<Task> {
        console.log(`TasksController:getTaskById: ${id}`);
        return this.tasksService.getTaskById(id);
    }

    @Delete(':id')
    deleteTask(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
        console.log(`deleteTask: ${id}`);
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTask(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() updateTaskStatus: UpdateTaskStatusDto,
    ): Promise<Task> {
        const { status } = updateTaskStatus;
        console.log(`updateTaskStatus: ${id} status: ${status}`);
        return this.tasksService.updateTaskStatus(id, status);
    }
}
