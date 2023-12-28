/*
  Warnings:

  - You are about to drop the `_SkillToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SkillToTag" DROP CONSTRAINT "_SkillToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_SkillToTag" DROP CONSTRAINT "_SkillToTag_B_fkey";

-- DropTable
DROP TABLE "_SkillToTag";
