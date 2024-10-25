import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { LidStatusModule } from "./lid_status/lid_status.module";
import { ReasonLidModule } from "./reason_lid/reason_lid.module";
import { LidModule } from "./lid/lid.module";
import { BranchModule } from "./branch/branch.module";
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { StaffModule } from './staff/staff.module';
import { GroupModule } from './group/group.module';
import { StageModule } from './stage/stage.module';
import { PaymentModule } from './payment/payment.module';
import { StudentsModule } from './students/students.module';
import { LessonModule } from './lesson/lesson.module';
import { StudentLessonModule } from './student_lesson/student_lesson.module';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    PrismaModule,
    LidStatusModule,
    ReasonLidModule,
    LidModule,
    BranchModule,
    RoleModule,
    AuthModule,
    StaffModule,
    GroupModule,
    StageModule,
    PaymentModule,
    StudentsModule,
    LessonModule,
    StudentLessonModule,
  ],
})
export class AppModule {}
