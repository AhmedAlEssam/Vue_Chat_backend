//
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Message from "./message";

@Entity()
export default class Attachment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => Message, (message) => message.attachments)
    message: Message

}