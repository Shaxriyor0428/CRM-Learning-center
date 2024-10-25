import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";
import { PrismaService } from "../prisma/prisma.service";
import { hash } from "bcrypt";

@Injectable()
export class StaffService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStaffDto: CreateStaffDto) {
    const candidate = await this.prisma.staff.findUnique({
      where: { login: createStaffDto.login },
    });

    if (candidate) {
      throw new BadRequestException({
        message: "User with this login already exists",
      });
    }
    const role = await this.prisma.role.findUnique({
      where: {
        name: createStaffDto.role,
      },
    });

    if (!role) {
      throw new NotFoundException("Role not found");
    }

    if (createStaffDto.password !== createStaffDto.confirm_password) {
      throw new BadRequestException("The password does not match");
    }
    const hashed_password = await hash(createStaffDto.password, 7);
    const newUser = await this.prisma.staff.create({
      data: {
        first_name: createStaffDto.first_name,
        last_name: createStaffDto.last_name,
        phone_number: createStaffDto.phone_number,
        login: createStaffDto.login,
        hashed_password: hashed_password,
        roles: {
          create: [{ roleId: role.id }],
        },
      },
    });
    return newUser;
  }

  findAll() {
    return this.prisma.staff.findMany({
      include: {
        roles: { include: { role: true } },
        GroupStaff: { include: { group: true } },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.staff.findUnique({
      where: { id },
      include: { roles: { include: { role: true } } },
    });
  }

  update(id: number, updateStaffDto: UpdateStaffDto) {
    return this.prisma.staff.update({
      where: { id },
      data: { ...updateStaffDto },
    });
  }

  remove(id: number) {
    return this.prisma.staff.delete({ where: { id } });
  }
}
