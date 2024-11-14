import { Injectable } from '@nestjs/common';
import { Guest } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GuestService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Guest[]> {
    return this.prisma.guest.findMany();
  }

  async findOne(id: number): Promise<Guest | null> {
    return this.prisma.guest.findUnique({ where: { id: Number(id) } });
  }

  async create(data: Guest): Promise<Guest> {
    return this.prisma.guest.create({ data });
  }

  async update(id: number, data: Guest): Promise<Guest> {
    return this.prisma.guest.update({
      where: { id: Number(id) },
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        rsvp_status: data.rsvp_status,
      },
    });
  }

  async remove(id: number): Promise<Guest> {
    return this.prisma.guest.delete({
      where: { id: Number(id) },
    });
  }
}
