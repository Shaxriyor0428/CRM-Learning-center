import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateLessonDto, UpdateLessonDto } from "./dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class LessonService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createLessonDto: CreateLessonDto) {
    const group = await this.prisma.group.findUnique({
      where: { id: createLessonDto.groupId },
    });
    if (!group) {
      throw new NotFoundException("Group not found");
    }
    return this.prisma.lesson.create({ data: createLessonDto });
  }

  findAll() {
    return this.prisma.lesson.findMany({
      include: { Group: true, StudentLesson: { include: { Students: true } } },
    });
  }

  findOne(id: number) {
    return this.prisma.lesson.findUnique({
      where: { id },
      include: { Group: true, StudentLesson: { include: { Students: true } } },
    });
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return this.prisma.lesson.update({
      where: { id },
      data: updateLessonDto,
    });
  }

  remove(id: number) {
    return this.prisma.lesson.delete({
      where: { id },
    });
  }
}
