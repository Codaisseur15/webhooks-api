import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { IsInstance, IsInt } from 'class-validator'
import {Target} from "../targeturls/entities";

interface EventEntiy{
 event: string,
 data: object
}


@Entity()
export class SentEvent extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsInt()
  @Column('integer', {nullable:false})
  status: number

  @Column('json', {nullable:false})
  event: object

  @ManyToOne(() => Target, target => target.sentEvents)
  target: Target

}
