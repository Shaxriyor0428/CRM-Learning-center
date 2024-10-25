import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsNumber,
  IsOptional,
  IsDateString,
} from "class-validator";

export class CreateLidDto {
  @IsString()
  @IsNotEmpty()
  readonly first_name: string;

  @IsString()
  @IsNotEmpty()
  readonly last_name: string;

  @IsString()
  @IsNotEmpty()
  readonly phone_number: string;

  @IsDateString()
  readonly test_date: string;

  @IsInt()
  @IsNotEmpty()
  readonly trial_lesson_date: number;

  @IsString()
  @IsNotEmpty()
  readonly trial_lesson_time: string;

  @IsNumber()
  readonly lid_statusId: number;

  @IsNumber()
  readonly cancel_reasonId: number;

  @IsNumber()
  readonly trial_lesson_groupId: number;

  @IsNumber()
  readonly stageId: number;
}
