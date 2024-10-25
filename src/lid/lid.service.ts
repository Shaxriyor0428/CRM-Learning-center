import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateLidDto, UpdateLidDto } from "./dto";

@Injectable()
export class LidService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createLidDto: CreateLidDto) {
    const lid_status = await this.prisma.lidStatus.findUnique({
      where: { id: createLidDto.lid_statusId },
    });
    if (!lid_status) {
      throw new NotFoundException("Lid status not found");
    }

    const reason_lid = await this.prisma.reasonLid.findUnique({
      where: { id: createLidDto.cancel_reasonId },
    });
    if (!reason_lid) {
      throw new NotFoundException("Reason lid not found");
    }

    const stage = await this.prisma.stage.findUnique({
      where: { id: createLidDto.stageId },
    });
    if (!stage) {
      throw new NotFoundException("Stage not found");
    }

    const trial_lesson_group = await this.prisma.group.findUnique({
      where: { id: createLidDto.trial_lesson_groupId },
    });

    if (!trial_lesson_group) {
      throw new NotFoundException("Group not found");
    }

    const lid = await this.prisma.lid.create({
      data: createLidDto,
    });

    return lid;
  }

  findAll() {
    return this.prisma.lid.findMany({
      include: {
        LidStatus: true,
        ReasonLid: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.lid.findUnique({ where: { id } });
  }

  update(id: number, updateLidDto: UpdateLidDto) {
    return this.prisma.lid.update({ where: { id }, data: { ...updateLidDto } });
  }

  remove(id: number) {
    return this.prisma.lid.delete({ where: { id } });
  }
}
