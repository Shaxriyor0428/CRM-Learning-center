/*
  Warnings:

  - A unique constraint covering the columns `[login]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Staff_login_key" ON "Staff"("login");
