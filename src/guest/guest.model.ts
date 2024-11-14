import { Prisma } from '@prisma/client';

export class Guest implements Prisma.GuestCreateInput {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  rsvp_status?: string;
}
