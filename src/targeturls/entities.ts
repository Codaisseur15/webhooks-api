import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {IsString, IsUrl, IsArray} from 'class-validator'
import {SentEvent} from "../events/entity";

@Entity()
export class Target extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text', {nullable:false})
  name: string

  @Column('boolean', {nullable:false, default: true})
  active?: boolean

  @IsUrl()
  @Column('text', {nullable:false})
  url: string

  @IsArray()
  @Column('simple-array', {nullable:false})
  events: string[]

  @OneToMany(() => SentEvent, e => e.target)
  sentEvents: SentEvent[]

}