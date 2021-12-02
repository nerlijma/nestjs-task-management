import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/CreateTaskDto';
import { UpdateTaskStatusDto } from './dto/UpdateTastStatusDto';
import { Task } from './task.entity';
import { GetTasksFilterDto } from './dto/GetTasksFilterDto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('tasks')
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger(TasksController.name, { timestamp: true });

    constructor(private tasksService: TasksService) { }

    @Get()
    getAllTasks(
        @GetUser() user: User
    ): Promise<Task[]> {
        return this.tasksService.getAllTasks(user);
    }

    @Post()
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User
    ): Promise<Task> {
        this.logger.verbose(`User ${JSON.stringify(user.username)} is creating task ${JSON.stringify(createTaskDto)}`);
        return this.tasksService.createTask(user, createTaskDto);
    }

    @Get('filter')
    getTaskByFilter(
        @GetUser() user: User,
        @Query() filter: GetTasksFilterDto,
    ): Promise<Task[]> {
        console.log(`getTaskByFilter: ${filter.search}, ${filter.status}`);
        return this.tasksService.getTaskByFilter(user, filter);
    }

    @Get('/:id')
    getTaskById(
        @GetUser() user: User,
        @Param('id', new ParseUUIDPipe()) id: string
    ): Promise<Task> {
        console.log(`TasksController:getTaskById: ${id}`);
        return this.tasksService.getTaskById(user, id);
    }

    @Delete(':id')
    deleteTask(
        @GetUser() user: User,
        @Param('id', new ParseUUIDPipe()) id: string
    ): Promise<void> {
        console.log(`deleteTask: ${id}`);
        return this.tasksService.deleteTask(user, id);
    }

    @Patch('/:id/status')
    updateTask(
        @GetUser() user: User,
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() updateTaskStatus: UpdateTaskStatusDto,
    ): Promise<Task> {
        const { status } = updateTaskStatus;
        console.log(`updateTaskStatus: ${id} status: ${status}`);
        return this.tasksService.updateTaskStatus(user, id, status);
    }
}
