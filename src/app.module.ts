import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { MicroModule } from './micro/micro.module';
import { MicroClientModule } from './micro-client/micro-client.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task-management',
      autoLoadEntities: true,
      synchronize: true // only for dev!
    }),
    AuthModule,
    ClientModule,
    MicroModule,
    MicroClientModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
