CREATE TABLE "murlis" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date NOT NULL,
	"title_ar" varchar(500) NOT NULL,
	"content_ar" text NOT NULL,
	"content_en" text,
	"summary_ar" text,
	"summary_en" text,
	"song_title" varchar(300),
	"song_url" varchar(500),
	"published" boolean DEFAULT false,
	"created_by" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"test_field" varchar(100),
	CONSTRAINT "murlis_date_unique" UNIQUE("date")
);
