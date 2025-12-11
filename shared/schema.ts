import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const pets = pgTable("pets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  breed: text("breed").notNull(),
  type: text("type").notNull(), // 'Dog' | 'Cat' | 'Bird' | 'Other'
  ageWeeks: integer("age_weeks").notNull().default(0),
  gender: text("gender").notNull().default("Male"), // 'Male' | 'Female'
  priceMin: integer("price_min").notNull().default(0),
  priceMax: integer("price_max").notNull().default(0),
  status: text("status").notNull().default("Available"), // 'Available' | 'Sold' | 'Reserved'
  imageUrl: text("image_url").notNull(),
  featured: boolean("featured").notNull().default(false),
  description: text("description").default(""),
});

export const insertPetSchema = createInsertSchema(pets).pick({
  name: true,
  breed: true,
  type: true,
  ageWeeks: true,
  gender: true,
  priceMin: true,
  priceMax: true,
  status: true,
  imageUrl: true,
  featured: true,
  description: true,
});

export type InsertPet = z.infer<typeof insertPetSchema>;
export type Pet = typeof pets.$inferSelect;

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(), // 'Food' | 'Toys' | 'Accessories'
});

export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  description: true,
  price: true,
  imageUrl: true,
  category: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone"),
  type: text("type").notNull(), // 'Visit' | 'Grooming' | 'Enquiry'
  detail: text("detail").notNull(), // For visit: pet name, For grooming: package, For enquiry: product list
  time: text("time").notNull(),
  status: text("status").notNull().default("Pending"), // 'Pending' | 'Confirmed' | 'Completed'
});

export const insertBookingSchema = createInsertSchema(bookings).pick({
  name: true,
  phone: true,
  type: true,
  detail: true,
  time: true,
  status: true,
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

