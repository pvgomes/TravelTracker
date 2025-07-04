import { pgTable, text, serial, integer, boolean, date, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name"),
  homeCountryCode: text("home_country_code"),
  homeCountryName: text("home_country_name"),
  shareId: varchar("share_id", { length: 32 }).unique(),
});

export const visits = pgTable("visits", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  countryCode: text("country_code").notNull(),
  countryName: text("country_name").notNull(),
  city: text("city").notNull(),
  visitMonth: integer("visit_month").notNull(),
  visitYear: integer("visit_year").notNull(),
  notes: text("notes"),
  // Keep the original date field for backward compatibility
  visitDate: date("visit_date", { mode: "string" }),
  state: text("state"),
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
  visitMonth: true,
  visitYear: true,
  notes: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertVisit = z.infer<typeof insertVisitSchema>;
export type Visit = typeof visits.$inferSelect;
