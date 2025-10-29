/*
  Warnings:

  - You are about to drop the column `lat` on the `medico` table. All the data in the column will be lost.
  - You are about to drop the column `long` on the `medico` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "street" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "Address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

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
INSERT INTO "new_medico" ("crm", "id", "socialMedia", "specialty", "user_id") SELECT "crm", "id", "socialMedia", "specialty", "user_id" FROM "medico";
DROP TABLE "medico";
ALTER TABLE "new_medico" RENAME TO "medico";
CREATE UNIQUE INDEX "medico_crm_key" ON "medico"("crm");
CREATE UNIQUE INDEX "medico_user_id_key" ON "medico"("user_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Address_user_id_key" ON "Address"("user_id");
