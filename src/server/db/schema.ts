import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator(
  (name) => `university-open-days_${name}`,
);

export const userTypeEnum = pgEnum("user_type", ["student", "teacher"]);

export const users = createTable("users", {
  id: serial("id").primaryKey(),
  type: userTypeEnum("user_type"),
  email: varchar("email", { length: 255 }).unique(),
  phoneNr: varchar("phone_nr", { length: 13 }).unique(),
  schoolId: integer("school_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const userRelations = relations(users, ({ one }) => ({
  school: one(schools, {
    fields: [users.schoolId],
    references: [schools.id],
  }),
}));

export const regions = createTable("regions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
});

export const regionRelations = relations(regions, ({ many }) => ({
  cities: many(cities),
}));

export const cities = createTable("cities", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  regionId: integer("region_id"),
});

export const cityRelations = relations(cities, ({ one }) => ({
  region: one(regions, {
    fields: [cities.regionId],
    references: [regions.id],
  }),
}));

export const schools = createTable("schools", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  cityId: integer("city_id"),
});

export const schoolRelations = relations(schools, ({ one, many }) => ({
  city: one(cities, {
    fields: [schools.cityId],
    references: [cities.id],
  }),
  users: many(users),
}));

export const campuses = createTable("campuses", {
  name: varchar("name", { length: 255 }).primaryKey(),
});

export const campusRelations = relations(campuses, ({ many }) => ({
  buildings: many(buildings),
}));

export const buildings = createTable("buildings", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  campusName: varchar("campus_name"),
});

export const buildingRelations = relations(buildings, ({ one, many }) => ({
  campus: one(campuses, {
    fields: [buildings.campusName],
    references: [campuses.name],
  }),
  rooms: many(rooms),
}));

export const rooms = createTable("rooms", {
  id: serial("id").primaryKey(),
  number: varchar("number", { length: 50 }).notNull(),
  floor: integer("floor").notNull(),
  buildingId: integer("building_id"),
});

export const roomRelations = relations(rooms, ({ one, many }) => ({
  building: one(buildings, {
    fields: [rooms.buildingId],
    references: [buildings.id],
  }),
  lectures: many(lectures),
}));

export const lectureTypeEnum = pgEnum("lecture_type", [
  "interactive",
  "traditional",
]);

export const lectures = createTable("lectures", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull().unique(),
  description: varchar("description", { length: 1000 }).notNull(),
  type: lectureTypeEnum("lecture_type").notNull(),
  start: timestamp("start").notNull(),
  end: timestamp("end").notNull(),
  authors: varchar("authors", { length: 255 }).notNull(),
  roomId: integer("room_id").notNull(),
});

export const lecturesRelations = relations(lectures, ({ one }) => ({
  room: one(rooms, {
    fields: [lectures.roomId],
    references: [rooms.id],
  }),
}));

export const standTypeEnum = pgEnum("stand_type", [
  "faculty",
  "student_organization",
  "company",
  "other",
]);

export const stands = createTable("stands", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  type: standTypeEnum("stand_type").notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  imageUrl: varchar("image_url", { length: 1000 }).notNull(),
});
