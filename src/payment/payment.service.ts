import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePaymentDto, UpdatePaymentDto } from "./dto";

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPaymentDto: CreatePaymentDto) {
    const student = await this.prisma.students.findUnique({
      where: { id: createPaymentDto.studentId },
    });
    if (!student) {
      throw new NotFoundException("Student is not found");
    }
    return this.prisma.payment.create({ data: { ...createPaymentDto } });
  }

  findAll() {
    return this.prisma.payment.findMany({
      include: { Student: true },
    });
  }

  findOne(id: number) {
    return this.prisma.payment.findUnique({
      where: { id },
    });
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.prisma.payment.update({
      where: { id },
      data: updatePaymentDto,
    });
  }

  remove(id: number) {
    return this.prisma.payment.delete({ where: { id } });
  }
}
