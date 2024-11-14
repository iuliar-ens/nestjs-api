/*
  Warnings:

  - You are about to drop the `Coolstuff` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Coolstuff";

-- CreateTable
CREATE TABLE "Somethingnew" (
    "id" SERIAL NOT NULL,
    "field_1" TEXT NOT NULL,
    "field_2" TEXT,

    CONSTRAINT "Somethingnew_pkey" PRIMARY KEY ("id")
);
