import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript';
import {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  UUID,
} from 'sequelize';

const { randomUUID } = require('crypto');

@Table
export class Request extends Model<
  InferAttributes<Request>,
  InferCreationAttributes<Request>
> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: randomUUID(),
  })
  declare id: CreationOptional<string>;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  declare request: string;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  declare response: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare time: number;

  @Column({
    type: DataType.STRING,
  })
  declare method: string;

  @Column({
    type: DataType.STRING,
  })
  declare url: string;

  @Column({
    type: DataType.STRING,
  })
  declare controller: string;

  @Column({
    type: DataType.STRING,
  })
  declare function: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare responseCode: string;

  @HasMany(() => Entry, 'requestId')
  declare entries: Entry[];
}

@Table
export class Entry extends Model<
  InferAttributes<Entry>,
  InferCreationAttributes<Entry>
> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: randomUUID(),
  })
  declare id: CreationOptional<string>;

  @ForeignKey(() => Request)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare requestId: string;

  @Column({
    type: DataType.JSONB,
    allowNull: false,
  })
  declare content: object;

  @BelongsTo(() => Request, 'requestId')
  declare request: Request;
}
