CREATE TABLE "parcours" (
	"id" uuid PRIMARY KEY NOT NULL,
	"ownerId" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "signsVdhParcours" (
	"id" uuid PRIMARY KEY NOT NULL,
	"parcoursId" uuid NOT NULL,
	"signVdhId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "signsVdh" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "parcours" ADD CONSTRAINT "parcours_ownerId_users_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "signsVdhParcours" ADD CONSTRAINT "signsVdhParcours_parcoursId_parcours_id_fk" FOREIGN KEY ("parcoursId") REFERENCES "public"."parcours"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "signsVdhParcours" ADD CONSTRAINT "signsVdhParcours_signVdhId_signsVdh_id_fk" FOREIGN KEY ("signVdhId") REFERENCES "public"."signsVdh"("id") ON DELETE no action ON UPDATE no action;