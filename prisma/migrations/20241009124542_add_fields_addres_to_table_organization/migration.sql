/*
  Warnings:

  - You are about to drop the column `address` on the `Organizations` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `Organizations` table. All the data in the column will be lost.
  - Added the required column `city` to the `Organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district` to the `Organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Organizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organizations" DROP COLUMN "address",
DROP COLUMN "create_at",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "district" TEXT NOT NULL,
ADD COLUMN     "number" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" DROP NOT NULL;
