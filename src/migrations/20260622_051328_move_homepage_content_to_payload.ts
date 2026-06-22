import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-vercel-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_homepage_social_links_variant" AS ENUM('email', 'github', 'linkedin', 'spotify');
  CREATE TABLE "homepage_expertises" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"icon_id" uuid NOT NULL,
  	"variant" "enum_homepage_social_links_variant" NOT NULL
  );
  
  ALTER TABLE "tech_stacks" ADD COLUMN "is_shown" boolean DEFAULT true NOT NULL;
  ALTER TABLE "tech_stacks" ADD COLUMN "weight" numeric DEFAULT 0 NOT NULL;
  ALTER TABLE "homepage_expertises" ADD CONSTRAINT "homepage_expertises_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_social_links" ADD CONSTRAINT "homepage_social_links_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_social_links" ADD CONSTRAINT "homepage_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "homepage_expertises_order_idx" ON "homepage_expertises" USING btree ("_order");
  CREATE INDEX "homepage_expertises_parent_id_idx" ON "homepage_expertises" USING btree ("_parent_id");
  CREATE INDEX "homepage_social_links_order_idx" ON "homepage_social_links" USING btree ("_order");
  CREATE INDEX "homepage_social_links_parent_id_idx" ON "homepage_social_links" USING btree ("_parent_id");
  CREATE INDEX "homepage_social_links_icon_idx" ON "homepage_social_links" USING btree ("icon_id");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "homepage_expertises" CASCADE;
  DROP TABLE "homepage_social_links" CASCADE;
  ALTER TABLE "tech_stacks" DROP COLUMN "is_shown";
  ALTER TABLE "tech_stacks" DROP COLUMN "weight";
  DROP TYPE "public"."enum_homepage_social_links_variant";`);
}
