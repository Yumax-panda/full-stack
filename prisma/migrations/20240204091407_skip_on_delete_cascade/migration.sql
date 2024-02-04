-- DropForeignKey
ALTER TABLE "SkillTagRelation" DROP CONSTRAINT "SkillTagRelation_skillId_fkey";

-- DropForeignKey
ALTER TABLE "SkillTagRelation" DROP CONSTRAINT "SkillTagRelation_tagId_fkey";

-- AddForeignKey
ALTER TABLE "SkillTagRelation" ADD CONSTRAINT "SkillTagRelation_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillTagRelation" ADD CONSTRAINT "SkillTagRelation_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
