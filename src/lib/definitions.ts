import { z } from "zod";

export const EmailLoginSchema = z.object({
  email: z.string().trim().email(),
});

export type LoginFormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

const AuthCodeSchema = z.object({
  id: z.number().int(),
  authCode: z.string().length(6),
  contact: z.string().max(100),
  createdAt: z.date(),
});

export type AuthCode = z.infer<typeof AuthCodeSchema>;

// --------- USER

export enum UserTypes {
  STUDENT = "Uczeń",
  TEACHER = "Nauczyciel",
}

export interface User {
  id: number;
  email: string | null;
  phoneNr: string | null;
  createdAt: Date;
}

// --------- ADDRESS

export interface Region {
  id: number;
  name: string;
  cities: City[];
}

export interface City {
  id: number;
  name: string;
  regionId: number;
  schools: School[];
}

export interface School {
  id: number;
  name: string;
  cityId: number;
}
