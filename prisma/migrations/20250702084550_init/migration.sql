-- CreateEnum
CREATE TYPE "ETaskPriority" AS ENUM ('high', 'medium', 'low');

-- CreateEnum
CREATE TYPE "ETaskStatus" AS ENUM ('pending', 'processing', 'completed');

-- CreateTable
CREATE TABLE "Task" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" "ETaskPriority" NOT NULL,
    "status" "ETaskStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedAt" TIMESTAMPTZ,
    "completedAt" TIMESTAMPTZ,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
