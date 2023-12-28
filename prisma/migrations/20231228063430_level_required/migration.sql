/*
  Warnings:

  - Made the column `level` on table `Skill` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Skill" ALTER COLUMN "level" SET NOT NULL,
ALTER COLUMN "level" SET DEFAULT 0;
