/*
  Warnings:

  - You are about to alter the column `number` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "street" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "Address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Address" ("cep", "id", "neighborhood", "number", "street", "user_id") SELECT "cep", "id", "neighborhood", "number", "street", "user_id" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
CREATE UNIQUE INDEX "Address_user_id_key" ON "Address"("user_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
