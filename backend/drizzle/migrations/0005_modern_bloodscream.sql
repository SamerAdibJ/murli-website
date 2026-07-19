CREATE TABLE "blessing_cards" (
	"id" serial PRIMARY KEY NOT NULL,
	"content_ar" text NOT NULL,
	"content_en" text NOT NULL,
	"theme" varchar(100),
	"published" boolean DEFAULT false,
	"created_by" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
