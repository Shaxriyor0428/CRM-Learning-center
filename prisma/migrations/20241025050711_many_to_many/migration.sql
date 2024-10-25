/*
  Warnings:

  - You are about to drop the column `group_stageId` on the `Group` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_group_stageId_fkey";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "group_stageId";
