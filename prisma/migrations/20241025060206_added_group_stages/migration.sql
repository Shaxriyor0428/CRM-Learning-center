-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "group_stageId" INTEGER;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_group_stageId_fkey" FOREIGN KEY ("group_stageId") REFERENCES "stage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
