import { Injectable } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}
  create(createRoleDto: CreateRoleDto) {
    return this.prisma.role.create({ data: { name: createRoleDto.name } });
  }

  findAll() {
    return this.prisma.role.findMany({
      include: { staffs: { include: { staff: true } } },
    });
  }

  
  findOne(id: number) {
    return this.prisma.role.findUnique({ where: { id } });
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.prisma.role.update({
      where: { id },
      data: { name: updateRoleDto.name },
    });
  }

  remove(id: number) {
    return this.prisma.role.delete({ where: { id } });
  }
}
