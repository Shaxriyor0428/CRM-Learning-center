import { IsNotEmpty, IsString } from "class-validator";

export class CreateLidStatusDto {
  @IsString()
  @IsNotEmpty()
  readonly status: string;
}
