import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { InjectModel } from '@nestjs/sequelize';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat) private readonly catModel: typeof Cat) {}

  create(createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  findAll() {
    for (let i = 0; i < 10; i++) {
      this.catModel.findAll();
    }
    return this.catModel.findAll();
  }

  findOne(id: number) {
    console.log('serivce');
    return `This action returns a #${id} cat`;
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
