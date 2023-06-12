import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Message from "./message";
import Conversation from "./conversation";

@Entity()
export default class User extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ default: 'Male' })
    gender: string

    @Column({ default: 'src/assets/imgs/default-pfp-m.svg' })
    pfp: string

    @Column({ unique: true })
    email: string

    @Column({ select: false })
    password: string

    @Column({ select: false })
    authToken: string

    @CreateDateColumn()
    lastseen: string

    @Column("int", { array: true, default: [] })
    contacts: number[]

    @Column("int", { array: true, default: [] })
    blocked: number[]

    @Column("int", { array: true, default: [] })
    requests: number[]

    @Column("int", { array: true, default: [] })
    sentRequests: number[]

    @CreateDateColumn()
    createdAt: Date

    @OneToMany(() => Message, (message) => message.user)
    messages: Message[]

    @ManyToMany(() => Conversation, (conversation) => conversation.users)
    conversations: Conversation[]

}