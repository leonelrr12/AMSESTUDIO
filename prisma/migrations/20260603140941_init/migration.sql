-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('VIVIENDA', 'URBANIZACION', 'INFRAESTRUCTURA');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('COMPLETADO', 'EN_PROCESO', 'PLANIFICADO');

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "ProjectType" NOT NULL,
    "area" INTEGER,
    "executionTime" TEXT,
    "status" "ProjectStatus" NOT NULL DEFAULT 'COMPLETADO',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "images" TEXT[],
    "videoUrl" TEXT,
    "clientName" TEXT,
    "location" TEXT,
    "year" INTEGER,
    "projectOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
