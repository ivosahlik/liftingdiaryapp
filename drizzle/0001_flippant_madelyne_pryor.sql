ALTER TABLE "workouts" DROP CONSTRAINT "workouts_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "workouts" ALTER COLUMN "userId" SET DATA TYPE varchar(255);