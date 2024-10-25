import { Module } from "@nestjs/common";
import { LidService } from "./lid.service";
import { LidController } from "./lid.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  controllers: [LidController],
  providers: [LidService],
  imports: [PrismaModule],
})
export class LidModule {}
