-- CreateTable
CREATE TABLE "Rate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rating" REAL NOT NULL DEFAULT 0,
    "doctor_id" TEXT NOT NULL,
    CONSTRAINT "Rate_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "medico" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Rate_doctor_id_key" ON "Rate"("doctor_id");
