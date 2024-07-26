import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CartStatuses } from "../models";

@Entity({name: "carts"})
export class Cart {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({name: "user_id"})
    userId: string;

    @Column({ type: "enum", enum: CartStatuses})
    status: CartStatuses;

    @CreateDateColumn({ name: "created_at" ,type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;
}