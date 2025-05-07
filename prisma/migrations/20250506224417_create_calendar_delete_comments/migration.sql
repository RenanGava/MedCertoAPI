/*
  Warnings:

  - You are about to drop the `commeent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "commeent";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "calendars" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "timeScheduled" DATETIME NOT NULL,
    "user_id" TEXT NOT NULL,
    "doctor_id" TEXT NOT NULL,
    CONSTRAINT "calendars_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "medico" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "calendars_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
