/*
  Warnings:

  - You are about to drop the `Lesson` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `stageId` to the `lid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trial_lesson_groupId` to the `lid` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lid" ADD COLUMN     "stageId" INTEGER NOT NULL,
ADD COLUMN     "trial_lesson_groupId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Lesson";

-- CreateTable
CREATE TABLE "lesson" (
    "id" SERIAL NOT NULL,
    "lesson_theme" TEXT NOT NULL,
    "lesson_number" INTEGER NOT NULL,
    "lesson_date" TEXT NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_lesson" (
    "lessonId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "is_there" BOOLEAN NOT NULL,
    "reason" TEXT NOT NULL,
    "be_paid" BOOLEAN NOT NULL,

    CONSTRAINT "student_lesson_pkey" PRIMARY KEY ("lessonId","studentId")
);

-- AddForeignKey
ALTER TABLE "lid" ADD CONSTRAINT "lid_trial_lesson_groupId_fkey" FOREIGN KEY ("trial_lesson_groupId") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lid" ADD CONSTRAINT "lid_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "stage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson" ADD CONSTRAINT "lesson_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_lesson" ADD CONSTRAINT "student_lesson_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_lesson" ADD CONSTRAINT "student_lesson_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
