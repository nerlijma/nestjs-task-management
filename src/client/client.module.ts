import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ClientController } from './client.controller';
import { ClientRepository } from './client.repository';
import { ClientService } from './client.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([ClientRepository]),
  ],
  controllers: [ClientController],
  providers: [ClientService]
})
export class ClientModule { }
