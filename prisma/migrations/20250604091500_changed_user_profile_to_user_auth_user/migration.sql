/*
  Warnings:

  - You are about to drop the `addresses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `companies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_user_id_fkey";

-- DropForeignKey
ALTER TABLE "companies" DROP CONSTRAINT "companies_user_id_fkey";

-- DropForeignKey
ALTER TABLE "geo" DROP CONSTRAINT "geo_address_id_fkey";

-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_user_id_fkey";

-- DropTable
DROP TABLE "addresses";

-- DropTable
DROP TABLE "companies";

-- DropTable
DROP TABLE "profiles";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "user_auth" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "refreshToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "user_id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "website" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "suite" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "catch_phrase" TEXT NOT NULL,
    "bs" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_auth_email_key" ON "user_auth"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_auth_refreshToken_key" ON "user_auth"("refreshToken");

-- CreateIndex
CREATE INDEX "idx_user_username" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "address_user_id_key" ON "address"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "company_user_id_key" ON "company"("user_id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_auth"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "geo" ADD CONSTRAINT "geo_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE;
