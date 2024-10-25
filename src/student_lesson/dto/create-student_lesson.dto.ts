import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateStudentLessonDto {
  @IsNumber()
  readonly lessonId: number;

  @IsNumber()
  readonly studentId: number;

  @IsBoolean()
  @IsOptional()
  readonly is_there: boolean;

  @IsString()
  readonly reason: string;

  @IsBoolean()
  @IsOptional()
  be_paid: boolean;
}
