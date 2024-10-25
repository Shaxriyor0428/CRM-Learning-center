import { IsNotEmpty, IsString } from "class-validator";

export class CreateReasonLidDto {
  @IsString()
  @IsNotEmpty()
  readonly reason_lid: string;
}
