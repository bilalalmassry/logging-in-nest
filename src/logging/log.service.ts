import { Injectable, Scope, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Entry, Request } from './log.entity';
import { raw } from 'express';

@Injectable()
export class LogService {
  constructor(
    @InjectModel(Request) private readonly requestModel: typeof Request,
    @InjectModel(Entry) private readonly entryModel: typeof Entry,
  ) {}

  async findAll() {
    return this.requestModel.findAll({
      attributes: ['id', 'responseCode', 'url', 'method', 'time'],
      order: [['updatedAt', 'DESC']],
      raw: true,
      logging: false,
      benchmark: false,
    });
  }
  async findOne(id) {
    return this.requestModel.findByPk(id, {
      include: ['entries'],
      logging: false,
      benchmark: false,
    });
  }
  // create(query, requestId) {
  //   Entry.create(
  //     {
  //       content: query,
  //       requestId,
  //     },
  //     {
  //       logging: false,
  //       returning: false,
  //       raw: true,
  //       benchmark: false,
  //       hooks: false,
  //     },
  //   );
  // }
}
