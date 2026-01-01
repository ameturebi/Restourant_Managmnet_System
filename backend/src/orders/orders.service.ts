import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) // Injecting the repository for the Order entity
    private ordersRepository: Repository<Order>,
  ) {}

  // Create a new order
  async create(orderData: Partial<Order>): Promise<Order> {
    const order = this.ordersRepository.create(orderData); // Create a new instance
    return await this.ordersRepository.save(order); // Save to database
  }

  // Get all orders
  async findAll(): Promise<Order[]> {
    return await this.ordersRepository.find(); // Retrieve all orders
  }

  // Get one order by id
  async findOne(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id: id },
    });
    if (!order) {
      throw new Error('Order not found'); // Handle case where order is not found
    }
    return order;
  }

  // Update an order
  async update(id: number, orderData: Partial<Order>): Promise<Order> {
    const order = await this.findOne(id); // Check if the order exists
    await this.ordersRepository.update(id, orderData); // Update the order
    return { ...order, ...orderData }; // Return updated order
  }

  // Delete an order
  async remove(id: number): Promise<void> {
    const order = await this.findOne(id); // Ensure the order exists before deleting
    await this.ordersRepository.delete(id); // Delete the order
  }
}