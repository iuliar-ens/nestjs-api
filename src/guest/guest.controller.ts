import { Guest } from '@prisma/client';
import { GuestService } from './guest.service';
import {
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Controller,
} from '@nestjs/common';

@Controller('api/v1/guest')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @Get()
  async findAll(): Promise<Guest[]> {
    return this.guestService.findAll();
  }

  @Post()
  async create(@Body() postData: Guest): Promise<Guest> {
    return this.guestService.create(postData);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Guest | null> {
    return this.guestService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<Guest> {
    return this.guestService.remove(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() postData: Guest,
  ): Promise<Guest> {
    return this.guestService.update(id, postData);
  }
}
