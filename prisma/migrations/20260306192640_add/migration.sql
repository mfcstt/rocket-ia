/*
  Warnings:

  - The primary key for the `Stack` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Stack` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `stackId` on the `Chat` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `role` on the `Message` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ASSISTANT');

-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_stackId_fkey";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "stackId",
ADD COLUMN     "stackId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL;

-- AlterTable
ALTER TABLE "Stack" DROP CONSTRAINT "Stack_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "Stack_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_stackId_fkey" FOREIGN KEY ("stackId") REFERENCES "Stack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
