import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from "class-validator";

export class CreateStaffDto {
  @IsString()
  @IsNotEmpty()
  readonly first_name: string;

  @IsString()
  @IsNotEmpty()
  readonly last_name: string;

  @IsNotEmpty()
  @IsPhoneNumber("UZ")
  readonly phone_number: string;

  @IsNotEmpty()
  @IsString()
  readonly login: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  confirm_password: string;

  @IsNotEmpty()
  @IsString()
  readonly role: string;
}
