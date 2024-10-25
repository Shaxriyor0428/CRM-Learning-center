import { IsNotEmpty, IsString } from "class-validator";

export class CreateStageDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
