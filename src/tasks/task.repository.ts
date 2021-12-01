import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/CreateTaskDto";
import { GetTasksFilterDto } from "./dto/GetTasksFilterDto";
import { Task } from "./task.entity";
import { TaskStatus } from "./task.enum";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
            user
        })

        return await this.save(task);
    }

    async getTaskByFilter(user: User, filter: GetTasksFilterDto): Promise<Task[]> {
        let { search, status } = filter;
        search = search.toLowerCase();

        const query = this.createQueryBuilder('task');

        query.andWhere({ user });

        if (search) {
            query.andWhere('(LOWER(task.title) like :search OR LOWER(task.description) like :search)',
                { search: `%${search}%` });
        }

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        return await query.getMany();
    }


}