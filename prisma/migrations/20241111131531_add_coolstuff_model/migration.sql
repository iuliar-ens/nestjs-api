/*
  Warnings:

  - You are about to drop the `Cool` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Cool";

-- DropTable
DROP TABLE "Test";

-- CreateTable
CREATE TABLE "Coolstuff" (
    "id" SERIAL NOT NULL,
    "field_1" TEXT NOT NULL,
    "field_2" TEXT,

    CONSTRAINT "Coolstuff_pkey" PRIMARY KEY ("id")
);
