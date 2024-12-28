ALTER TABLE "signsVdh" ADD COLUMN "nr" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "signsVdh" ADD COLUMN "description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "signsVdh" ADD COLUMN "type" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "signsVdh" ADD COLUMN "isSenior" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "signsVdh" ADD COLUMN "inFront" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "signsVdh" ADD CONSTRAINT "signsVdh_nr_unique" UNIQUE("nr");