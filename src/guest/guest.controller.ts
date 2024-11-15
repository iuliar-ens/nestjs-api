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
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';

@Controller('api/v1/guest')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @Get()
  async findAll(): Promise<Guest[]> {
    return this.guestService.findAll();
  }

  @Post()
  async create(@Body() postData: CreateGuestDto): Promise<CreateGuestDto> {
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
    @Body() postData: UpdateGuestDto,
  ): Promise<UpdateGuestDto> {
    return this.guestService.update(id, postData);
  }
}
