import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  readonly group_name: string;
  @IsString()
  @IsNotEmpty()
  readonly lesson_start_time: string;

  @IsString()
  @IsNotEmpty()
  readonly lesson_continious: string;

  @IsNotEmpty()
  readonly lesson_week_day: number[];

  @IsNumber()
  @IsNotEmpty()
  readonly room_number: number;

  @IsNumber()
  @IsNotEmpty()
  readonly room_floor: number;

  @IsNumber()
  @IsNotEmpty()
  readonly branchId: number;

  @IsNumber()
  @IsNotEmpty()
  readonly lesson_quant: number;

  @IsNumber()
  readonly staffId: number;

  @IsNumber()
  readonly stageId: number;
}
