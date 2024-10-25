import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateBranchDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber("UZ")
  call_number: string;
}
