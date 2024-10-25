import {
  IsBoolean,
  IsDateString,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreatePaymentDto {
  @IsNumber()
  readonly studentId: number;

  @IsDateString()
  readonly payment_last_date: string;

  @IsDateString()
  readonly payment_date: string;

  @IsNumber()
  readonly price: number;

  @IsBoolean()
  @IsNotEmpty()
  readonly is_paid: boolean;

  @IsNumber()
  readonly total_price: number;
}
