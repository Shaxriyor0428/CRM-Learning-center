import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateBranchDto, UpdateBranchDto } from "./dto";

@Injectable()
export class BranchService {
  constructor(private readonly prisma: PrismaService) {}
  create(createBranchDto: CreateBranchDto) {
    return this.prisma.branch.create({ data: { ...createBranchDto } });
  }

  findAll() {
    return this.prisma.branch.findMany();
  }

  findOne(id: number) {
    return this.prisma.branch.findUnique({ where: { id } });
  }

  update(id: number, updateBranchDto: UpdateBranchDto) {
    return this.prisma.branch.update({
      where: { id },
      data: { ...updateBranchDto },
    });
  }

  remove(id: number) {
    return this.prisma.branch.delete({ where: { id } });
  }
}
