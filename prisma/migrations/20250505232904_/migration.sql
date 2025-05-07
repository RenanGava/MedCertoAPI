/*
  Warnings:

  - You are about to alter the column `expiresIn` on the `refresh_token` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `specialty` to the `medico` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_medico" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "crm" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "socialMedia" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "medico_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_medico" ("crm", "id", "socialMedia", "user_id") SELECT "crm", "id", "socialMedia", "user_id" FROM "medico";
DROP TABLE "medico";
ALTER TABLE "new_medico" RENAME TO "medico";
CREATE UNIQUE INDEX "medico_crm_key" ON "medico"("crm");
CREATE UNIQUE INDEX "medico_user_id_key" ON "medico"("user_id");
CREATE TABLE "new_refresh_token" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "expiresIn" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "refresh_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_refresh_token" ("expiresIn", "id", "userId") SELECT "expiresIn", "id", "userId" FROM "refresh_token";
DROP TABLE "refresh_token";
ALTER TABLE "new_refresh_token" RENAME TO "refresh_token";
CREATE UNIQUE INDEX "refresh_token_userId_key" ON "refresh_token"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
