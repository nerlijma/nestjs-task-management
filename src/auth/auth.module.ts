import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStategy } from './jwt.strategy';
import { UsersRepository } from './users.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 360000
      }
    }),
    TypeOrmModule.forFeature([UsersRepository])
  ],
  providers: [AuthService, JwtStategy, JwtGuard],
  controllers: [AuthController],
  exports: [JwtStategy, PassportModule]
})
export class AuthModule { }
