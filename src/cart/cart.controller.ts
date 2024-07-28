import { Controller, Get, Delete, Put, Body, Req, Post, UseGuards, HttpStatus } from '@nestjs/common';

// import { BasicAuthGuard, JwtAuthGuard } from '../auth';
import { OrderService } from '../order';
import { AppRequest, getUserIdFromRequest } from '../shared';

import { calculateCartTotal } from './models-rules';
import { CartService } from './services';

const userId = "46442aee-1ae2-4fb1-a468-36bfa54eb3b8"  // TODO: temp, remove later

@Controller('api/profile/cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) { }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Get()
  async findUserCart(@Req() req: AppRequest) {
    try {
      // const userId = getUserIdFromRequest(req);
      const cart = await this.cartService.findOrCreateByUserId(userId);

      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: cart,
      }
    } catch (e) {
      console.log(e);

      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to create a cart',
      }
    }

  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Put()
  async updateUserCart(@Req() req: AppRequest, @Body() body) { // TODO: validate body payload...
    try {
      // const userId = getUserIdFromRequest(req);
      const {count, product} = body;
      const cart = await this.cartService.updateByUserId(userId, {count, product});
  
      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: cart
      }
    } catch (e) {
      console.log(e)
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to update a cart',
      }
    }
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  // @Delete()
  // clearUserCart(@Req() req: AppRequest) {
  //   this.cartService.removeByUserId(getUserIdFromRequest(req));

  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: 'OK',
  //   }
  // }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  // @Post('checkout')
  // checkout(@Req() req: AppRequest, @Body() body) {
  //   const userId = getUserIdFromRequest(req);
  //   const cart = this.cartService.findByUserId(userId);

  //   if (!(cart && cart.items.length)) {
  //     const statusCode = HttpStatus.BAD_REQUEST;
  //     req.statusCode = statusCode

  //     return {
  //       statusCode,
  //       message: 'Cart is empty',
  //     }
  //   }

  //   const { id: cartId, items } = cart;
  //   const total = calculateCartTotal(cart);
  //   const order = this.orderService.create({
  //     ...body, // TODO: validate and pick only necessary data
  //     userId,
  //     cartId,
  //     items,
  //     total,
  //   });
  //   this.cartService.removeByUserId(userId);

  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: 'OK',
  //     data: { order }
  //   }
  // }
}
