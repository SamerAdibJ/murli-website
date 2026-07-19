CREATE TYPE "public"."murli_type" AS ENUM('morning', 'avyakt');--> statement-breakpoint
ALTER TABLE "murlis" ADD COLUMN "type" "murli_type" DEFAULT 'morning' NOT NULL;