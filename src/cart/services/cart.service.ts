import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from '../entities/cart.entity';
import { Repository } from 'typeorm';
import { CartStatuses } from '../models';
import { CartItem } from '../entities/cart-item.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem) private cartItemRepository: Repository<CartItem>) { 
  }

  async findByUserId(userId: string) {
    const cart = await this.cartRepository.findOneBy({userId});
    const items = cart ? await this.cartItemRepository.findBy({cartId: cart.id}) : [];

    if (cart) return {...cart, items};
  }

  async createByUserId(userId: string, items: any[]) {
    const newCart = this.cartRepository.create({
      userId: userId,
      status: CartStatuses.OPEN,
      createdAt: new Date()
    })

    const savedCart = await this.cartRepository.save(newCart);
    
    return { ...savedCart, items: []}
  }

  async findOrCreateByUserId(userId: string, items = []) {
    const userCart = await this.findByUserId(userId);

    console.log("CART WAS FOUND")
    
    if (userCart) return userCart;

    return this.createByUserId(userId, items);
  }

  async updateByUserId(userId: string, {count, product}) {
    const cart = await this.findOrCreateByUserId(userId);
    const { id: cartId } = cart;
    const itemWithCartId = this.cartItemRepository.create({
      productId: product.id,
      cartId,
      count
    });
    const itemsInCart = await this.cartItemRepository.findBy({cartId});
    const existingProduct = itemsInCart.find(el => el.productId === itemWithCartId.productId);
    const itemToSave = existingProduct ? {...itemWithCartId, id: existingProduct.id} : itemWithCartId
    
    await this.cartItemRepository.save(itemToSave);
    
    const items = await this.cartItemRepository.findBy({cartId});
  
    return { ...cart, items };
  }

  removeByUserId(userId) {
    return this.cartRepository.delete({userId});
  }
}
