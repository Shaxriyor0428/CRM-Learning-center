import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "../prisma/prisma.module";
import {
  AccessTokenStrategy,
  RefreshTokenStrategy,
} from "../common/startegies";
import { StaffModule } from "../staff/staff.module";

@Module({
  imports: [PrismaModule, JwtModule.register({}), StaffModule],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
