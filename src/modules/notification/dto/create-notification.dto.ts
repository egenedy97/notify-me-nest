import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  ValidateIf,
} from 'class-validator';
import { notificationStatus, notificationType } from '@prisma/client';

export class NotificationCreationDto {
  @IsEnum(notificationType, { message: 'Invalid notification type' })
  @IsNotEmpty()
  type: notificationType;

  @IsNotEmpty({ message: 'Firing time is required' })
  @IsDateString(
    {},
    { message: 'Firing time must be a valid ISO 8601 date string' },
  )
  firingTime: string;

  @IsString({ message: 'Title must be a string' })
  @IsOptional()
  title?: string = '';

  @IsString({ message: 'Message must be a string' })
  @IsNotEmpty()
  message: string;

  @ValidateIf((o) => o.type !== 'email')
  @IsString({ message: 'Phone must be a string' })
  @IsNotEmpty({ message: 'Phone is required for non-email notifications' })
  phone?: string = '';

  @ValidateIf((o) => o.type === 'email')
  @IsString({ message: 'Email must be a string' })
  @IsNotEmpty({ message: 'Email is required for email notifications' })
  email?: string = '';
}
