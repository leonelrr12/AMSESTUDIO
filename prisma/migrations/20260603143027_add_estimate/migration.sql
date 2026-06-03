-- CreateEnum
CREATE TYPE "FinishLevel" AS ENUM ('BASICO', 'ESTANDAR', 'PREMIUM');

-- CreateTable
CREATE TABLE "Estimate" (
    "id" TEXT NOT NULL,
    "squareMeters" INTEGER NOT NULL,
    "projectType" TEXT NOT NULL,
    "finishLevel" "FinishLevel" NOT NULL DEFAULT 'ESTANDAR',
    "extras" TEXT[],
    "estimatedCost" INTEGER NOT NULL,
    "estimatedTime" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Estimate_pkey" PRIMARY KEY ("id")
);
