CREATE TABLE "user_blessings" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"blessing_card_id" integer NOT NULL,
	"assigned_date" date NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "user_blessings_user_id_assigned_date_unique" UNIQUE("user_id","assigned_date")
);
--> statement-breakpoint
ALTER TABLE "user_blessings" ADD CONSTRAINT "user_blessings_blessing_card_id_blessing_cards_id_fk" FOREIGN KEY ("blessing_card_id") REFERENCES "public"."blessing_cards"("id") ON DELETE no action ON UPDATE no action;