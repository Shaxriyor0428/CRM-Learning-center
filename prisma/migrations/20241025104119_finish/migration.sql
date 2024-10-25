/*
  Warnings:

  - Made the column `lid_statusId` on table `lid` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cancel_reasonId` on table `lid` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "lid" DROP CONSTRAINT "lid_cancel_reasonId_fkey";

-- DropForeignKey
ALTER TABLE "lid" DROP CONSTRAINT "lid_lid_statusId_fkey";

-- AlterTable
ALTER TABLE "lid" ALTER COLUMN "lid_statusId" SET NOT NULL,
ALTER COLUMN "cancel_reasonId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "lid" ADD CONSTRAINT "lid_lid_statusId_fkey" FOREIGN KEY ("lid_statusId") REFERENCES "lid_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lid" ADD CONSTRAINT "lid_cancel_reasonId_fkey" FOREIGN KEY ("cancel_reasonId") REFERENCES "reason_lid"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
