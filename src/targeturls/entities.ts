import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {IsString, IsUrl, IsBoolean} from 'class-validator'

@Entity()
export class Target extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text', {nullable:false})
  name: string

  //@IsBoolean()
  @Column('boolean', {nullable:false, default: true})
  active: boolean

  @IsUrl()
  @Column('text', {nullable:false})
  url: string

  @OneToMany(() => Subscription, subscription => subscription.target)
  subscriptions: Subscription[]

}

@Entity()
export class Subscription extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text', {nullable:false})
  name: string

  @ManyToOne(() => Target, target => target.subscriptions, {eager:true})
  target: Target

}