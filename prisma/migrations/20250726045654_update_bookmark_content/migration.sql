/*
  Warnings:

  - Made the column `content` on table `bookmarks` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `bookmarks` MODIFY `content` TEXT NOT NULL;
