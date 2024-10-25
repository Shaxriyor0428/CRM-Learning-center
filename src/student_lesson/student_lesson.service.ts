import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateStudentLessonDto, UpdateStudentLessonDto } from "./dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class StudentLessonService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createStudentLessonDto: CreateStudentLessonDto) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: createStudentLessonDto.lessonId },
    });

    if (!lesson) {
      throw new NotFoundException("Lesson not found");
    }

    const student = await this.prisma.students.findUnique({
      where: { id: createStudentLessonDto.studentId },
    });

    if (!student) {
      throw new NotFoundException("Student not found");
    }

    const existingStudentLesson = await this.prisma.studentLesson.findUnique({
      where: {
        lessonId_studentId: {
          lessonId: createStudentLessonDto.lessonId,
          studentId: createStudentLessonDto.studentId,
        },
      },
    });

    if (existingStudentLesson) {
      throw new ConflictException(
        "This lesson and student combination already exists."
      );
    }

    const student_lesson = await this.prisma.studentLesson.create({
      data: {
        lessonId: createStudentLessonDto.lessonId,
        studentId: createStudentLessonDto.studentId,
        reason: createStudentLessonDto.reason,
        is_there: createStudentLessonDto.is_there,
        be_paid: createStudentLessonDto.be_paid,
      },
    });

    return student_lesson;
  }

  findAll() {
    return `This action returns all studentLesson`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentLesson`;
  }

  update(id: number, updateStudentLessonDto: UpdateStudentLessonDto) {
    return `This action updates a #${id} studentLesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentLesson`;
  }
}
