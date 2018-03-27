import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IsString, IsUrl, IsBoolean, IsArray} from 'class-validator'

@Entity()
export class Target extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text', {nullable:false})
  name: string

  @IsBoolean()
  @Column('boolean', {nullable:false, default: true})
  active?: boolean

  @IsUrl()
  @Column('text', {nullable:false})
  url: string

  @IsArray()
  @Column('simple-array', {nullable:false})
  events: string[]

}