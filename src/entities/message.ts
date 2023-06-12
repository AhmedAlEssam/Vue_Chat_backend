//message.ts
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Conversation from "./conversation";
import User from "./user";
import Attachment from "./attachment";

@Entity()
export default class Message extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    text: string

    @Column("int", { array: true, default: [] })
    seenBy: number[]

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => Conversation, (conversation) => conversation.messages)
    conversation: Conversation

    @ManyToOne(() => User, (user) => user.messages, { eager: true })
    user: User

    @OneToMany(() => Attachment, (attachment) => attachment.message, { eager: true })
    attachments: Attachment[]

}