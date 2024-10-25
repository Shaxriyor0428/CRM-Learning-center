/*
  Warnings:

  - You are about to alter the column `price` on the `payment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "payment" ALTER COLUMN "payment_last_date" SET DATA TYPE TEXT,
ALTER COLUMN "payment_date" SET DATA TYPE TEXT,
ALTER COLUMN "price" SET DATA TYPE INTEGER;
