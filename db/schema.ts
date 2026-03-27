import { integer, pgTable, varchar, timestamp, real } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const workoutsTable = pgTable("workouts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer()
    .notNull()
    .references(() => usersTable.id),
  name: varchar({ length: 255 }).notNull(),
  startedAt: timestamp().notNull().defaultNow(),
  completedAt: timestamp(),
});

export const exercisesTable = pgTable("exercises", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  workoutId: integer()
    .notNull()
    .references(() => workoutsTable.id, { onDelete: "cascade" }),
  name: varchar({ length: 255 }).notNull(),
  order: integer().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const setsTable = pgTable("sets", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  exerciseId: integer()
    .notNull()
    .references(() => exercisesTable.id, { onDelete: "cascade" }),
  setNumber: integer().notNull(),
  reps: integer(),
  weightKg: real(),
  createdAt: timestamp().notNull().defaultNow(),
});
