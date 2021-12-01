import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../auth/jwt-payload';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private jwtService: JwtService
    ) { }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.usersRepository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { username, password } = authCredentialsDto;

        const user: User = await this.usersRepository.findOne({ username });

        if (user && await bcrypt.compare(password, user.password)) {
            const payload: JwtPayload = { username };
            console.log('payload', payload);
            const accessToken = await this.jwtService.signAsync(payload);
            console.log('accessToken', accessToken);
            return { accessToken };
        } else {
            throw new UnauthorizedException('Please check your login credentials');
        }

    }
}
