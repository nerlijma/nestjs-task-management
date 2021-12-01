import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task.enum";

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;

    @Exclude({ toPlainOnly: true })
    @ManyToOne(_type => User, user => user.tasks, { eager: false })
    user: User;
}