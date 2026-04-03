import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage_employment_history" ADD COLUMN "logo_id" uuid;
  ALTER TABLE "homepage_employment_history" ADD CONSTRAINT "homepage_employment_history_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "homepage_employment_history_logo_idx" ON "homepage_employment_history" USING btree ("logo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage_employment_history" DROP CONSTRAINT "homepage_employment_history_logo_id_media_id_fk";
  
  DROP INDEX "homepage_employment_history_logo_idx";
  ALTER TABLE "homepage_employment_history" DROP COLUMN "logo_id";`)
}
