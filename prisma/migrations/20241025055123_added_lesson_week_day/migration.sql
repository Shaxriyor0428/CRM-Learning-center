/*
  Warnings:

  - The `lesson_week_day` column on the `Group` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Group" DROP COLUMN "lesson_week_day",
ADD COLUMN     "lesson_week_day" INTEGER[];

-- DropEnum
DROP TYPE "EnumWeekDay";
