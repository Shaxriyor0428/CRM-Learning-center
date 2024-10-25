-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "group_name" TEXT NOT NULL,
    "lesson_start_time" TEXT NOT NULL,
    "lesson_continious" TEXT NOT NULL,
    "lesson_week_day" TEXT NOT NULL,
    "group_stageId" INTEGER NOT NULL,
    "room_number" INTEGER NOT NULL,
    "room_floor" INTEGER NOT NULL,
    "branchId" INTEGER NOT NULL,
    "lesson_quant" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "stage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_group_stageId_fkey" FOREIGN KEY ("group_stageId") REFERENCES "stage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
