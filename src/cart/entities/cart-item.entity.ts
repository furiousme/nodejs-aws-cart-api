import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";

@Entity({name: "cart_items"})
export class CartItem {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({name: "cart_id"})
    cartId: string;
  
    @ManyToOne(() => Cart, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'cart_id' })
    cart: Cart;
    
    @Column({name: "product_id"})
    productId: string;

    @Column()
    count: number;
}