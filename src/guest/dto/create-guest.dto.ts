import { IsOptional, IsString, IsEmail } from 'class-validator';

export class CreateGuestDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  rsvp_status?: string;
}
