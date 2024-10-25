import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateLidStatusDto, UpdateLidStatusDto } from "./dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class LidStatusService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createLidStatusDto: CreateLidStatusDto) {
    return this.prismaService.lidStatus.create({
      data: { ...createLidStatusDto },
    });
  }

  findAll() {
    return this.prismaService.lidStatus.findMany();
  }

  findOne(id: number) {
    return this.prismaService.lidStatus.findUnique({ where: { id } });
  }

  update(id: number, updateLidStatusDto: UpdateLidStatusDto) {
    return this.prismaService.lidStatus.update({
      where: { id },
      data: { ...updateLidStatusDto },
    });
  }

  async remove(id: number) {
    const lid_status = await this.prismaService.lidStatus.findUnique({ where: { id } });
    if(!lid_status){
      throw new BadRequestException("This lid status is not found")
    }
    return this.prismaService.lidStatus.delete({ where: { id } });
  }
}
