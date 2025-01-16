import { Type } from 'class-transformer';
import { IsInt, Min, IsOptional, IsIn } from 'class-validator';

export class PagingDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  size = 10;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sort?: string = 'asc';
}
