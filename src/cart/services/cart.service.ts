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

    if (cart) return {...cart, items: []}; // TODO: temp, remove later
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
    const userCart = this.findByUserId(userId);

    if (userCart) return userCart;

    return this.createByUserId(userId, items);
  }

  // updateByUserId(userId: string, { items }: Cart): Cart {
  //   const { id, ...rest } = this.findOrCreateByUserId(userId);

  //   const updatedCart = {
  //     id,
  //     ...rest,
  //     items: [ ...items ],
  //   }

  //   this.userCarts[ userId ] = { ...updatedCart };

  // await this.cartRepository.manager.transaction(async manager => {
  //   savedCart = await manager.save(newCart);

  //   for (const item of items) {
  //     item.cartId = savedCart.id;
  //     await manager.save(item);
  //   }
  // });

  //   return { ...updatedCart };
  // }

  // removeByUserId(userId): void {
  //   this.userCarts[ userId ] = null;
  // }
}
