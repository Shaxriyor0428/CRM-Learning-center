import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateGroupDto, UpdateGroupDto } from "./dto";

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createGroupDto: CreateGroupDto) {
    const staff = await this.prisma.staff.findUnique({
      where: { id: createGroupDto.staffId },
    });
    if (!staff) {
      throw new BadRequestException("Staff is not defined");
    }

    const branch = await this.prisma.branch.findUnique({
      where: { id: createGroupDto.branchId },
    });
    if (!branch) {
      throw new NotFoundException("Branch not found");
    }

    const stage = await this.prisma.stage.findUnique({
      where: { id: createGroupDto.stageId },
    });
    if (!stage) {
      throw new NotFoundException("Stage not found");
    }

    const old_group = await this.prisma.group.findUnique({
      where: { group_name: createGroupDto.group_name },
    });

    if (old_group) {
      throw new ForbiddenException("Group already exists");
    }

    const group = await this.prisma.group.create({
      data: {
        group_name: createGroupDto.group_name,
        lesson_start_time: createGroupDto.lesson_start_time,
        lesson_continious: createGroupDto.lesson_continious,
        lesson_week_day: createGroupDto.lesson_week_day,
        room_number: createGroupDto.room_number,
        room_floor: createGroupDto.room_floor,
        branchId: createGroupDto.branchId,
        lesson_quant: createGroupDto.lesson_quant,
        stageId: createGroupDto.stageId,
        GroupStaff: {
          create: [{ staffId: staff.id }],
        },
      },
    });
    return {
      group,
    };
  }

  findAll() {
    return this.prisma.group.findMany({
      include: {
        GroupStaff: { include: { staff: true } },
        Branch: true,
        Stage: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.group.findUnique({
      where: { id },
      include: { GroupStaff: { include: { group: true } } },
    });
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return this.prisma.group.update({
      where: { id },
      data: { ...updateGroupDto },
    });
  }

  remove(id: number) {
    return this.prisma.group.delete({ where: { id } });
  }
}
