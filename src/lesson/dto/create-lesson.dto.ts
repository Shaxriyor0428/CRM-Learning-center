import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  lesson_theme: string;

  @IsNumber()
  @IsNotEmpty()
  lesson_number: number;

  @IsNumber()
  groupId: number;

  @IsDateString()
  @IsNotEmpty()
  lesson_date: string;
}
