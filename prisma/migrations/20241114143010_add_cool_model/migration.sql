/*
  Warnings:

  - You are about to drop the `Cool` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Somethingnew` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Guest" ALTER COLUMN "email" DROP NOT NULL;

-- DropTable
DROP TABLE "Cool";

-- DropTable
DROP TABLE "Somethingnew";
