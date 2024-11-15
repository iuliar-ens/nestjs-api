import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateGuestDto {
  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  rsvp_status?: string;
}
