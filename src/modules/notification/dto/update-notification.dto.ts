import { IsEnum, IsOptional, IsString, IsDateString } from 'class-validator';
import { notificationStatus, notificationType } from '@prisma/client';

export class NotificationUpdatingDto {
  @IsEnum(notificationType, { message: 'Invalid notification type' })
  @IsOptional()
  type?: notificationType;

  @IsEnum(notificationStatus, { message: 'Invalid notification status' })
  @IsOptional()
  status?: notificationStatus;

  @IsDateString(
    {},
    { message: 'Firing time must be a valid ISO 8601 date string' },
  )
  @IsOptional()
  firingTime?: string;

  @IsString({ message: 'Title must be a string' })
  @IsOptional()
  title?: string;

  @IsString({ message: 'Message must be a string' })
  @IsOptional()
  message?: string;

  @IsString({ message: 'Phone number must be a string' })
  @IsOptional()
  phone?: string;

  @IsString({ message: 'Email address must be a string' })
  @IsOptional()
  email?: string;
}
