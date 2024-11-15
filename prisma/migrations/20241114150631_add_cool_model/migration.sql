/*
  Warnings:

  - Made the column `email` on table `Guest` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Guest" ALTER COLUMN "email" SET NOT NULL;
