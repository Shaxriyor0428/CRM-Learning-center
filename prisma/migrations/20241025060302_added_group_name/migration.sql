/*
  Warnings:

  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_branchId_fkey";

-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_group_stageId_fkey";

-- DropForeignKey
ALTER TABLE "group_staff" DROP CONSTRAINT "group_staff_groupId_fkey";

-- DropTable
DROP TABLE "Group";

-- CreateTable
CREATE TABLE "group" (
    "id" SERIAL NOT NULL,
    "group_name" TEXT NOT NULL,
    "lesson_start_time" TEXT NOT NULL,
    "lesson_continious" TEXT NOT NULL,
    "lesson_week_day" INTEGER[],
    "group_stageId" INTEGER,
    "room_number" INTEGER NOT NULL,
    "room_floor" INTEGER NOT NULL,
    "branchId" INTEGER NOT NULL,
    "lesson_quant" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "group_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "group_group_name_key" ON "group"("group_name");

-- AddForeignKey
ALTER TABLE "group" ADD CONSTRAINT "group_group_stageId_fkey" FOREIGN KEY ("group_stageId") REFERENCES "stage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group" ADD CONSTRAINT "group_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_staff" ADD CONSTRAINT "group_staff_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
