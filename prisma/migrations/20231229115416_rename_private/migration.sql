/*
  Warnings:

  - You are about to drop the column `private` on the `Work` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Work" DROP COLUMN "private",
ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT false;
