import { pgTable, text, serial, integer, boolean, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name"),
  homeCountryCode: text("home_country_code"),
  homeCountryName: text("home_country_name"),
});

export const visits = pgTable("visits", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  countryCode: text("country_code").notNull(),
  countryName: text("country_name").notNull(),
  city: text("city").notNull(),
  state: text("state"),
  visitDate: date("visit_date", { mode: "string" }).notNull(),
  notes: text("notes"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  fullName: true,
  homeCountryCode: true,
  homeCountryName: true,
});

export const insertVisitSchema = createInsertSchema(visits).pick({
  countryCode: true,
  countryName: true,
  city: true,
  state: true,
  visitDate: true,
  notes: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertVisit = z.infer<typeof insertVisitSchema>;
export type Visit = typeof visits.$inferSelect;
