import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from "class-validator";

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  readonly first_name: string;

  @IsString()
  @IsNotEmpty()
  readonly last_name: string;

  @IsNumber()
  readonly lidId: number;

  @IsPhoneNumber("UZ")
  readonly phone_number: string;

  @IsDateString()
  readonly birth_day: string;

  @IsNotEmpty()
  @IsEnum({ erkak: "erkak", ayol: "ayol" })
  readonly gender: string;

  @IsNumber()
  readonly groupId: number;
}
