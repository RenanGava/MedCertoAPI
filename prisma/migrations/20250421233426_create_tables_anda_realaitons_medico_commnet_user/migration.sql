-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "isDoctor" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "medico" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "crm" TEXT NOT NULL,
    "socialMedia" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "medico_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "commeent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "medico_id" TEXT NOT NULL,
    CONSTRAINT "commeent_medico_id_fkey" FOREIGN KEY ("medico_id") REFERENCES "medico" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "refresh_token" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "expiresIn" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "refresh_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "medico_crm_key" ON "medico"("crm");

-- CreateIndex
CREATE UNIQUE INDEX "medico_user_id_key" ON "medico"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_token_userId_key" ON "refresh_token"("userId");
