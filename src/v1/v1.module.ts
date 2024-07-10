import { Module } from '@nestjs/common';
import { V1Service } from './v1.service';
import { V1Controller } from './v1.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Season } from './entities/seasons.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Season]), // Include Season entity in TypeOrmModule
  ],
  controllers: [V1Controller],
  providers: [V1Service],
})
export class V1Module {}
