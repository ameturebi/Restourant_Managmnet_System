import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 
import { RolesGuard } from '../auth/roles.guard'; 
import { Roles } from '../auth/roles.decorator'; 

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // ✅ Create a new order (Open to all customers)
  @Post()
  async create(@Body() orderData: Order): Promise<Order> {
    return await this.ordersService.create(orderData);
  }

  // ✅ Get all orders (Admin only)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  async findAll(): Promise<Order[]> {
    return await this.ordersService.findAll();
  }

  // ✅ Get a specific order by id (Admin only)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Order> {
    return await this.ordersService.findOne(id);
  }

  // ✅ Update an order (Admin only)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() orderData: Order,
  ): Promise<Order> {
    return await this.ordersService.update(id, orderData);
  }

  // ✅ Delete an order (Admin only)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.ordersService.remove(id);
  }
}