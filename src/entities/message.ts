import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import Conversation from "./conversation";
import User from "./user";

@Entity()
export default class Message extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    text: string

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => Conversation,(conversation)=> conversation.messages)
    conversation: Conversation

    @ManyToOne(() => User,(user)=> user.messages,{eager: true})
    user: User



}