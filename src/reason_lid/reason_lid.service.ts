import { Injectable } from "@nestjs/common";
import { CreateReasonLidDto, UpdateReasonLidDto } from "./dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ReasonLidService {
  constructor(private readonly prisma: PrismaService) {}
  create(createReasonLidDto: CreateReasonLidDto) {
    return this.prisma.reasonLid.create({ data: { ...createReasonLidDto } });
  }

  findAll() {
    return this.prisma.reasonLid.findMany();
  }

  findOne(id: number) {
    return this.prisma.reasonLid.findUnique({ where: { id } });
  }

  update(id: number, updateReasonLidDto: UpdateReasonLidDto) {
    return this.prisma.reasonLid.update({
      where: { id },
      data: { ...updateReasonLidDto },
    });
  }

  remove(id: number) {
    return this.prisma.reasonLid.delete({ where: { id } });
  }
}
