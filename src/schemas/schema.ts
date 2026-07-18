import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Max, Min } from "class-validator";
import { PaginationDto } from "./pagination.schema.js";

export class CreateReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  @Type(() => Number)
  rating!: number;

  @IsString()
  @Max(255)
  @IsOptional()
  comment?: string;
}

export class QueryReviewsDto extends PaginationDto {
  @IsInt()
  @Min(1)
  @Max(5)
  @Type(() => Number)
  minRating!: number;
}
