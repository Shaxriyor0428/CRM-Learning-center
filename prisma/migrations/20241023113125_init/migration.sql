-- CreateTable
CREATE TABLE "Lid" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "test_date" TIMESTAMP(3) NOT NULL,
    "trial_lesson_date" INTEGER NOT NULL,
    "trial_lesson_time" TEXT NOT NULL,
    "lid_statusId" INTEGER,
    "cancel_reasonId" INTEGER,

    CONSTRAINT "Lid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lid_status" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "lid_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reason_lid" (
    "id" SERIAL NOT NULL,
    "reason_lid" TEXT NOT NULL,

    CONSTRAINT "reason_lid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Branch" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "call_number" TEXT NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Lid" ADD CONSTRAINT "Lid_lid_statusId_fkey" FOREIGN KEY ("lid_statusId") REFERENCES "lid_status"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lid" ADD CONSTRAINT "Lid_cancel_reasonId_fkey" FOREIGN KEY ("cancel_reasonId") REFERENCES "reason_lid"("id") ON DELETE SET NULL ON UPDATE CASCADE;
