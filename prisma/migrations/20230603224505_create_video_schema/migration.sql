-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(55) NOT NULL,
    "rate" DECIMAL(65,30) NOT NULL,
    "viewer_count" INTEGER NOT NULL,
    "second_number" INTEGER NOT NULL,
    "video_url" TEXT NOT NULL,
    "cover_image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);
