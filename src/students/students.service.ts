import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateStudentDto, UpdateStudentDto } from "./dto";

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createStudentDto: CreateStudentDto) {
    const lid = await this.prisma.lid.findUnique({
      where: { id: createStudentDto.lidId },
    });
    if (!lid) {
      throw new NotFoundException("Lid not found");
    }

    const group = await this.prisma.group.findUnique({
      where: { id: createStudentDto.groupId },
    });

    if (!group) {
      throw new NotFoundException("Group not found");
    }

    return this.prisma.students.create({
      data: {
        first_name: createStudentDto.first_name,
        last_name: createStudentDto.last_name,
        phone_number: createStudentDto.phone_number,
        lidId: createStudentDto.lidId,
        gender: createStudentDto.gender,
        birth_day: createStudentDto.birth_day,
        StudentGroup: { create: [{ groupId: group.id }] },
      },
    });
  }

  findAll() {
    return this.prisma.students.findMany({
      include: {
        Payment: true,
        Lid: true,
        StudentGroup: { include: { Group: true } },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.students.findUnique({
      where: { id },
      include: { Payment: true, Lid: true },
    });
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return this.prisma.students.update({
      where: { id },
      data: updateStudentDto,
    });
  }

  remove(id: number) {
    return this.prisma.students.delete({ where: { id } });
  }
}
