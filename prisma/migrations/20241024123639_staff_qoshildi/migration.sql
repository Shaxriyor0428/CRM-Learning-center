-- CreateTable
CREATE TABLE "Staff" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL,
    "is_active" BOOLEAN DEFAULT false,
    "hashed_refresh_token" TEXT,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);
