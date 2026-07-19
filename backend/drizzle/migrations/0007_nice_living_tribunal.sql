CREATE TABLE "bookmarks" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"murli_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "bookmarks_user_id_murli_id_unique" UNIQUE("user_id","murli_id")
);
--> statement-breakpoint
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_murli_id_murlis_id_fk" FOREIGN KEY ("murli_id") REFERENCES "public"."murlis"("id") ON DELETE no action ON UPDATE no action;