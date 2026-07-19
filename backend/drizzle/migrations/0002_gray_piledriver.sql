ALTER TABLE "murlis" ALTER COLUMN "title_ar" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "murlis" ALTER COLUMN "content_ar" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "murlis" ALTER COLUMN "created_by" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "murlis" ADD COLUMN "title_en" varchar(500);