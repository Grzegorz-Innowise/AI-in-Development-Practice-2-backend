/*
  Warnings:

  - You are about to drop the column `geoId` on the `Address` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[addressId]` on the table `Geo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `addressId` to the `Geo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_geoId_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "geoId";

-- AlterTable
ALTER TABLE "Geo" ADD COLUMN     "addressId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Geo_addressId_key" ON "Geo"("addressId");

-- AddForeignKey
ALTER TABLE "Geo" ADD CONSTRAINT "Geo_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;
