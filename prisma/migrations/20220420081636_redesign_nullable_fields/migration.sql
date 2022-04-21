/*
  Warnings:

  - Made the column `content` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Post` MODIFY `brief` TEXT NULL,
    MODIFY `content` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `website` VARCHAR(191) NULL,
    MODIFY `avatar` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `VirtualTable` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
