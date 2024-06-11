import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  boolean
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator(
  (name) => `university-open-days_${name}`,
);

export const userTypeEnum = pgEnum("user_type", ["student", "teacher"]);

export const universityOrganizers = pgEnum("university_organizers", ["Uniwersytet Zielonogórski", "Wydział Matematyki, Informatyki i Ekonometrii", "Wydział Nauk Społecznych", "Wydział Artystyczny", "Collegium Medicum"])

export const authCodes = createTable("auth_codes", {
  id: serial("id").primaryKey(),
  authCode: varchar("auth_code", { length: 6 }).notNull(),
  contact: varchar("contact", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const users = createTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).unique(),
  phoneNr: varchar("phone_nr", { length: 13 }).unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const userRelations = relations(users, ({ one }) => ({
  form: one(forms),
}));

// ======================= Form

export const forms = createTable("forms", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  type: userTypeEnum("user_type").notNull(),
  schoolId: integer("school_id").notNull(),
});

export const formRelations = relations(forms, ({ one }) => ({
  school: one(schools, {
    fields: [forms.schoolId],
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
  regionId: integer("region_id").notNull(),
});

export const cityRelations = relations(cities, ({ one, many }) => ({
  region: one(regions, {
    fields: [cities.regionId],
    references: [regions.id],
  }),
  schools: many(schools),
}));

export const schools = createTable("schools", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  cityId: integer("city_id").notNull(),
});

export const schoolRelations = relations(schools, ({ one, many }) => ({
  city: one(cities, {
    fields: [schools.cityId],
    references: [cities.id],
  }),
  forms: many(forms),
}));

// ======================= Page details 

export const pageDetails = createTable("page_details", {
  title: varchar("title", { length: 255 }),
  date: timestamp("date"),
})

// ======================= Map details

export const campuses = createTable("campuses", {
  name: varchar("name", { length: 255 }).primaryKey(),
});

export const campusRelations = relations(campuses, ({ many }) => ({
  buildings: many(buildings),
}));

export const buildings = createTable("buildings", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  campusName: varchar("campus_name").notNull(),
});

export const buildingRelations = relations(buildings, ({ one, many }) => ({
  campus: one(campuses, {
    fields: [buildings.campusName],
    references: [campuses.name],
  }),
  floors: many(floors),
}));

export const floors = createTable("floors", {
  id: serial("id").primaryKey(),
  label: varchar("label"),
  level: integer("level"),
  isSelected: boolean("isSelected").notNull(),
  buildingId: integer("building_id").notNull(),
})

export const floorsRelations = relations(floors, ({ one, many }) => ({
  building: one(buildings, {
    fields: [floors.buildingId],
    references: [buildings.id],
  }),
  stands: many(stands),
  rooms: many(rooms)
}))

export const rooms = createTable("rooms", {
  id: serial("id").primaryKey(),
  number: varchar("number", { length: 50 }).notNull(),
  floorId: integer("floor_id").notNull()
});

export const roomRelations = relations(rooms, ({ one, many }) => ({
  building: one(floors, {
    fields: [rooms.floorId],
    references: [floors.id],
  }),
  lectures: many(lectures),
}));

// ======================= Events 

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

export const divisions = createTable("divisions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).unique().notNull(),
  value: varchar("value", { length: 6 }).notNull(),
  password: varchar("password", { length: 30 }).notNull()
})
