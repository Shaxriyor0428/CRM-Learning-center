/*
  Warnings:

  - You are about to drop the `Branch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lid` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lid" DROP CONSTRAINT "Lid_cancel_reasonId_fkey";

-- DropForeignKey
ALTER TABLE "Lid" DROP CONSTRAINT "Lid_lid_statusId_fkey";

-- DropTable
DROP TABLE "Branch";

-- DropTable
DROP TABLE "Lid";

-- DropTable
DROP TABLE "Role";

-- CreateTable
CREATE TABLE "lid" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "test_date" TIMESTAMP(3) NOT NULL,
    "trial_lesson_date" INTEGER NOT NULL,
    "trial_lesson_time" TEXT NOT NULL,
    "lid_statusId" INTEGER,
    "cancel_reasonId" INTEGER,

    CONSTRAINT "lid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "branch" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "call_number" TEXT NOT NULL,

    CONSTRAINT "branch_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lid" ADD CONSTRAINT "lid_lid_statusId_fkey" FOREIGN KEY ("lid_statusId") REFERENCES "lid_status"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lid" ADD CONSTRAINT "lid_cancel_reasonId_fkey" FOREIGN KEY ("cancel_reasonId") REFERENCES "reason_lid"("id") ON DELETE SET NULL ON UPDATE CASCADE;
