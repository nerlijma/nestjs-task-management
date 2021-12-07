import { Module } from '@nestjs/common';
import { MicroController } from './micro.controller';

@Module({
  controllers: [MicroController]
})
export class MicroModule {}
