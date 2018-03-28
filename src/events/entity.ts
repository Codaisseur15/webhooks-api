import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Target} from "../targeturls/entities";

@Entity()
export class SentEvent extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('integer', {nullable:false})
  status: number

  @Column('json', {nullable:false})
  event: object

  @ManyToOne(() => Target, target => target.sentEvents)
  target: Target

}