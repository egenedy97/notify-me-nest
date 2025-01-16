import { IsInt, Min } from 'class-validator';

export class PagingResponseDto<T> {
  @IsInt()
  @Min(1)
  page: number;

  @IsInt()
  @Min(1)
  pageSize: number;

  @IsInt()
  @Min(0)
  totalItems: number;

  @IsInt()
  @Min(1)
  totalPages: number;

  data: T[];
}
