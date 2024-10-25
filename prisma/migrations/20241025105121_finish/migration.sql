/*
  Warnings:

  - You are about to drop the column `group_stageId` on the `group` table. All the data in the column will be lost.
  - Added the required column `stageId` to the `group` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "group" DROP CONSTRAINT "group_group_stageId_fkey";

-- AlterTable
ALTER TABLE "group" DROP COLUMN "group_stageId",
ADD COLUMN     "stageId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "group" ADD CONSTRAINT "group_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "stage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
