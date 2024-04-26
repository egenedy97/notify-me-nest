import { userRole } from '@prisma/client';

export interface IUser {
  email: string;
  name: string;
  phone: string;
  role: userRole;
  password: string;
}
