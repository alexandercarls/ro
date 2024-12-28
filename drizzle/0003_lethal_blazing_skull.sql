CREATE TABLE "parcoursNodes" (
	"id" uuid PRIMARY KEY NOT NULL,
	"parcoursId" uuid NOT NULL,
	"signVdhId" uuid NOT NULL,
	"positionX" integer NOT NULL,
	"positionY" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "signsVdhParcours" RENAME TO "parcoursEdges";--> statement-breakpoint
ALTER TABLE "parcoursEdges" RENAME COLUMN "signVdhId" TO "sourceNodeId";--> statement-breakpoint
ALTER TABLE "parcoursEdges" DROP CONSTRAINT "signsVdhParcours_parcoursId_parcours_id_fk";
--> statement-breakpoint
ALTER TABLE "parcoursEdges" DROP CONSTRAINT "signsVdhParcours_signVdhId_signsVdh_id_fk";
--> statement-breakpoint
ALTER TABLE "parcoursEdges" ADD COLUMN "targetNodeId" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "parcoursNodes" ADD CONSTRAINT "parcoursNodes_parcoursId_parcours_id_fk" FOREIGN KEY ("parcoursId") REFERENCES "public"."parcours"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parcoursNodes" ADD CONSTRAINT "parcoursNodes_signVdhId_signsVdh_id_fk" FOREIGN KEY ("signVdhId") REFERENCES "public"."signsVdh"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parcoursEdges" ADD CONSTRAINT "parcoursEdges_parcoursId_parcours_id_fk" FOREIGN KEY ("parcoursId") REFERENCES "public"."parcours"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parcoursEdges" ADD CONSTRAINT "parcoursEdges_sourceNodeId_parcoursNodes_id_fk" FOREIGN KEY ("sourceNodeId") REFERENCES "public"."parcoursNodes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parcoursEdges" ADD CONSTRAINT "parcoursEdges_targetNodeId_parcoursNodes_id_fk" FOREIGN KEY ("targetNodeId") REFERENCES "public"."parcoursNodes"("id") ON DELETE no action ON UPDATE no action;