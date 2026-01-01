import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  quantity: number;

  @Column({ nullable: true })
  specialRequest: string;

  @Column()  // New column added
  meal: string;
}