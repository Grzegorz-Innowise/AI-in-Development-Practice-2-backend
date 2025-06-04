/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_user_id_fkey";

-- DropForeignKey
ALTER TABLE "company" DROP CONSTRAINT "company_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_user_id_fkey";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "user_app" (
    "user_id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "website" TEXT NOT NULL,

    CONSTRAINT "user_app_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE INDEX "idx_user_username" ON "user_app"("username");

-- AddForeignKey
ALTER TABLE "user_app" ADD CONSTRAINT "user_app_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_auth"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_app"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_app"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
