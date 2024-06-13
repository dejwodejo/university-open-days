import { z } from "zod";

export const EmailLoginSchema = z.object({
  email: z.string().trim().email(),
});

export const LectureSchema = z.object({
  title: z.string({ required_error: "Tytuł jest wymagany", invalid_type_error: "Błędny format." })
    .min(5, { message: "Tytuł musi być dłuższy niż 5 znaków." })
    .max(255, { message: "Tytuł nie może być dłuższy niż 255 znaków." }),
  description: z.string({ required_error: "Opis jest wymagany" })
    .min(20, { message: "Opis nie może być krótszy niż 20 znaków" })
    .max(1000, { message: "Opis nie może być dłuższy niż 1000 znaków." }),
  type: z.enum(["interactive", "traditional"], { required_error: "Typ wykładu jest wymagany" }),
  start: z.string({ required_error: "Godzina rozpoczęcia wykładu jest wymagana." }),
  end: z.string({ required_error: "Godzina zakończenia wykładu jest wymagana." }),
  authors: z.string({ required_error: "Należy podać autora/autorów." })
    .min(5, { message: "Autorzy nie mogą być krótsi niż 5 znaków." })
    .max(255, { message: "Autorzy nie mogą być dłużsi niż 255 znaków." }),
  roomId: z.string({ required_error: "Należy wybrać pomieszczenie, w którym odbędzie się wykład." })
})

export const StandSchema = z.object({
  name: z.string({ required_error: "Nazwa jest wymagana", invalid_type_error: "Błędny format." })
    .min(1, { message: "Nazwa musi mieć co najmniej 1 znak." })
    .max(255, { message: "Nazwa nie może być dłuższa niż 255 znaków." }),
  description: z.string({ required_error: "Opis jest wymagany", invalid_type_error: "Błędny format." })
    .min(1, { message: "Opis musi mieć co najmniej 1 znak." })
    .max(255, { message: "Opis nie może być dłuższy niż 255 znaków." }),
  type: z.enum(["faculty", "student_organization", "company", "other"], { required_error: "Typ stoiska jest wymagany" }),
  location: z.string({ required_error: "Lokalizacja jest wymagana", invalid_type_error: "Błędny format." })
    .min(1, { message: "Lokalizacja musi mieć co najmniej 1 znak." })
    .max(255, { message: "Lokalizacja nie może być dłuższa niż 255 znaków." }),
  imageUrl: z.string({ required_error: "URL obrazu jest wymagany", invalid_type_error: "Błędny format." })
    .url(),
  floorId: z.string({ required_error: "Należy wybrać piętro, na którym będzie stanowisko." })
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
