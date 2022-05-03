/*
  Warnings:

  - Added the required column `postId` to the `PostTag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PostTag` ADD COLUMN `postId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Tag` ADD COLUMN `postId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Tag` ADD CONSTRAINT `Tag_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostTag` ADD CONSTRAINT `PostTag_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
