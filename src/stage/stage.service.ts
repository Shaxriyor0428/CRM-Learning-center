import { Injectable } from "@nestjs/common";
import { CreateStageDto, UpdateStageDto } from "./dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class StageService {
  constructor(private readonly prisma: PrismaService) {}
  create(createStageDto: CreateStageDto) {
    return this.prisma.stage.create({ data: createStageDto });
  }

  findAll() {
    return this.prisma.stage.findMany();
  }

  findOne(id: number) {
    return this.prisma.stage.findUnique({ where: { id } });
  }

  update(id: number, updateStageDto: UpdateStageDto) {
    return this.prisma.stage.update({
      where: { id },
      data: updateStageDto,
    });
  }

  remove(id: number) {
    return this.prisma.stage.delete({ where: { id } });
  }
}
