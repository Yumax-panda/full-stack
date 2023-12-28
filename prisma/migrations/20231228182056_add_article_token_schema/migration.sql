-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('QIITA', 'ZENN', 'NOTE');

-- CreateTable
CREATE TABLE "ArticleToken" (
    "provider" "Provider" NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ArticleToken_pkey" PRIMARY KEY ("provider","userId")
);

-- AddForeignKey
ALTER TABLE "ArticleToken" ADD CONSTRAINT "ArticleToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
