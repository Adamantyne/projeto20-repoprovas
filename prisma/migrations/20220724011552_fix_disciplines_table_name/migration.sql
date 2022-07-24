/*
  Warnings:

  - You are about to drop the `disciplinies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "disciplinies" DROP CONSTRAINT "disciplinies_termId_fkey";

-- DropForeignKey
ALTER TABLE "teachersDisciplinies" DROP CONSTRAINT "teachersDisciplinies_disciplineId_fkey";

-- DropTable
DROP TABLE "disciplinies";

-- CreateTable
CREATE TABLE "disciplines" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "termId" INTEGER NOT NULL,

    CONSTRAINT "disciplines_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "disciplines_number_key" ON "disciplines"("number");

-- AddForeignKey
ALTER TABLE "disciplines" ADD CONSTRAINT "disciplines_termId_fkey" FOREIGN KEY ("termId") REFERENCES "terms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachersDisciplinies" ADD CONSTRAINT "teachersDisciplinies_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
