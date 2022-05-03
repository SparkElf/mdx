/*
  Warnings:

  - Added the required column `cover` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `readTime` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Post` ADD COLUMN `cover` VARCHAR(800) NOT NULL,
    ADD COLUMN `deleted` DATETIME(3) NULL,
    ADD COLUMN `readTime` INTEGER NOT NULL;
