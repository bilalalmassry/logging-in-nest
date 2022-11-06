import { Table, Column, Model, DataType } from 'sequelize-typescript';
import {
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';

import { Attributes, ModelStatic, UpdateOptions } from "sequelize/types/model";
import { Col, Fn, Literal } from "sequelize/types/utils";

const { randomUUID } = require('crypto')

@Table
export class Cat extends Model<
    InferAttributes<Cat>,
    InferCreationAttributes<Cat>
    > {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: randomUUID()
    })
    declare id: CreationOptional<string>;

    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    declare name: string;
}



export class BaseModel<// eslint-disable-next-line @typescript-eslint/ban-types
    TModelAttributes extends {} = any,
    // eslint-disable-next-line @typescript-eslint/ban-types
    TCreationAttributes extends {} = TModelAttributes,
    > extends Model<TModelAttributes, TCreationAttributes> {
    
    
}