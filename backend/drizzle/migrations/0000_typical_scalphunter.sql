CREATE TABLE "murlis" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date NOT NULL,
	"title_ar" varchar(500) NOT NULL,
	"content_ar" text NOT NULL,
	"published" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "murlis_date_unique" UNIQUE("date")
);
