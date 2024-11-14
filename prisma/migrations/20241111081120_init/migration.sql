-- CreateTable
CREATE TABLE "Guest" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "rsvp_status" TEXT,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);
